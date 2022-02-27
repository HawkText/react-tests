import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            user: {}
        }
    }
    handleSubmit(e){
        e.preventDefault();

        fetch(`https://api.github.com/users/${this.state.input}`)
            .then(response => response.json())
            .then(response => this.setState({user: response}))
        this.setState({input:""});
    }
    render() {
        let score;
        if(this.state.user.message)
            score=("User not found")
        else if(this.state.user.login)
            score=(this.state.user.location)
        else
            score=("Search for user stats!")
        return (
            <div className="App">
                <h1>Github Location Checker</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <label htmlFor="GitHub Username"></label>
                    <input type="text" 
                        onChange={(e)=>this.setState({input:e.target.value})} 
                        value={this.state.input}/>
                    <button>Calculate Score</button>
                </form>
                <hr />
                <h3>{score}</h3>
            </div>
        );
    }
}

export default App;
