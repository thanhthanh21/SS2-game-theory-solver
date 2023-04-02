import React from 'react';
import { useState, useEffect } from 'react';
import "./style.scss";
import SpecialPlayerInput from "../../components/specialPlayerInput";
import Input from "../../components/input";
import ExcelImage from '../../images/excel.png'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
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

    const [data, setData] = useState(null)


    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log("file", excelFile);
    // }, [excelFile]);

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

    const readExcelFile = (file) => {
        const reader = new FileReader();
        try {
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
    
                const problemName = worksheet["B1"].v
                const specialPlayerExists = worksheet["B2"].v
                const specialPlayerPropsNum = worksheet["B3"].v
                const normalPlayerNum = worksheet["B4"].v
                const normalPlayerPropsNum = worksheet["B5"].v
                const fitnessFunction = worksheet["B6"].v
                const playerPayoffFunction = worksheet["B7"].v
    
                setProblemName(problemName);
                setSpecialPlayerExists(specialPlayerExists);
                setSpecialPlayerPropsNum(specialPlayerPropsNum);
                setNormalPlayerNum(normalPlayerNum);
                setNormalPlayerPropsNum(normalPlayerPropsNum);
                setFitnessFunction(fitnessFunction);
                setPlayerPayoffFunction(playerPayoffFunction);
    
                
                if (specialPlayerExists) {
                    const specialPlayerSheet = workbook.SheetNames[1];
                    const worksheet = workbook.Sheets[specialPlayerSheet];
                    const properties = []
                    const weights = []

                    for (let i = 1; i <= specialPlayerPropsNum; i++) {
                        // the first row is the header
                        properties.push(worksheet[`A${i+1}`].v)
                        weights.push(worksheet[`B${i+1}`].v)
                    }
                    
                    console.log("properties", properties);
                    console.log("weights", weights);

                    const normalPlayerSheet = workbook.SheetNames[2];
                    console.log("normal player sheet", normalPlayerSheet);
                    const worksheet2 = workbook.Sheets[normalPlayerSheet];
                    const players = [];
                    let currentPlayer = 0;
                    let currentRow = 1;

                    while (players.length < normalPlayerNum) {
                        console.log("current row", currentRow);
                        const playerNameCell = worksheet2[`A${currentRow}`];
                        
                        const playerName = playerNameCell ? playerNameCell.v : `Player ${currentPlayer + 1}`; // because the player name is optional
                        console.log("player name", playerName);
                        const strategyNumber = worksheet2[`B${currentRow}`].v;
                        console.log("strategy number", strategyNumber);

                        const strategies = [];

                        //LOAD STRATEGIES
                        for (let i = 1; i <= strategyNumber; i++) {
                            const strategyNameCell = worksheet2[`A${currentRow + i}`];
                            
                            const strategyName = strategyNameCell ? strategyNameCell.v : `Strategy ${i}`; // because the strategy name is optional
                            console.log("strategy name", strategyName);
                            const properties = []

                            //LOAD PROPERTIES
                            for (let j = 0; j < normalPlayerPropsNum; j++) {
                                const propertyCell = worksheet2[XLSX.utils.encode_cell({ c: j + 1, r: currentRow + i - 1} )]; // first column is the strategy name,
                            
                                console.log("property cell: ", propertyCell);
                                properties.push(propertyCell.v)
                            }

                            strategies.push({
                                name: strategyName,
                                properties: properties
                            })

                        }

                        
                        currentRow += strategyNumber + 1;


                        players.push({
                            name: playerName,
                            strategies: strategies
                        })
                    }
                    console.log("players", players);
                }
    
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            console.log(error);
            setExcelFileError("Error when reading file");
        }
    };

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
                        descrition=""
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
                        descrition=""
                    />
                    <Input
                        message='Number of properties each strategy of normal player'
                        text='number'
                        error={normalPlayerPropsNumError}
                        handleOnChange={(e) => setNormalPlayerPropsNum(e.target.value)}
                        value={normalPlayerPropsNum}
                        descrition=""
                    />
                </div>

                <div className="row">
                    <Input
                        message='Fitness function'
                        type='text'
                        error={fitnessFunctionError}
                        handleOnChange={(e) => setFitnessFunction(e.target.value)}
                        value={fitnessFunction}
                        descrition=""
                    />
                </div>

                <div className="row">
                    <Input
                        message='Player payoff function'
                        type='text'
                        error={playerPayoffFunctionError}
                        handleOnChange={(e) => setPlayerPayoffFunction(e.target.value)}
                        value={playerPayoffFunction}
                        descrition=""
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