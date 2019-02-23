import React, { Component } from 'react';
import './Search.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

        const myLink = props => <Link exact to={{
            pathname: "/recipes",
            state: {
                ingredients: ['chicken']
            }
        }}>Find recipes</Link>;
        
        return(
            <div className="search">
                <h1>Add an Ingredient</h1>
                <input type="file"/>
                <Button component={myLink} variant="contained">
                   Get Recipes
                </Button>
            </div>
        );
    }
}
export default Search
