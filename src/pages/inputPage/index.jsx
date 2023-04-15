import React from 'react';
import { useState, useEffect } from 'react';
import "./style.scss";
import SpecialPlayerInput from "../../components/specialPlayerInput";
import Input from "../../components/input";
import ExcelImage from '../../images/excel.png'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useContext } from 'react';
import DataContext from "../../context/DataContext"

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'

import Loading from '../../components/Loading';

export default function InputPage() {
    const [excelFile, setExcelFile] = useState(null);

    const [problemName, setProblemName] = useState("");
    const [specialPlayerExists, setSpecialPlayerExists] = useState("");
    const [specialPlayerPropsNum, setSpecialPlayerPropsNum] = useState(null);
    const [normalPlayerNum, setNormalPlayerNum] = useState(null);
    const [normalPlayerPropsNum, setNormalPlayerPropsNum] = useState(null);
    const [fitnessFunction, setFitnessFunction] = useState("");
    const [playerPayoffFunction, setPlayerPayoffFunction] = useState("");

    const [problemNameError, setProblemNameError] = useState("");
    const [specialPlayerExistsError, setSpecialPlayerExistsError] = useState("");
    const [specialPlayerPropsNumError, setSpecialPlayerPropsNumError] = useState("");
    const [normalPlayerNumError, setNormalPlayerNumError] = useState("");
    const [normalPlayerPropsNumError, setNormalPlayerPropsNumError] = useState("");
    const [fitnessFunctionError, setFitnessFunctionError] = useState("");
    const [playerPayoffFunctionError, setPlayerPayoffFunctionError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [excelFileError, setExcelFileError] = useState('');

    const { data, setData, setGuideSectionIndex } = useContext(DataContext)

    const navigate = useNavigate();

    useEffect(() => {
        if (excelFile) {
            const extension = excelFile.name.split(".").pop();

            if (extension === "xlsx") {
                setExcelFileError("");
                const data = readExcelFile(excelFile);
            } else {
                setExcelFileError("Not an Excel file");
            }
        }
    }, [excelFile])

    const readExcelFile = async (file) => {
        const reader = new FileReader();
        try {
            reader.onload = async (e) => {
                setIsLoading(true)
                const excelData = e.target.result;
                const workbook = XLSX.read(excelData, { type: 'binary' });

                const problemInfo = await loadProblemInfo(workbook, 0);
                let specialPlayers = null
                let players = null
                let conflictSet = null;

                if (problemInfo.specialPlayerExists) {
                    specialPlayers = await loadSpecialPlayer(workbook, 1) // sheet 1 is the special player sheet
                    players = await loadNormalPlayers(workbook, 2, problemInfo.normalPlayerNum, problemInfo.normalPlayerPropsNum) // sheet 2 is the normal player sheet
                    conflictSet = await loadConflictSet(workbook, 3) // sheet 3 is the conflict set sheet
                } else {
                    players = await loadNormalPlayers(workbook, 1, problemInfo.normalPlayerNum, problemInfo.normalPlayerPropsNum) // sheet 1 is the normal player sheet because there is no special player sheet
                    conflictSet = await loadConflictSet(workbook, 2) // sheet 2 is the conflict set sheet
                }
                setData({
                    problem: {
                        name: problemInfo.problemName,
                        specialPlayerExists: problemInfo.specialPlayerExists,
                        specialPlayerPropsNum: problemInfo.specialPlayerPropsNum,
                        normalPlayerNum: problemInfo.normalPlayerNum,
                        normalPlayerPropsNum: problemInfo.normalPlayerPropsNum,
                        fitnessFunction: problemInfo.fitnessFunction,
                        playerPayoffFunction: problemInfo.playerPayoffFunction,
                        specialPlayer: specialPlayers,
                        players: players,
                        conflictSet: conflictSet
                    },
                })

                setIsLoading(false)
                navigate('/input-processing')

            };
            reader.readAsBinaryString(file);


        } catch (error) {
            setExcelFileError("Error when reading file");
        }
    };

    const loadProblemInfo = async (workbook, sheetNumber) => {
        try {
            const sheetName = await workbook.SheetNames[sheetNumber];
            const problemInfoWorksheet = await workbook.Sheets[sheetName];

            const problemName = await problemInfoWorksheet["B1"].v
            const specialPlayerExists = await problemInfoWorksheet["B2"].v
            const specialPlayerPropsNum = await problemInfoWorksheet["B3"].v
            const normalPlayerNum = await problemInfoWorksheet["B4"].v
            const normalPlayerPropsNum = await problemInfoWorksheet["B5"].v
            const fitnessFunction = await problemInfoWorksheet["B6"].v
            const playerPayoffFunction = await problemInfoWorksheet["B7"].v

            return {
                problemName,
                specialPlayerExists,
                specialPlayerPropsNum,
                normalPlayerNum,
                normalPlayerPropsNum,
                fitnessFunction,
                playerPayoffFunction
            }
        } catch (error) {
            setExcelFileError("Error when reading file");
        }
    }

    const loadSpecialPlayer = async (workbook, sheetNumber) => {
        try {
            const sheetName = await workbook.SheetNames[sheetNumber];
            const specialPlayerWorkSheet = await workbook.Sheets[sheetName];
            const properties = []
            const weights = []

            // LOAD PROPERTIES AND WEIGHTS
            for (let i = 1; i <= specialPlayerPropsNum; i++) {
                //[`A${i + 1}`] and  [`B${i + 1}`] because the first row is the header
                properties.push(await specialPlayerWorkSheet[`A${i + 1}`].v)
                weights.push(await specialPlayerWorkSheet[`B${i + 1}`].v)
            }
            return {
                properties,
                weights
            }
        } catch (error) {
            setExcelFileError("Error when reading file");
        }
    }

    const loadNormalPlayers = async (workbook, sheetNumber, normalPlayerNum, normalPlayerPropsNum) => {
        try {
            const sheetName = await workbook.SheetNames[sheetNumber];
            const normalPlayerWorkSheet = await workbook.Sheets[sheetName];
            const players = [];
            let currentPlayer = 0;
            let currentRow = 1;

            // LOAD PLAYERS
            while (players.length < normalPlayerNum) {
                const playerNameCell = normalPlayerWorkSheet[`A${currentRow}`];

                const playerName = playerNameCell ? playerNameCell.v : `Player ${currentPlayer + 1}`; // because the player name is optional
                const strategyNumber = await normalPlayerWorkSheet[`B${currentRow}`].v;

                const strategies = [];

                // LOAD STRATEGIES
                for (let i = 1; i <= strategyNumber; i++) {
                    // currentRow + i because the current row is the player name and the strategy number
                    const strategyNameCell = await normalPlayerWorkSheet[`A${currentRow + i}`];

                    const strategyName = strategyNameCell ? strategyNameCell.v : `Strategy ${i}`; // because the strategy name is optional
                    const properties = []

                    // LOAD PROPERTIES
                    for (let j = 1; j <= normalPlayerPropsNum; j++) {
                        // c (0-based): j starts from 1 because the first column is the strategy name
                        // r (0-based): currentRow + i - 1 because currentRow + i is the row of the startegy, and minus 1 because the row in this method is 0-based (remove this -1 if you want to see the error)
                        const propertyCell = await normalPlayerWorkSheet[XLSX.utils.encode_cell({ c: j, r: currentRow + i - 1 })];
                        properties.push(propertyCell.v)
                    }

                    strategies.push({
                        name: strategyName,
                        properties: properties
                    })

                }

                // currentRow + strategyNumber is the row of the last strategy,
                // and plus 1 because the next row is the player name
                currentRow += strategyNumber + 1;


                players.push({
                    name: playerName,
                    strategies: strategies
                })
            }

            return players
        } catch (error) {
            setExcelFileError("Error when reading file");
        }
    }

    const loadConflictSet = async (workbook, sheetNumber) => {
        try {
            const sheetName = workbook.SheetNames[sheetNumber];
            const conflictSetWorkSheet = workbook.Sheets[sheetName];
            const conflictSet = [];
            let row = 0;
            let col = 0;
            let currentCell = await conflictSetWorkSheet[XLSX.utils.encode_cell({ c: col, r: row })];

            while (currentCell) {
                const string  = currentCell.v
                const conflict = string.replace(/[( )]/g, '').split(",").map((item) => parseInt(item))
                conflictSet.push({
                    leftPlayer: conflict[0],
                    leftPlayerStrategy: conflict[1],
                    rightPlayer: conflict[2],
                    rightPlayerStrategy: conflict[3]    
                })
            
                col++;
                currentCell = await conflictSetWorkSheet[XLSX.utils.encode_cell({ c: col, r: row })];

                if (!currentCell) {
                    row++;
                    col = 0;
                    currentCell = conflictSetWorkSheet[XLSX.utils.encode_cell({ c: col, r: row })];
                }
            }

            return conflictSet
        
        } catch (error) {
            setExcelFileError("Error when reading file");
        }
    }


    const handleGetExcelTemplate = () => {
        if (validateForm()) {
            downloadExcel();
        }
    }
    const validateForm = () => {
        let error = false

        if (!problemName) {
            setProblemNameError("Problem name must not be empty");
            error = true;
        } else {
            setProblemNameError("");
        }

        if (specialPlayerExists) {
            if (!specialPlayerPropsNum) {
                setSpecialPlayerPropsNumError("Special player properties must not be empty");
                error = true;
            } else {
                setSpecialPlayerPropsNumError("")
            }
        }


        if (!normalPlayerNum) {
            setNormalPlayerNumError("Normal player number must not be empty");
            error = true;
        } else {
            setNormalPlayerNumError("");
        }

        if (!normalPlayerPropsNum) {
            setNormalPlayerPropsNumError("Normal player properties must not be empty");
            error = true;
        } else {
            setNormalPlayerPropsNumError("");
        }

        if (!fitnessFunction) {
            setFitnessFunctionError("Fitness function must not be empty");
            error = true;
        } else {
            setFitnessFunctionError("");
        }

        if (!playerPayoffFunction) {
            setPlayerPayoffFunctionError("Player payoff function must not be empty");
            error = true;
        } else {
            setPlayerPayoffFunctionError("");
        }

        // if there is no error
        if (error) {
            return false
        }
        return true;

    }

    const downloadExcel = () => {
        const workbook = XLSX.utils.book_new();
        const sheet1 = XLSX.utils.aoa_to_sheet([
            ["Problem name", problemName],
            ["Special Player exists (0 - No, 1 -Yes) ", specialPlayerExists ? 1 : 0],
            ["Number of properties of special player", Number(specialPlayerPropsNum)],
            ["Number of normal players", Number(normalPlayerNum)],
            ["Number of properties of each normal player", Number(normalPlayerPropsNum)],
            ["Fitness function", fitnessFunction],
            ["Player payoff function", playerPayoffFunction]
        ]);

        XLSX.utils.book_append_sheet(workbook, sheet1, 'Problem information');
        // XLSX.utils.sheet_set_column_width(sheet1, 1, 1, 40);
        // XLSX.utils.sheet_set_column_width(sheet1, 2, 2, 50);

        if (specialPlayerExists) {
            const sheet2 = XLSX.utils.aoa_to_sheet([["Properties", "Weights"]]);
            XLSX.utils.book_append_sheet(workbook, sheet2, 'Special player');
            // XLSX.utils.sheet_format_cols(sheet2, [{ wch: 20 }, { wch: 20 }]);
            // XLSX.utils.sheet_set_column_width(sheet2, 1, 1, 20);
            // XLSX.utils.sheet_set_column_width(sheet2, 2, 2, 20);
        }

        const sheet3 = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, sheet3, 'Normal player');
        const sheet4 = XLSX.utils.aoa_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, sheet4, 'Conflict matrix');

        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'input.xlsx');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setExcelFile(event.dataTransfer.files[0]);
        event.target.classList.remove("dragging")
        //TODO: handle file validation


    }

    const handleOnDragEnter = (event) => {
        event.preventDefault()
        event.target.classList.add("dragging")
    }

    const handleOnDragLeave = (event) => {
        event.preventDefault()
        event.target.classList.remove("dragging")
    }

    const handleFileInput = (event) => {
        setExcelFile(event.target.files[0]);
    };


    return (
        <div className="input-page">
            <Loading isLoading={isLoading} />
            <div className="warning">
                <p className="warning-text">⚠️ This is a beta version of the tool.Exporting to Excel and Popup and guide page are not supported yet. Please report any bugs to us on MS Teams</p>
            </div>
            <p className='header-text'>Enter information about your problem</p>
            <div className="input-container">
                <div className="row">
                    <Input
                        message='Name of the problem'
                        type='text'
                        error={problemNameError}
                        handleOnChange={(e) => setProblemName(e.target.value)}
                        value={problemName}
                        description="The name should be concise and meaningful, reflecting the nature of the game being analyzed"
                        guideSectionIndex={1}
                    />
                </div>
                <div className="row">
                    <SpecialPlayerInput
                        specialPlayerExists={specialPlayerExists}
                        setSpecialPlayerExists={setSpecialPlayerExists}
                        specialPlayerPropsNum={specialPlayerPropsNum}
                        setSpecialPlayerPropsNum={setSpecialPlayerPropsNum}
                        error={specialPlayerPropsNumError}
                    />
                </div>

                <div className="row">
                    <Input
                        message='Number of normal players'
                        text='number'
                        error={normalPlayerNumError}
                        handleOnChange={(e) => setNormalPlayerNum(e.target.value)}
                        value={normalPlayerNum}
                        description="A positive number that reflects the number of players involved to ensure that the resulting Nash equilibrium is valid"
                        guideSectionIndex={4}

                    />
                    <Input
                        message='Number of properties each strategy of normal player'
                        text='number'
                        error={normalPlayerPropsNumError}
                        handleOnChange={(e) => setNormalPlayerPropsNum(e.target.value)}
                        value={normalPlayerPropsNum}
                        description="A property is a characteristic or attribute that a player has that affects their actions or outcomes in the game"
                        guideSectionIndex={5}
                    />
                </div>

                <div className="row">
                    <Input
                        message='Fitness function'
                        type='text'
                        error={fitnessFunctionError}
                        handleOnChange={(e) => setFitnessFunction(e.target.value)}
                        value={fitnessFunction}
                        description="The fitness function is a mathematical function that represents the payoff that a player receives for a specific combination of strategies played by all the players in the game"
                        guideSectionIndex={6}
                    />
                </div>

                <div className="row">
                    <Input
                        message='Player payoff function'
                        type='text'
                        error={playerPayoffFunctionError}
                        handleOnChange={(e) => setPlayerPayoffFunction(e.target.value)}
                        value={playerPayoffFunction}
                        description="The player payoff function is a mathematical function that determines the outcome of the game by assigning a payoff value to each player based on the strategies chosen by all the players in the game"
                        guideSectionIndex={7}
                    />
                </div>
            </div>
            <div className="btn" onClick={handleGetExcelTemplate}>
                <p>Get Excel Template</p>
                <img src={ExcelImage} alt="" />
            </div>

            <div className="guide-box">
                <p>Get the Excel file template, input your data, then drag & drop it to the box below</p>
                <Link to='/guide' className='guide-link' onClick={e => setGuideSectionIndex(8)}> Learn more on how to input to file Excel</Link>

            </div>


            {excelFileError && <p className='file-error'>{excelFileError}</p>}
            <div className={excelFileError ? 'drag-area file-error' : 'drag-area'}
                onDrop={handleDrop}
                onDragEnter={handleOnDragEnter}
                onDragLeave={handleOnDragLeave}
                onDragOver={handleOnDragEnter}
            >
                <p className='drag-text'>{excelFile ? excelFile.name : 'Drag and drop a file here'}</p>
                <label htmlFor="select-file" id='select-file-label'>Choose a file</label>
                <input type="file" id="select-file" onChange={handleFileInput} />
            </div>
        </div>
    )
}

// const [excelFile, setExcelFile] = useState(null);

// const handleDrop = (event) => {
//     event.preventDefault();
//     setExcelFile(event.dataTransfer.files[0]);
// }

// <div className="drag-area" onDrop={handleDrop} onDragEnter={handleOnDragEnter} onDragLeave={handleOnDragLeave}>
//     <p className='drag-text'>{excelFile ? excelFile.name : 'Drag and drop a file here'}</p>
//     <label htmlFor="select-file" id='select-file-label'>Choose a file</label>
//     <input type="file" id="select-file" handleOnChange={handleFileInput} />
// </div>