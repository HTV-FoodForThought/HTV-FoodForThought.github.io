import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadingImage: false,
            selectedImage: false,
            selectedIngredient: false,
        };
    }

    render() {
        return(
            <div className="search">
                <h1>Add an Ingredient</h1>
                <input type="file"/>
            </div>
        );
    }
}
export default Search
