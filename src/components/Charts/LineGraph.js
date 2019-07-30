import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = true;
//--Chart Style Options--//


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/////////////////////////////////////////////////////////////////

const coincap = "https://api.coincap.io/v2/assets/bitcoin/history?interval=m15";
/***********/
/* methods */
/***********/
function get(url) {
    /* main getter for API data */
    return fetch(url)
        .then(response => {
            // render the response as json
            return response.json();
        })
        .then(data => {
            // pass out the data
            console.log("get", data);
            return data;
        })
        .catch(error => {
            return error;
        });
}

const prices = [];
const dates = [];
const times = [];

function loadCoinPrices() {
    const url = `https://api.coincap.io/v2/assets/bitcoin/history?interval=m15`;
    get(url)
        .then(response => {
            // log out the status of the response
            console.log("LineGraph response", response)
            let count = 0;
            // now, the prices are stored in an array of objects
            response.data.forEach(price => {
                // get the current price
                const priceUSD = price.priceUsd;

                // extract the date & time
                const datestring = price.date;
                const dateAndTime = datestring.split("T");
                const day = dateAndTime[0];
                const time = dateAndTime[1].substr(0, 5);
                // add it to the price, date & time arrays
                if (count % 16 == 0) {
                    // but only if it's every 16th element...
                    prices.push(priceUSD);
                    dates.push(day);
                    times.push(time);
                }
                // bump up the count
                count++;
            })


            return [prices, dates, times];
        })
}
loadCoinPrices();

function parseArray(prices) {
    const returnArray = [];
    for (let i = 0; i < prices; i++) {
        const current_value = prices[i];
        console.log('current_value', current_value)
        const parsed_value = parseFloat(current_value);
        const current_object = { i: parsed_value }
        returnArray.push(current_object);
    }
    return returnArray;
}


console.log("parseArray", parseArray(prices));
console.log("prices are", prices);
const parsedPrices = parseArray(prices);
console.log("parsedPrices", parsedPrices);


/////////////////////////////////////////////////////////////////

const getState = () => ({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(244, 144, 128, 0.8)',
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
            pointHitRadius: 10
        }
    ]
});


export default class LineGraph extends Component {
    chartRef = React.createRef();

    componentWillMount() {
        setInterval(() => {
            this.setState(getState());
        }, 2000);
    }

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        const { height: graphHeight } = myChartRef.canvas;

        let gradientLine = myChartRef.createLinearGradient(0, 0, 0, graphHeight);
        gradientLine.addColorStop(0, "rgb(12, 236, 197, 0.7)");
        gradientLine.addColorStop(1, "rgb(89, 60, 182, 0.7)");

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: "LineGraph",
                        data: [],
                        fill: true,
                        fillColor: gradientLine,
                        backgroundColor: gradientLine,

                        borderColor: "#6610f2"
                    },
                    {
                        label: "National Average",
                        data: average,
                        fill: false,
                        borderColor: "#E0E0E0"
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });

    }

    render() {

        return (
            <div className={ classes.graphContainer }>
                <canvas
                    id="myChart"
                    ref={ this.chartRef }
                />
            </div>
        )
    }
}