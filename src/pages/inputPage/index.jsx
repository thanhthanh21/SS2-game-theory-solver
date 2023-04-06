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


/* load 'fs' for readFile and writeFile support */
// import * as fs from 'fs';
// XLSX.set_fs(fs);
// // impor

import { useNavigate } from 'react-router';

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


    const [excelFileError, setExcelFileError] = useState('');

    const { data, setData, setGuideSectionIndex }= useContext(DataContext)
    console.log(data);

    const navigate = useNavigate();

    useEffect(() => {
        if (excelFile) {
            const extension = excelFile.name.split(".").pop();
            console.log(extension);

            if (extension === "xlsx") {
                setExcelFileError("");
                console.log("file", excelFile);
                const data = readExcelFile(excelFile);
            } else {
                setExcelFileError("Not an Excel file");
            }
        }
    }, [excelFile])

    const readExcelFile = async (file) => {
        const reader = new FileReader();
        try {
            reader.onload = (e) => {
                const excelData = e.target.result;
                const workbook = XLSX.read(excelData, { type: 'binary' });

                const problemInfo = loadProblemInfo(workbook, 0);
                console.log(problemInfo);
                let specialPlayers = null
                let players = null

                console.log(specialPlayerExists);
                if (problemInfo.specialPlayerExists) {
                    specialPlayers = loadSpecialPlayer(workbook, 1) // sheet 1 is the special player sheet
                    players = loadNormalPlayers(workbook, 2, problemInfo.normalPlayerNum, problemInfo.normalPlayerPropsNum) // sheet 2 is the normal player sheet
                } else {
                    players = loadNormalPlayers(workbook, 1, problemInfo.normalPlayerNum, problemInfo.normalPlayerPropsNum) // sheet 1 is the normal player sheet because there is no special player sheet
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
                        players: players
                    },
    
                })
                navigate('/input-processing')

            };
            reader.readAsBinaryString(file);


        } catch (error) {
            console.log(error);
            setExcelFileError("Error when reading file");
        }
    };

    const loadProblemInfo = (workbook, sheetNumber) => {
        const sheetName = workbook.SheetNames[sheetNumber];
        const problemInfoWorksheet = workbook.Sheets[sheetName];

        const problemName = problemInfoWorksheet["B1"].v
        const specialPlayerExists = problemInfoWorksheet["B2"].v
        const specialPlayerPropsNum = problemInfoWorksheet["B3"].v
        const normalPlayerNum = problemInfoWorksheet["B4"].v
        const normalPlayerPropsNum = problemInfoWorksheet["B5"].v
        const fitnessFunction = problemInfoWorksheet["B6"].v
        const playerPayoffFunction = problemInfoWorksheet["B7"].v

        return {
            problemName,
            specialPlayerExists,
            specialPlayerPropsNum,
            normalPlayerNum,
            normalPlayerPropsNum,
            fitnessFunction,
            playerPayoffFunction
        }
    }

    const loadSpecialPlayer = (workbook, sheetNumber) => {
        const sheetName = workbook.SheetNames[sheetNumber];
        const specialPlayerWorkSheet = workbook.Sheets[sheetName];
        const properties = []
        const weights = []

        // LOAD PROPERTIES AND WEIGHTS
        for (let i = 1; i <= specialPlayerPropsNum; i++) {
            //[`A${i + 1}`] and  [`B${i + 1}`] because the first row is the header
            properties.push(specialPlayerWorkSheet[`A${i + 1}`].v)
            weights.push(specialPlayerWorkSheet[`B${i + 1}`].v)
        }
        return {
            properties,
            weights
        }
    }



    const loadNormalPlayers = (workbook, sheetNumber, normalPlayerNum, normalPlayerPropsNum) => {

        const sheetName = workbook.SheetNames[sheetNumber];
        console.log(sheetName);
        const normalPlayerWorkSheet = workbook.Sheets[sheetName];
        const players = [];
        let currentPlayer = 0;
        let currentRow = 1;

        // LOAD PLAYERS
        while (players.length < normalPlayerNum) {
            const playerNameCell = normalPlayerWorkSheet[`A${currentRow}`];

            const playerName = playerNameCell ? playerNameCell.v : `Player ${currentPlayer + 1}`; // because the player name is optional
            const strategyNumber = normalPlayerWorkSheet[`B${currentRow}`].v;

            const strategies = [];

            // LOAD STRATEGIES
            for (let i = 1; i <= strategyNumber; i++) {
                // currentRow + i because the current row is the player name and the strategy number
                const strategyNameCell = normalPlayerWorkSheet[`A${currentRow + i}`];

                const strategyName = strategyNameCell ? strategyNameCell.v : `Strategy ${i}`; // because the strategy name is optional
                const properties = []

                // LOAD PROPERTIES
                for (let j = 1; j <= normalPlayerPropsNum; j++) {
                    // c (0-based): j starts from 1 because the first column is the strategy name
                    // r (0-based): currentRow + i - 1 because currentRow + i is the row of the startegy, and minus 1 because the row in this method is 0-based (remove this -1 if you want to see the error)
                    const propertyCell = normalPlayerWorkSheet[XLSX.utils.encode_cell({ c: j, r: currentRow + i - 1 })];
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
    }
    const handleGetExcelTemplate = () => {
        if (validateForm()) {
            downloadExcel();
        }
    }
    const validateForm = () => {
        let error = false

        console.log("problem name", problemName);
        if (!problemName) {
            setProblemNameError("Problem name must not be empty");
            error = true;
        } else {
            console.log("free name");
            setProblemNameError("");
        }

        if (specialPlayerExists) {
            if (!specialPlayerPropsNum) {
                setSpecialPlayerPropsNumError("Special player properties must not be empty");
                console.log("over thewre");
                console.log(specialPlayerPropsNum);
                error = true;
            } else {
                console.log('over here');
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
        console.log("file", excelFile);
    };


    return (
        <div className="input-page">
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