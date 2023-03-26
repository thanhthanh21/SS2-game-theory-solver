import React from 'react';
import { useState, useEffect } from 'react';
import "./style.scss";
import SpecialPlayerInput from "../../components/specialPlayerInput";
import Input from "../../components/input";
import ExcelImage from '../../images/excel.png'
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
// impor

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



    // useEffect(() => {
    //     console.log("file", excelFile);
    // }, [excelFile]);

    const handleGetExcelTemplate = () => {
        if (validateForm()) {
            console.log("No error");
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
        const workbook = new Excel.Workbook();
        const sheet1 = workbook.addWorksheet('Problem information')

        sheet1.addRow(["Problem name", problemName]);
        sheet1.addRow(["Special Player exists (0 - No, 1 -Yes) ", specialPlayerExists ? 1 : 0]);
        sheet1.addRow(["Number of properties of special player", Number(specialPlayerPropsNum)]);
        sheet1.addRow(["Number of normal players", Number(normalPlayerNum)]);
        sheet1.addRow(["Number of properties of each normal player", Number(normalPlayerPropsNum)]);
        sheet1.addRow(["Fitness function", fitnessFunction]);
        sheet1.addRow(["Player payoff function", playerPayoffFunction]);
        
        sheet1.getColumn(1).width = 40;
        sheet1.getColumn(1).alignment = { horizontal: 'left' };
        sheet1.getColumn(2).width = 50;
        sheet1.getColumn(2).alignment = { horizontal: 'left' };


        if (specialPlayerExists) {
            const sheet2 = workbook.addWorksheet('Special player');
            sheet2.addRow(["Properties", "Weights"])
            sheet2.getColumn(1).width = 20;
            sheet2.getColumn(1).alignment = { horizontal: 'middle' };
            sheet2.getColumn(2).width = 20;
            sheet2.getColumn(2).alignment = { horizontal: 'middle' };
        }


        const sheet3 = workbook.addWorksheet('Normal player');
        const sheet4 = workbook.addWorksheet('Conflict matrix');

        // Add data to the worksheet here

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'input.xlsx');
        });
    }


    const handleDrop = (event) => {
        event.preventDefault();
        setExcelFile(event.dataTransfer.files[0]);
        event.target.classList.remove("dragging")
        if (excelFile) {
            const extension = excelFile.name.split(".").pop();
            console.log(extension);
            if (extension !== "xlsx") {
                alert("Invalid file type");
                setExcelFile(null);
                return;
            }
        }
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
            <div className="drag-area"
                onDrop={handleDrop}
                onDragEnter={handleOnDragEnter}
                onDragLeave={handleOnDragLeave}
                onDragOver={handleOnDragEnter}
            >
                <p className='drag-text'>{excelFile ? excelFile.name : 'Drag and drop a file here'}</p>
                <label htmlFor="select-file" id='select-file-label'>Choose a file</label>
                <input type="file" id="select-file" handleOnChange={handleFileInput} />
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