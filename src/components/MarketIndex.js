/* the idea is to store the list of all crytopcurrencies by
 * name & ticker in state at this level. then, each row will be
 * built out by passing down pairs of (name, ticker) to a row
 * subcomponent for each such currency. doing this in state allows
 * for the dynamic nature of a changing list of currencies to be
 * maintained & reflected in the app.
 */

import React, { Component } from 'react';
import fetch from 'node-fetch';

import MarketIndexRow from './subcomponents/MarketIndexRow';

class MarketIndex extends Component {
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

    render() {
        if (this.state.rendered) {
            return (
                <div>
                    {this.state.list.map((item) => (
                        <>
                            <MarketIndexRow
                                id={item.id}
                                name={item.name}
                                ticker={item.ticker}
                            />
                            <hr />
                        </>
                    ))}
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

export default MarketIndex;
