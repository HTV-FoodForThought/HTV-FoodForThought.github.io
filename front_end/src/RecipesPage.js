import React, { Component } from 'react';
import { get_recipes } from './backend/backendRequests';
import { ListItem } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';


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
                        <ListItem button>
                            <a href={element.href} target='_blank'>
                                <p>{element.title}</p>
                                <img src={element.thumbnail}/>
                                <p>Ingredients: {element.ingredients}</p>
                            </a>
                        </ListItem>        
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
                <div>
                    LOADING...
                </div>
            )
        } else if (this.state.error) {
            return(
                <div>
                    ERROR...
                </div>
            )
        }
        const loader = <div className="loader">Loading ...</div>;

        return(
            <InfiniteScroll
                pageStart={1}
                loadMore={this.getItems}
                loader={loader}
                hasMore={this.state.has_more_recipes}>
                {this.state.recipes}
            </InfiniteScroll>
        )
    }
}