import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';



const prices = {
    0: "9998.2376300954476192",
    1: "10001.1387452523136961",
    2: "10206.9239188890658175",
    3: "9723.7242330222814777",
    4: "9628.4013723463700975",
    5: "9763.9628342634036218",
    6: "9752.0821983106475568",
    7: "9598.8712979044846400",
    8: "9644.2003669424939477",
    9: "10116.8697777046407501",
    10: "10095.7062557568158454",
    11: "10113.8475952116189962",
    12: "10144.6209035757542652",
    13: "10023.3678521960955115",
    14: "9907.6469448002950064",
    15: "9739.9422447015789601",
    16: "9741.6773684365197592",
    17: "9801.2355338586282213",
    18: "9841.3750892458108830",
    19: "9864.6741278822685737",
    20: "9869.3492688943522803",
    21: "10168.8922635154524510",
    22: "10131.7386916804501336",
    23: "10099.7226007407264258",
    24: "9430.0871373433723734",
    25: "9437.7805675152482433",
    26: "9456.2141708401273126",
    27: "9461.7473092340921757",
    28: "9553.0816004153682373",
    29: "9526.4327770596637077",
    30: "9567.3497369122339128",
    31: "9608.1850805532914263",
    32: "9557.9478137008150227",
    33: "9553.8491498631913378",
    34: "9680.3299650108396246",
    35: "9608.7340787634816185",
    36: "9486.2014550686847212",
    37: "9575.7622449955186149",
    38: "9531.3164433680164086",
    39: "9533.3939330854226285",
    40: "9462.5157802892066436",
    41: "9520.3517992203800778",
}

function parseArray(prices) {
    const returnArray = [];
    for (let i = 0; i < Object.keys(prices).length; i++) {
        const current_value = prices[i];
        // console.log('current_value', current_value)
        const parsed_value = parseFloat(current_value);
        const current_object = {};
        current_object[i] = parsed_value;
        returnArray.push(current_object);
    }
    return returnArray;
}

const newPrices = parseArray(prices);
console.log("newPrices", newPrices)

const pricesY = [
    9998.2376300954476192,
    10001.1387452523136961,
    10206.9239188890658175,
    9723.7242330222814777,
    9628.4013723463700975,
    9763.9628342634036218,
    9752.0821983106475568,
    9598.8712979044846400,
    9644.2003669424939477,
    10116.8697777046407501,
    10095.7062557568158454,
    10113.8475952116189962,
    10144.6209035757542652,
    10023.3678521960955115,
    9907.6469448002950064,
    9739.9422447015789601,
    9741.6773684365197592,
    9801.2355338586282213,
    9841.3750892458108830,
    9864.6741278822685737,
    9869.3492688943522803,
    10168.8922635154524510,
    10131.7386916804501336,
    10099.7226007407264258,
    9430.0871373433723734,
    9437.7805675152482433,
    9456.2141708401273126,
    9461.7473092340921757,
    9553.0816004153682373,
    9526.4327770596637077,
    9567.3497369122339128,
    9608.1850805532914263,
    9557.9478137008150227,
    9553.8491498631913378,
    9680.3299650108396246,
    9608.7340787634816185,
    9486.2014550686847212,
    9575.7622449955186149,
    9531.3164433680164086,
    9533.3939330854226285,
    9462.5157802892066436,
    9520.3517992203800778,
]
const pricesX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]


class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: pricesX,
                datasets: [
                    {
                        label: "test1",
                        fill: true,
                        lineTension: .1,
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
                        data: pricesY,
                    }
                ],
            }
        }
    }



    setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext('2d');

        const { height: graphHeight } = ctx.canvas;

        const gradient = ctx.createLinearGradient(0, 0, 0, graphHeight);
        gradient.addColorStop(1, "rgb(255, 0, 110, .5 )"); //pink
        gradient.addColorStop(.9, "rgb(89, 60, 182, .7 )"); //purple
        gradient.addColorStop(.0, "rgb(12, 236, 197,.9)"); //green
        return gradient;
    }

    getChartData = canvas => {
        const data = this.state.data;
        if (data.datasets) {
            let colors = ['yellow', 'green'];
            data.datasets.forEach((set, i) => {
                set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                set.borderColor = "white";
                set.borderWidth = 2;
            })
        }
        return data
    }


    render() {
        return (
            <>
                <div style={ { position: "relative", padding: 20 } }>
                    <h2>Line Example</h2>
                    <Line
                        options={ {
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

                        }
                        }
                        data={ this.getChartData } />
                </div>

            </>
        );
    }
}

export default LineChart;