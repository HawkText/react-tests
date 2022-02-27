import React, { Component } from 'react';
import "./Square.css";

class Square extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameState: "UNSELECTED",
            tile: null
        }
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.inProgress)
            this.setState({gameState: "COMPLETED"});
    }
    makeMove(move) {
        this.props.onMove({
            tile: move,
            space: this.props.space
        });
        this.setState({
            gameState: "SELECTED",
            tile: move
        });
    }
    render() {
        const unselected = (
            <div onClick={()=>this.setState({gameState:"SELECTING"})} className="square">
            </div>
        )
        const selected = (
            <div className="square">
                <h1>{this.state.tile}</h1>
            </div>
        )
        const completed = (
            <div className="square inactive">
                <h1>{this.state.tile}</h1>
            </div>
        )
        const selecting = (
            <div className="square selecting">
                <button onClick={()=>this.makeMove("X")}>X</button>
                <button onClick={()=>this.makeMove("O")}>O</button>
                <button onClick={()=>this.setState({gameState:"UNSELECTED"})}>Cancel</button>
            </div>
        )
        switch(this.state.gameState){
            case "UNSELECTED":
                return unselected;
            case "SELECTING":
                return selecting;
            case "SELECTED":
                return selected;
            case "COMPLETED":
                return completed;
            default:
                return unselected;
        }
    }
}

export default Square;