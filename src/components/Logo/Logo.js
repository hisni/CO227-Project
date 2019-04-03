import React from 'react';
import { NavLink } from 'react-router-dom';
import burgerLogo from '../../assets/images/Logo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <NavLink to="/" exact>
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="Project" />
        </div>
    </NavLink>
);

export default logo;