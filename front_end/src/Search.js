import React, { Component } from 'react';
import './Search.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import placeholder from './resources/placeholder.jpg'
import LoadingOverlay from 'react-loading-overlay';
import { upload_photo } from './backend/backendRequests.js';
import { ListItem } from '@material-ui/core';

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
        };
    }

    render() {

        const myLink = props => <Link exact to={{
            pathname: "/recipes",
            state: {
                ingredients: ['chicken']
            }
        }}>Find recipes</Link>;
  
        if(this.state.firstLoad) {
            return(
                <div>
                    <h1>Add an Ingredient</h1> 
                    <input type="file" onChange ={(e) => this.handleFile(e)}></input>
                    {/*https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg*/}
                    <img src= {this.state.selectedImage} alt="Uploaded Ingredient" className="ingredientImage"></img>
                    {/*title + upload + placeholder image*/}
                    <Button component={myLink} variant="contained">
                        Get Recipes
                    </Button>
                </div>
            );
        } else if (this.state.loadingImage) {
            return (
                <LoadingOverlay active={this.state.loadingImage} spinner text='Loading your content...'>
                </LoadingOverlay>
            );
        } else if (this.state.selectedImage) {
            return (
                <div>
                    {this.state.currImageIngredients}
                </div>
            )
        }
    }

    /*With reference to https://codepen.io/hartzis/pen/VvNGZP*/
    handleFile(e) {
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
                    <ListItem button>
                        <p>{element}</p>
                    </ListItem>
                )
            });
            this.setState({...this.state, currImageIngredients: copy.concat(responseJson.response)});
            this.setState({...this.state, loadingImage: false});
        }) .catch((error) => {
            console.log(error);
        });
    }
}
export default Search
