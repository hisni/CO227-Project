import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Home</NavigationItem>
        <NavigationItem link="/">POST ADD</NavigationItem>
        <NavigationItem link="/">Login</NavigationItem>
        <NavigationItem link="/">Register</NavigationItem>
    </ul>
);

export default navigationItems;