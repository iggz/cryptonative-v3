import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import { format } from 'date-fns';

const pointBackgroundColor = '#fff';
defaults.global.defaultFontColor = '#7C8087';
defaults.global.defaultFontFamily = 'Lato, sans serif';
defaults.global.defaultFontSize = 12;

const getColors = () => [
    /*0*/    { "hex": "#19c4ac", "rgb": "25, 196, 172" }, // Likes
    /*1*/    { "hex": "#18bae2", "rgb": "24, 186, 226" }, // Views
    /*2*/    { "hex": "#eca227", "rgb": "236, 162, 39" },
    /*3*/    { "hex": "#dc2b67", "rgb": "220, 43, 103" }, // Comments
    /*4*/    { "hex": "#7290e8", "rgb": "114, 144, 232" }, // Shares
    /*5*/    { "hex": "#da5c14", "rgb": "218, 92, 20" },
    /*6*/    { "hex": "#0c6a81", "rgb": "12, 106, 129" },
    /*7*/    { "hex": "#D1F3EE", "rgb": "209, 243, 238" }, // Likes
    /*8*/    { "hex": "#D1F1F9", "rgb": "209, 241, 249" }, // Views
    /*9*/    { "hex": "#F8D5E1", "rgb": "248, 213, 225" }, // Comments
    /*10*/   { "hex": "#E3E9FA", "rgb": "227, 233, 250" }, // Shares
    /*11*/   { "hex": "#FFFFFF", "rgb": "255 255, 255" }
];

const colors = getColors();

let items = [
    { title: 'Views', color: colors[1].hex, fillColor: colors[8].hex },
    { title: 'Likes', color: colors[0].hex, fillColor: colors[7].hex },
    { title: 'Comments', color: colors[3].hex, fillColor: colors[9].hex },
    { title: 'Shares', color: colors[4].hex, fillColor: colors[10].hex }
];

//Views #D1F1F9, Likes #D1F3EE, Comments #F8D5E1, shares #E3E9FA
const getOptions = (year) => {
    return {
        legend: {
            display: true,
            labels: {
                fullWidth: false,
                padding: 20,
                fontSize: 12,
                usePointStyle: true
            },
        },
        tooltips: {
            titleFontFamily: 'Lato,sans-serif',
            titleFontColor: '#333',
            titleFontSize: 16,
            titleMarginBottom: 10,
            bodyFontFamily: 'Lato,sans-serif',
            bodyFontColor: '#333',
            bodySpacing: 8,
            footerFontFamily: 'Lato,sans-serif',
            backgroundColor: '#fcfcfc',
            borderColor: '#cfcfcf',
            borderWidth: 1,
            multiKeyBackground: '#fff',
            mode: 'index',
            xPadding: 15,
            yPadding: 10,
            caretSize: 12,
            position: 'nearest',
            callbacks: {
                labelColor: function (tooltipItem) {
                    const color = items[tooltipItem.datasetIndex].color;
                    return {
                        borderColor: color,
                        backgroundColor: color,
                    };
                },
                title: function (i, c) {
                    return c.labels[i[0].index] + '/' + year;
                }
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    callback: function (dataLabel, index) {
                        return index % 2 === 0 ? dataLabel : '';
                    }
                },
                gridLines: {
                    display: true,
                    drawOnChartArea: false,
                    drawBorder: false
                },
            }],
            yAxes: [{
                stacked: true,
                gridLines: {
                    drawBorder: false,
                    lineWidth: 0,
                    borderDash: [2, 3]
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                borderWidth: 2,
                backgroundColor: '#fff',
                borderColor: '#fff',
                radius: 3,
                hitRadius: 10,
                hoverRadius: 4,
            }
        }
    };
};
export default function Chart(props) {
    let data = parseData(props);
    let d = props.title;
    let title = 'Engagements for ' + format(d, 'MMMM YYYY');
    let year = new Date(d).getFullYear();
    let options = getOptions(year);
    return (
        <div className="csp-metrics-container">
            <h4 className="csp-data-heading">{ title }</h4>
            <Line height={ 75 } data={ data } options={ options } />
        </div>
    );
}
Chart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};
function parseData(props) {
    let labels = [];
    let totals = [];
    let shares = [];
    let views = [];
    let comments = [];
    let datasets = [];
    let likes = [];
    if (!props.data) {
        return {
            labels: [],
            datasets: []
        };
    }
    for (let i = 0, len = props.data.length; i < len; i++) {
        const curr = props.data[i];
        let month = curr.m + '';
        let dayOfMonth = (curr.i) + '';
        const showDay = (dayOfMonth.length < 2) ? `0${dayOfMonth} ` : dayOfMonth;
        month = (month.length < 2) ? `0${month} ` : month;
        dayOfMonth = `${month}/${showDay}`;
        labels.push(dayOfMonth);
        totals.push(curr.t);
        comments.push(curr.c);
        likes.push(curr.l);
        shares.push(curr.s);
        views.push(curr.v);
    }
    datasets.push({ label: items[0].title, data: views, borderColor: items[0].color, backgroundColor: items[0].fillColor, pointBackgroundColor: pointBackgroundColor, lineTension: 0 });
    datasets.push({ label: items[1].title, data: likes, borderColor: items[1].color, backgroundColor: items[1].fillColor, pointBackgroundColor: pointBackgroundColor, lineTension: 0 });
    datasets.push({ label: items[2].title, data: comments, borderColor: items[2].color, backgroundColor: items[2].fillColor, pointBackgroundColor: pointBackgroundColor, lineTension: 0 });
    datasets.push({ label: items[3].title, data: shares, borderColor: items[3].color, backgroundColor: items[3].fillColor, pointBackgroundColor: pointBackgroundColor, lineTension: 0 });
    return {
        labels: labels,
        datasets: datasets
    };
}