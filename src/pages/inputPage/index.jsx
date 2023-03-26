import React from 'react';
import "./style.scss";
import SpecialPlayerInput from "../../components/specialPlayerInput";
import Input from "../../components/input";
import ExcelImage from '../../images/excel.png'
import { saveAs } from 'file-saver';
import Excel from 'exceljs';


export default function InputPage() {

    const downloadExcel = () => {
        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet('Sheet 1');

        // Add data to the worksheet here

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'filename.xlsx');
        });
    }


    const handleDrop = (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        console.log(file.name);
    }

    const handleOnDragEnter = (event) => {
        event.preventDefault()

        event.target.classList.add("dragging")
    }

    const handleOnDragLeave = (event) => {
        event.preventDefault()

        event.target.classList.remove("dragging")
    }

    return (
        <div className="input-page">
            <p class='header-text'>Enter information about your problem</p>
            <div className="input-container">
                <div className="row">
                    <Input message='Your problem name'/>
                </div>
                <div className="row">
                    <SpecialPlayerInput />
                </div>

                <div className="row">
                    <Input message='Number of normal players'/>
                    <Input message='Number of properties each strategy of normal player'/>

                </div>

                <div className="row">
                    <Input message='Fitness function'/>
                </div>

                <div className="row">
                    <Input message='Player payoff function'/>
                </div>
            </div>
            <div className="excel-btn" onClick={downloadExcel}>
                <p>Get Excel Template</p>
                <img src={ExcelImage} alt="" />
            </div>
            <div className="drag-area" onDrop={handleDrop} onDragEnter={handleOnDragEnter} onDragLeave={handleOnDragLeave}>
                <p class='drag-text'>Drag and drop a file here</p>
                <label htmlFor="select-file" id='select-file-label'>Choose a file</label>
                <input type="file" id="select-file"/>
            </div>
        </div>
    )
}