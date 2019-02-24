import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import placeholder from './resources/placeholder.jpg'
import LoadingOverlay from 'react-loading-overlay';
import { upload_photo } from './backend/backendRequests.js';
import { ListItem, Grid, IconButton, Chip } from '@material-ui/core';

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
        return(
            <Grid container>
                <Grid item xs={12}><h1>Add an Ingredient</h1></Grid>
                <Grid container item xs={12} lg={8}>
                    {/*https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg*/}
                    <Grid item xs={12}><img src= {this.state.selectedImage} alt="Uploaded Ingredient" className="ingredientImage"/></Grid>                    
                    <Grid item xs={12}><input type="file" onChange ={(e) => this.handleFile(e)} className = "selectFile"/></Grid> 
                </Grid> 

                {/*title + upload + placeholder image*/}
                <Grid container item xs={12} lg={4} >
                    <Grid item xs={12}><p>Select Matching Ingredient:</p></Grid>
                    {this.state.loadingImage ? 
                        <LoadingOverlay active={this.state.loadingImage} spinner text='Loading your content...' className='centerInPage'/>
                        : this.state.currImageIngredients}
                </Grid>
                <Grid item xs={12}><p>Selected Ingredients:</p></Grid>
                {this.state.ingredientList}
                <Grid item xs={12}>
                <Link exact to={{
                    pathname: "/recipes",
                    state: {
                        ingredients: this.state.selectedIngredients
                    }
                }} className="recipeLink">Find recipes</Link>
                </Grid>
            </Grid>
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
                    <Grid item xs={6} sm={4} m={3} lg={6}>
                        <ListItem button onClick={this.addIngredient.bind(this,element)}>
                            {element}
                        </ListItem>
                    </Grid>
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
            copyTwo.push(
                        <Grid item xs={6} sm={4} m={3} lg={2}>
                            <Chip label={element} onDelete={() => this.removeIngredient(element)} style={{padding: '15px'}}/>
                        </Grid>)
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
