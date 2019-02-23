import React, { Component } from 'react';
import './Search.css';
import placeholder from './resources/placeholder.jpg'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstLoad: true,
            loadingImage: false,
            selectedImage: false,
            ingredients: [],
        };
    }

    render() {
        if(this.state.firstLoad) {
            return(
                <div>
                    <input type="file"></input>
                    <img src= {placeholder} alt="Default placeholder for ingredients."></img>
                    {/*title + upload + placeholder image*/}
                </div>
            );
        } else if (this.state.loadingImage) {
            return(
                <div>
                    {/*freeze the screen with loading indicator, replace image*/}
                </div>
            )
        } else if (this.state.selectedImage) {
            return (
                <div>
                    {/*show everything, determine if button shows based on # of ingredients*/}
                </div>
            )
        }
    }
}
export default Search
