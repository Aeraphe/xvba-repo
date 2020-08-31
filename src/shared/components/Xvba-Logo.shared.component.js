import React from 'react';



export const XvbaLogoSharedComp = (props) => {


    return (
        <div style={{ fontSize: props.size }}>
            <span style={{ color: '#81B441', fontWeight: 'bold' }}>X</span>vba
            <div>{props.children}</div>
        </div>

    )
}