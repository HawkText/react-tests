import React, { Component } from 'react';
import './App.css';
import Square from './Square';

const initialGame = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            game:initialGame,
            status:"IN PROGRESS"
        };
    }
    handleMove(move){
        let row = 0,
            col = move.space%3,
            game = [...this.state.game];
        if(move.space>5){
            row = 2;
        } else if (move.space>2){
            row = 1;
        }
        game[row][col] = move.tile;
        this.setState({game:game});
        if(this.didWin(game)){
            this.setState({status:"OVER"});
        }

    }
    didWin(game){
        for(let i=0;i<3;i++){
            if(game[0][i]===game[1][i] &&
                game[1][i]===game[2][i] &&
                game[0][i]!==null){
                    return true;
            }
            if(game[i][0]===game[i][1] &&
                game[i][1]===game[i][2] &&
                game[i][0]!==null){
                    return true;
            }
        }
        if(game[0][0]===game[1][1] &&
            game[1][1]===game[2][2] &&
            game[0][0]!==null){
                return true;
        }
        if(game[0][2]===game[1][1] &&
            game[1][1]===game[2][0] &&
            game[0][2]!==null){
                return true;
        }
        return false;
    }
    render() {
        let board = [];
        for(let i=0;i<9;i++){
            board.push(<Square space={i} 
                                onMove={(k)=>this.handleMove(k)} 
                                inProgress={this.state.status !== "OVER"}
                                key={i}/>);    
        }
        return (
            <div className="App">
                {board}
            </div>
        );
    }
}

export default App;
