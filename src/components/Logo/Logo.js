import React from 'react';

import burgerLogo from '../../assets/images/Logo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Project" />
    </div>
);

export default logo;