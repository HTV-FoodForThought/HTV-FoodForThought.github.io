import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Title.css';
import title from './resources/title-image.jpg';
import yeet from './resources/thot.png';
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import { Grid } from '@material-ui/core';
import Flip from 'react-reveal/Flip';

class Title extends Component {
    render() {
        return (
            <div className="title">
                <Grid container spacing={24} xs={12} className="title-header">
                    <Fade><img src={yeet} alt="Thought bubble." className="thot-image"/></Fade>
                    <Fade><h1 className='center'>Food for Thought</h1></Fade>
                    {/*image from https://nypost.com/2018/04/04/youre-likely-eating-tiny-chunks-of-plastic-in-home-cooked-meals/*/}
                    <Fade><img src={title} alt="Tasty food being cooked." className="title-image"/></Fade>
                    <LightSpeed left><h4 className='center'>You have the ingredients, we've got the dishes</h4></LightSpeed>
                    <Link className="title-btn" to="/search">Begin</Link>
                </Grid>
            </div>
        );
    }
}

export default Title