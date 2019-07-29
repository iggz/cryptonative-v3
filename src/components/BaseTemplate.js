import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchAppBar from './subcomponents/SearchAppBar';
import LabelBottomNavigation from './subcomponents/LabelBottomNavigation';
import Box from '@material-ui/core/Box';

/* get some lorem for testing */
// import HeaderData from './lorem/HeaderData';
// import ParagraphData from './lorem/ParagraphData';

class BaseTemplate extends Component {
    constructor(props) {
        super(props);
        this.div = React.createRef();
        this.state = { dimensions: [] };
    }

    componentDidMount() {
        // extract reference node in rendered JSX
        const node = ReactDOM.findDOMNode(this.div.current);
        // get the dimnensions of the top & bottom navs
        const dims = this.getBoxDimensions(node);
        // update state to reflect this knowledge
        this.setState({ dimensions: dims });
    }

    getBoxDimensions(node) {
        // get the dimensions of navbar & footer given a base node
        const navbar = node.getElementsByClassName('MuiPaper-root')[0],
            footer = node.getElementsByClassName('MuiBottomNavigation-root')[0];
        const navbarWidth = navbar.offsetWidth,
            navbarHeight = navbar.offsetHeight,
            footerWidth = footer.offsetWidth,
            footerHeight = footer.offsetHeight;
        return [navbarWidth, navbarHeight, footerWidth, footerHeight];
    }

    render() {
        /* content will be passed in thru props & will be renderd into box 
         * where lorem header data component is being instantiated. specifically,
         * the content available in props is thru the children prop and can be
         * any number of components. as such, it's accessed below via `props.children`.
         */
        return (
            <div style={{ height: '100%' }} ref={this.div}>
                <Box display="flex" flexDirection="column">
                    <SearchAppBar />
                    <Box flex="1"
                        overflow="auto"
                        display="flex"
                        flexDirection="column"
                        alignItems="stretch"
                    >
                        {this.state.dimensions ? (
                            <>
                                <Box
                                    style={{
                                        marginTop: `${this.state.dimensions[1]}px`,
                                        marginBottom: `${this.state.dimensions[3]}px`
                                    }}
                                >
                                    {this.props.children}
                                </Box>
                            </>
                        ) : (
                                <></>
                            )}
                    </Box>
                    <LabelBottomNavigation />
                </Box>
            </div>
        )
    }
}

export default BaseTemplate;
