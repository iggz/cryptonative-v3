import React from 'react';
import ReactDOM from 'react-dom';
import BaseTemplate from './components/BaseTemplate';
import CssBaseline from '@material-ui/core/CssBaseline';


/* import lorem for testing */
import HeaderData from './components/Lorem/HeaderData';
import ParagraphData from './components/Lorem/ParagraphData';

/* import charts */
import LineChart from './components/Charts/LineChart';
import LineGraph from './components/Charts/LineGraph';
import Donut from './components/Charts/Donut'
import Chart from './components/Charts/Chart';
import GraphLine from './components/Charts/GraphLine';
import MarketIndexRow from './components/subcomponents/MarketIndexRow';

/* testing charts & lorem */
const App = () => {
    const data = {};
    return (
        <>
            <CssBaseline>
                <BaseTemplate>
                    <Donut />
                    <LineChart data={ data } />
                    <GraphLine />
                    <LineGraph />
                    <Chart data={ data } />


                </BaseTemplate>
            </CssBaseline>
        </>
    )
}

// /* testing the graphs as child componets */
// const App = () => {
//     return (
//         <>
//             <CssBaseline>
//                 <BaseTemplate>
//                     <LineGraph />
//                     <LineChart />
//                 </BaseTemplate>
//             </CssBaseline>
//         </>
//     )
// }

// /* multiple child components -- all lorem */
// const App = () => {
//     return (
//         <>
//             <CssBaseline>
//                 <BaseTemplate>
//                     <HeaderData />
//                     <ParagraphData />
//                     <HeaderData />
//                     <ParagraphData />
//                 </BaseTemplate>
//             </CssBaseline>
//         </>
//     )
// }

// /* header lorem */
// const App = () => {
//     return (
//         <>
//             <CssBaseline>
//                 <BaseTemplate>
//                     <HeaderData />
//                 </BaseTemplate>
//             </CssBaseline>
//         </>
//     )
// }

// /* paragraph lorem */
// const App = () => {
//     return (
//         <>
//             <CssBaseline>
//                 <BaseTemplate>
//                     <ParagraphData />
//                 </BaseTemplate>
//             </CssBaseline>
//         </>
//     )
// }

ReactDOM.render(<App />, document.getElementById('root'));
