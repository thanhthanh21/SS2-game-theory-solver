import React from 'react';
import { useState, useEffect } from 'react';
import "./style.scss";
import SpecialPlayerInput from "../../components/specialPlayerInput";
import Input from "../../components/input";
import ExcelImage from '../../images/excel.png'
import { saveAs } from 'file-saver';
import Excel from 'exceljs';


export default function InputPage() {
    const [excelFile, setExcelFile] = useState(null);
    console.log(excelFile);

    useEffect(() => {
        console.log("file", excelFile);
    }, [excelFile]);

    const downloadExcel = () => {
        const workbook = new Excel.Workbook();
        const sheet1 = workbook.addWorksheet('Guide');
        const sheet2 = workbook.addWorksheet('Special player');
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
                    <Input message='Your problem name' />
                </div>
                <div className="row">
                    <SpecialPlayerInput />
                </div>

                <div className="row">
                    <Input message='Number of normal players' />
                    <Input message='Number of properties each strategy of normal player' />

                </div>

                <div className="row">
                    <Input message='Fitness function' />
                </div>

                <div className="row">
                    <Input message='Player payoff function' />
                </div>
            </div>
            <div className="excel-btn" onClick={downloadExcel}>
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
//     <input type="file" id="select-file" onChange={handleFileInput} />
// </div>