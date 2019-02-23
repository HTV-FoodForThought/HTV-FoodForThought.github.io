import React, { Component } from 'react';
import { get_recipes } from './backend/backendRequests';

export default class RecipesPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            current_page = 1,
            recipes = [],
            error: false
        }
    }

    componentDidMount() {
        return get_recipes(this.props.ingredients, this.state.current_page)
            .then((responseJson) => {
                let copy = [...this.state.recipes];
                this.setState({
                    ...this.state,
                    loading: false,
                    recipes: copy.concat(responseJson)
                })
            })
            .catch((error) => {
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

        return(
            <div>WORKS</div>
        )
    }
}