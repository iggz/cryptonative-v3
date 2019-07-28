import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchAppBar from './SearchAppBar';
import LabelBottomNavigation from './LabelBottomNavigation';
import Box from '@material-ui/core/Box';
import Row from './Row';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            rendered: false
        };
    }

    componentDidMount() {
        // construct the request
        const base_url = "https://api.coincap.io/v2/",
            resource = 'assets';
        const request_url = base_url + resource;
        // now perform the fetch
        fetch(request_url)
            .then(resp => resp.json())
            // extract the data array
            .then(data => data.data)
            // update state with list of all (id, name, ticker) tuples as objects
            .then(array => array.map(item => {
                return (
                    {
                        id: item.id,
                        name: item.name,
                        ticker: item.symbol
                    }
                );
            }))
            // update state
            .then(array => this.setState({
                list: array,
                rendered: !this.state.rendered
            }));
    }

    componentDidUpdate() {
        // get dimensions of navbar & footer
        const node = ReactDOM.findDOMNode(this.divElement);
        const navbar = node.getElementsByClassName('MuiPaper-root')[0],
            footer = node.getElementsByClassName('MuiBottomNavigation-root')[0];
        const navbarWidth = navbar.offsetWidth,
            navbarHeight = navbar.offsetHeight,
            footerWidth = footer.offsetWidth,
            footerHeight = footer.offsetHeight;
        console.log("===NAVBAR===");
        console.log("width: ", navbarWidth, " | height: ", navbarHeight);
        console.log("===FOOTER===");
        console.log("width: ", footerWidth, " | height: ", footerHeight);
    }

    render() {
        if (this.state.rendered) {
            return (
                <div style={{ height: '100%' }} ref={(divElement) => this.divElement = divElement}>
                    <Box display="flex" flexDirection="column">
                        <SearchAppBar />
                        <Box flex="1"
                            overflow="auto"
                            display="flex"
                            flexDirection="column"
                            alignItems="stretch"
                        >
                            {this.state.list.map((item) => (
                                <>
                                    <Row
                                        id={item.id}
                                        name={item.name}
                                        ticker={item.ticker}
                                    />
                                    <hr />
                                </>
                            ))}
                        </Box>
                        <LabelBottomNavigation />
                    </Box>
                </div>
            )
        } else {
            // handles the initial case before state is populated
            // with API response containing cryptocurrencies
            return (
                <div></div>
            )
        }
    }
}

export default App;
