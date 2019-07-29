// this component will be a functional component that is meant to
// purely render two pieces of data as an element in a row.

import React from 'react';
import '../../styles/RowItem.css';

const RowItem = (props) => {
    return (
        <div className="flex-Wrapper">
            <h4>{props.data.price}</h4>
            <h4>{props.data.percent_change}</h4>
        </div>
    )
}

export default RowItem;