import React from 'react';
import '../../styles/RowBadge.css';
import Avatar from '@material-ui/core/Avatar';

const RowBadge = (props) => {
    let logo = require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
    try {
        logo = require(`../../../node_modules/cryptocurrency-icons/svg/color/${props.ticker.toLowerCase()}.svg`);
    } catch (e) {
        console.log("error: ", e.message);
    }

    return (
        <div className="flex-row-container">
            <div className="icon-container">
                <Avatar alt={props.ticker} src={logo} className="icon" />
            </div>
            <div className="flex-col-container">
                <h3 style={{ textAlign: 'center' }}>{props.ticker}</h3>
                <h3 style={{ textAlign: 'center' }}>{props.name}</h3>
            </div>
        </div>
    )
}

export default RowBadge;