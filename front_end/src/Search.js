import React, { Component } from 'react';
import './Search.css';
import placeholder from './resources/placeholder.jpg'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstLoad: true,
            loadingImage: false,
            selectedImage: placeholder,
            imageFile: null,
            ingredients: [],
        };
    }

    render() {
        if(this.state.firstLoad) {
            return(
                <div>
                    <h1>Add an Ingredient</h1> 
                    <input type="file" onChange ={(e) => this.handleFile(e)}></input>
                    {/*https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg*/}
                    <img src= {this.state.selectedImage} alt="Uploaded Ingredient" className="ingredientImage"></img>
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

    /*With reference to https://codepen.io/hartzis/pen/VvNGZP*/
    handleFile(e) {
        let r = new FileReader();
        let file = e.target.files[0];
        this.setState({firstLoad: false, loadingImage: true});
        r.onloadend = () => {
            this.setState({selectedImage: r.result, imageFile: file});
        }
        r.readAsDataURL(file);
    }
}
export default Search
