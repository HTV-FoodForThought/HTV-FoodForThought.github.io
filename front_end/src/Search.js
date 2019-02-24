import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import placeholder from './resources/placeholder.jpg'
import LoadingOverlay from 'react-loading-overlay';
import { upload_photo } from './backend/backendRequests.js';
import { ListItem } from '@material-ui/core';
import { Button } from '@material-ui/core';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstLoad: true,
            loadingImage: false,
            selectedImage: placeholder,
            imageFile: null,
            currImageIngredients: [],
            selectedIngredients: [],
            ingredientList: [],
        };
    }

    render() {
        if(this.state.loadingImage) {
            return(
                <LoadingOverlay active={this.state.loadingImage} spinner text='Loading your content...'>
                </LoadingOverlay>
            );
        }
        return(
            <div>
                <h1>Add an Ingredient</h1> 
                <input type="file" onChange ={(e) => this.handleFile(e)} className = "selectFile"></input>
                {/*https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg*/}
                <img src= {this.state.selectedImage} alt="Uploaded Ingredient" className="ingredientImage"></img>
                {/*title + upload + placeholder image*/}
                {this.state.currImageIngredients}
                <p>Selected Ingredients:</p>
                {this.state.ingredientList}
                <Link exact to={{
                    pathname: "/recipes",
                    state: {
                        ingredients: this.state.selectedIngredients
                    }
                }} className="recipeLink">Find recipes</Link>
            </div>
        );
    }

    /*With reference to https://codepen.io/hartzis/pen/VvNGZP*/
    handleFile = (e) => {
        e.preventDefault();
        let r = new FileReader();
        let file = e.target.files[0];
        this.setState({...this.state, firstLoad: false, loadingImage: true});
        r.onloadend = () => {
            this.setState({...this.state, selectedImage: r.result, imageFile: file});
        }
        r.readAsDataURL(file);
        upload_photo(file).then((responseJson) => {
            let copy = [];
            responseJson.data.response.forEach(element => {
                copy.push(
                    <ListItem button onClick={this.addIngredient.bind(this,element)}>
                        <p>{element}</p>
                    </ListItem>
                )
            });
            this.setState({...this.state, currImageIngredients: copy, loadingImage: false});
        }) .catch((error) => {
            console.log(error);
        });
    }

    addIngredient(element) {
        if (!this.state.selectedIngredients.includes(element)) {
            let copy = [...this.state.selectedIngredients];
            copy.push(element);
            let copyTwo = [...this.state.ingredientList];
            copyTwo.push(<ListItem button onClick={this.removeIngredient.bind(this,element)}>
                        <p>{element}</p>
                        </ListItem>)
            this.setState({...this.state, selectedIngredients: copy, ingredientList: copyTwo});
        }
    }

    removeIngredient(element) {
        let copy = [...this.state.selectedIngredients];
        let copyTwo = [...this.state.ingredientList];
        var index = copy.indexOf(element);
        copy.splice(index, 1);
        copyTwo.splice(index, 1);
        this.setState({...this.state, selectedIngredients: copy, ingredientList: copyTwo});
    }
}
export default Search
