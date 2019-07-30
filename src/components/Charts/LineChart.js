import React from 'react';
import { Line } from 'react-chartjs-2';


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Coin Name',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

export default function LineChart(props) {
    return (
        <div style={ { position: "relative", padding: 20 } }>
            <h2>Line Example</h2>
            <Line data={ data } options={ {
                responsive: true,
                fill: true,
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: '#aaa',
                                borderDash: [1, 3],
                            },
                            display: false, // this will hide vertical lines
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                color: '#aaa',
                                borderDash: [1, 3],
                            },
                            display: false, // this will hide vertical lines
                        },
                    ],
                },
            } } />
        </div>
    );

};

