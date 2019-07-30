import React, { Component } from 'react';
import fetch from 'node-fetch';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import { format } from 'date-fns';

const url = "https://api.coincap.io/v2/assets/bitcoin/history?interval=m15";

const prices = [];


function get(url) {
    /* main getter for API data */
    return fetch(url)
        .then(response => {
            // render the response as json
            console.log("graphLine response", response)
            return response.json();
        })
        .then(data => {
            // pass out the data
            console.log("get graphLine", data);
            console.log("get graphLine2", data.data)
            prices.push((data.data));
            return data;
        })

        .catch(error => {
            return error;
        });
}

function parseArray(arrOfPrices) {
    const returnArray = [];
    for (let i = 0; i < arrOfPrices; i++) {
        const current_value = arrOfPrices[i][i];
        console.log('current_value', current_value)
        const parsed_value = parseFloat(current_value);
        const current_object = { i: parsed_value }
        returnArray.push(current_object);
    }
    return returnArray;
}


get(url);
console.log("graph prices", prices)

const parsedPrices = parseArray(prices);
console.log("parsed prices", parsedPrices)

class GraphLine extends Component {

    render() {
        return (
            <>
                <div>
                    <h2>GraphLine</h2>
                    <Line data={ this.state } />
                </div>
            </>
        );
    }
}

export default GraphLine;