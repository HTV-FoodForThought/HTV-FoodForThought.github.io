import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import placeholder from './resources/placeholder.jpg'
import LoadingOverlay from 'react-loading-overlay';
import { upload_photo } from './backend/backendRequests.js';
import { ListItem, Grid, IconButton, Chip, Button } from '@material-ui/core';
import Webcam from 'react-webcam';

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
            takePhoto: false,
            selfieCam: true,
        };
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    render() {
        console.log(this.state.selfieCam);
        const videoSettings = this.state.selfieCam ? {
            facingMode: "user"
        } : {
            facingMode: { exact: "environment" }
        };
        return(
            <Grid container>
                <Grid item xs={12}><h1>Add an Ingredient</h1></Grid>
                <Grid container item xs={12} lg={8}>
                    {/*https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg*/}
                    <Grid item xs={12}>{this.state.takePhoto ? <Webcam videoConstraints={videoSettings} audio={false} ref={this.setRef} screenshotFormat='image/jpeg'/> : <img src= {this.state.selectedImage} alt="Uploaded Ingredient" className="ingredientImage"/>}</Grid>                    
                    <Grid item xs={12} m={3}><input type="file" onChange ={(e) => this.handleFile(e)} className = "selectFile"/></Grid>
                    <Grid item xs={12} m={3}><Button variant='contained' onClick={()=>this.setState({...this.state, takePhoto: !this.state.takePhoto})}>{this.state.takePhoto ? "Stop taking photo" : "Take Photo Instead"}</Button></Grid> 
                    {this.state.takePhoto ? (<Grid container xs={12}><Grid item xs={12} m={3}><Button variant='contained' onClick={()=>{this.takePhoto()}}>Capture Photo</Button></Grid>
                                            <Grid item xs={12} m={3}><Button variant='contained' onClick={()=>{this.setState({...this.state, selfieCam: !this.state.selfieCam})}}>Switch Camera</Button></Grid></Grid>)
                                            : null 
                    }
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
        console.log(file.type);
        console.log(file);
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

    takePhoto = () => {
        let url = this.webcam.getScreenshot();
        let r = new FileReader();
        r.onloadend = () => {
            this.setState({...this.state, selectedImage: r.result});
        }

        fetch(url)
        .then(res => res.blob())
        .then(
            blob =>  {
                r.readAsDataURL(blob);

                this.setState({...this.state, takePhoto: false, imageFile: blob});
                upload_photo(blob).then((responseJson) => {
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
        )
        // let r = new FileReader();
        // r.onloadend = () => {
        //     this.setState({...this.state, selectedImage: r.result, imageFile: pic});
        // }
        // console.log(pic.type)
        // console.log(pic);
        // r.readAsDataURL(pic);
        // this.setState({...this.state, takePhoto: false, selectedImage: pic, imageFile: pic});

        // upload_photo(pic).then((responseJson) => {
        //     let copy = [];
        //     responseJson.data.response.forEach(element => {
        //         copy.push(
        //             <Grid item xs={6} sm={4} m={3} lg={6}>
        //                 <ListItem button onClick={this.addIngredient.bind(this,element)}>
        //                     {element}
        //                 </ListItem>
        //             </Grid>
        //         )
        //     });
        //     this.setState({...this.state, currImageIngredients: copy, loadingImage: false});
        // }) .catch((error) => {
        //     console.log(error);
        // });
    }

    //https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
      
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
      
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
      
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          var byteArray = new Uint8Array(byteNumbers);
      
          byteArrays.push(byteArray);
        }
      
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    };


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
