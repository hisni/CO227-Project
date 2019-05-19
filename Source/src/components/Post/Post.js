import React from 'react';

import classes from './Post.css';

const post = (props) => (
    <article className={classes.Post} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            <div>{props.type}</div>
            <div>{props.contect}</div>  
            <div className={classes.Author}>{props.address}</div>
        </div>
    </article>
);

export default post;