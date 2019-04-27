import React from 'react';

import classes from './Tile.css';

const post = (props) => (
    <article className={classes.Tile} onClick={props.clicked}>
        <h1>{props.title}</h1>
    </article>
);

export default post;