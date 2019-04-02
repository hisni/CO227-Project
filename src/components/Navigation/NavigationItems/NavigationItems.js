import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Home</NavigationItem>
        <NavigationItem link="/post-add">POST ADD</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/register">Register</NavigationItem>
    </ul>
);

export default navigationItems;