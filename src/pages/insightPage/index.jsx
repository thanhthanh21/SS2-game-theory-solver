import React from 'react'
import "./style.scss"

import { useNavigate } from 'react-router-dom';
import NothingToShow from '../../components/NothingToShow';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ExcelImage from '../../images/excel.png'

export default function InsightPage() {
    const { data } = useContext(DataContext);
    Chart.register(...registerables);
    // const raw = {
    //     "fitnessValues": {
    //         "eMOEA": [
    //             -1231313123337.561111111111111111154124124,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56
    //         ],
    //         "VEGA": [
    //             -1231313123337.561111111111111111154124124,
    //             -237.56,
    //             -337.56,
    //             -437.56,
    //             -537.56,
    //             -637.56,
    //             -737.56,
    //             -837.56,
    //             -937.56,
    //             -1037.56,
    //             -500
    //         ],
    //         "NSGAII": [
    //             -1231313123337.561111111111111111154124124,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56
    //         ],
    //         "PESA2": [
    //             -1231313123337.561111111111111111154124124,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56,
    //             -337.56
    //         ]
    //     },
    //     "runtimes": {
    //         "eMOEA": [
    //             2.369,
    //             3.377,
    //             3.365,
    //             2.864,
    //             3.028,
    //             2.312,
    //             2.367,
    //             2.32,
    //             2.339,
    //             2.32
    //         ],
    //         "VEGA": [
    //             0.729,
    //             0.82,
    //             0.749,
    //             0.705,
    //             0.69,
    //             0.712,
    //             0.713,
    //             0.738,
    //             0.718,
    //             0.719
    //         ],
    //         "NSGAII": [
    //             1.519,
    //             1.559,
    //             1.564,
    //             1.611,
    //             1.524,
    //             1.765,
    //             1.532,
    //             1.485,
    //             0.882,
    //             0.891
    //         ],
    //         "PESA2": [
    //             0.958,
    //             0.828,
    //             0.813,
    //             0.817,
    //             0.796,
    //             0.841,
    //             0.914,
    //             1.013,
    //             0.881,
    //             0.8
    //         ]
    //     }
    // }

    // const data = {
    //     "insights": JSON.parse(JSON.stringify(raw))
    // }
    const handleExportToExcel = async () => {
        const workbook = XLSX.utils.book_new();
        const fitnessSheet = XLSX.utils.aoa_to_sheet([
            ['Iteration', 'NSGAII', 'eMOEA', 'PESA2', 'VEGA'],
        ])

        const totalRun = data.insights.fitnessValues.NSGAII.length
        for (let i = 0; i < totalRun; i++) {
            const row = [i + 1, data.insights.fitnessValues.NSGAII[i], data.insights.fitnessValues.eMOEA[i], data.insights.fitnessValues.PESA2[i], data.insights.fitnessValues.VEGA[i]]
            XLSX.utils.sheet_add_aoa(fitnessSheet, [row], { origin: -1 })
        }

        XLSX.utils.book_append_sheet(workbook, fitnessSheet, 'Fitness Values')

        const runtimeSheet = XLSX.utils.aoa_to_sheet([
            ['Iteration', 'NSGAII', 'eMOEA', 'PESA2', 'VEGA'],
        ])

        for (let i = 0; i < totalRun; i++) {
            const row = [i + 1, data.insights.runtimes.NSGAII[i], data.insights.runtimes.eMOEA[i], data.insights.runtimes.PESA2[i], data.insights.runtimes.VEGA[i]]
            XLSX.utils.sheet_add_aoa(runtimeSheet, [row], { origin: -1 })
        }

        XLSX.utils.book_append_sheet(workbook, runtimeSheet, 'Runtimes')

        const wbout = await XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, "insights.xlsx");
    }

    
    if (!data || !data.problem || !data.insights) {
        return (
            <NothingToShow />
        )
    }

    const graphData = {
        labels: Array.from(Array(10).keys(), x => x + 1),
        datasets: [
            {
                label: 'NSGAII',
                data: data.insights.runtimes.NSGAII,
                fill: false,
                borderColor: '#262A56',
                tension: 0.1
            },
            {
                label: 'eMOEA',
                data: data.insights.runtimes.eMOEA,
                fill: false,
                borderColor: '#3795BD',
                tension: 0.1
            },
            {
                label: 'PESA2',
                data: data.insights.runtimes.PESA2,
                fill: false,
                borderColor: '#E11299',
                tension: 0.1
            },
            {
                label: 'VEGA',
                data: data.insights.runtimes.VEGA,
                fill: false,
                borderColor: '#EBB02D',
                tension: 0.1
            }
        ]
    };


    const graphOptions = {
        responsive: true,
        maintainAspectRatio: false,
        width: 600,
        height: 600,
    };

    return (
        <div className='insight-page'>
            <h1 className="Problem">{data.problem.name}</h1>
            <p className='header-text'>Insights</p>
            <div className="row">
                <div className="btn" onClick={handleExportToExcel}>
                    <p>Export to Excel</p>
                    <img src={ExcelImage} alt="" />
                </div>
            </div>
                <div className="fitness-table">
                    <table>
                        <thead>
                            <tr>
                                <th class='first-col'>Iteration</th>
                                <th>NSGAII</th>
                                <th>eMOEA</th>
                                <th>PESA2</th>
                                <th>VEGA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // loop from 1 to 10
                                Array.from(Array(10).keys()).map((index) => (
                                    <tr key={index}>
                                        <td class='first-col'>{index + 1}</td>
                                        <td>{data.insights.fitnessValues.NSGAII[index]}</td>
                                        <td>{data.insights.fitnessValues.eMOEA[index]}</td>
                                        <td>{data.insights.fitnessValues.PESA2[index]}</td>
                                        <td>{data.insights.fitnessValues.VEGA[index]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <p class='figure-description'>Comparison of Fitness Values across different algorithms</p>

                </div>
                <div className="runtime-graph">
                    <Line class='graph' data={graphData} option={graphOptions} />
                    <p class='figure-description'>Comparison of runtime (in seconds) across various algorithms</p>

                </div>
            </div>
            );
}