import React, { Component } from 'react';
import { get_recipes } from './backend/backendRequests';
import { Card, CardContent, Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingOverlay from 'react-loading-overlay';
import './RecipesPage.css';


export default class RecipesPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            current_page: 1,
            recipes: [],
            error: false, 
            has_more_recipes: true,
        }
    }

    componentDidMount() {
        return this.getItems(0);
    }

    getItems = (pageNum) => {
        const { ingredients } = this.props.location.state;
        return get_recipes(ingredients, pageNum)
            .then((responseJson) => {
                let copy = [...this.state.recipes];
                let orig_len = copy.length;
                // turn response into list elements
                responseJson.data.response.forEach(element => {
                    copy.push(
                        <Grid item xs={12} className='cardGrid'>
                            <Card>
                                <CardContent>
                                    <a href={element.href} target='_blank' className='card'>
                                    <Grid container xs={12}>

                                        <Grid item xs={4}>{element.title}</Grid>
                                            <Grid item xs={4}><img src={element.thumbnail}/></Grid>
                                        <Grid item xs={4}><p>Ingredients: {element.ingredients}</p></Grid>
                                        </Grid>
                        
                                    </a>
                                </CardContent>

                            </Card>
                        </Grid>


                    )
                });
                // if no new items, set that
                if (orig_len === copy.length) {
                    console.log('no more items');
                    this.setState({
                        ...this.state,
                        has_more_recipes: false
                    })
                }
                this.setState({
                    ...this.state,
                    loading: false,
                    recipes: copy.concat(responseJson.response)
                })
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ...this.state,
                    loading: false,
                    error: true
                })
            })
    }

    render() {
        if (this.state.loading) {
            return(
                <div className='centerInPage'>
                    <LoadingOverlay active={this.state.loading} spinner text='Loading recipes...'/>
                </div>
            )
        } else if (this.state.error) {
            return(
                <div className='centerInPage'>
                    ERROR...
                </div>
            )
        }
        const loader = <LoadingOverlay active={true} spinner text='Loading recipes...'/>;

        return(
            <Grid container xs={12} justify='center'>
                <Grid item xs={12}><h1>Recipes</h1></Grid>
                <Grid item xs={10} m={8} alignContent='center'>
                <InfiniteScroll
                    pageStart={1}
                    loadMore={this.getItems}
                    loader={loader}
                    hasMore={this.state.has_more_recipes}>
                    {this.state.recipes}
                </InfiniteScroll>
                </Grid>

            </Grid>
        )
    }
}