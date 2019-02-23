import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Title.css';
import title from './resources/title-image.jpg';

class Title extends Component {
    render() {
        return (
            <div>
                <h1>Food for Thought</h1>
                {/*image from https://nypost.com/2018/04/04/youre-likely-eating-tiny-chunks-of-plastic-in-home-cooked-meals/*/}
                <img src={title} alt="Tasty food being cooked."/>
                <Link to="/search">Begin</Link>
            </div>
        );
    }
}

export default Title