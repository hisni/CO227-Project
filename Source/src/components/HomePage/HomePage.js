import React from 'react';
import Layout from '../../hoc/Layout/Layout';
import Intro from '../Intro/Intro'
import Districts from '../../containers/Districts/Districts';
import classes from './HomePage.css'
import Background from './green-map-of-sri-lanka-isometric-icon-vector-13502537.jpg'

const HomePage = (props) => {

    var style = {
        backgroundImage : "url("+Background+")",
        height : "984px",
        width: "100%",
        backgroundRepeat  : 'no-repeat',
    }

  return (
    <Layout>
        <div style={style}>
            <div className={classes.ints}>
                <Intro/>
            </div>
            <div className={classes.districts}>
                <Districts pageChange={props.pageChange}/>
            </div>
        </div>
    </Layout>
    );
}

export default HomePage
