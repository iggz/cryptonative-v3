import React from 'react';
import ReactDOM from 'react-dom';
import BaseTemplate from './components/BaseTemplate';
import CssBaseline from '@material-ui/core/CssBaseline';
import MarketIndex from './components/MarketIndex';

// /* import lorem for testing */
// import HeaderData from './components/lorem/HeaderData';
// import ParagraphData from './components/lorem/ParagraphData';

// /* import charts */
// import LineChart from './components/Charts/LineChart';
// import LineGraph from './components/Charts/LineGraph';

/* testing row insertion */
const App = () => {
    return (
        <>
            <CssBaseline>
                <BaseTemplate>
                    <MarketIndex />
                </BaseTemplate>
            </CssBaseline>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
