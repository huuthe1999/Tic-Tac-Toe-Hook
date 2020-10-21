import React, { useState } from 'react';
import Board from '../Board';
import {calculateWinner} from '../../Services';
const Game = () => {
    const [history, setHistory] = useState([{squares:Array(9).fill(null),indexMove :null}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [sortAscending, setSortAscending] = useState(true);
  
    
    const handleSort = () => {
        setSortAscending(!sortAscending);
    }
    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = history[historyPoint.length - 1];
        const squares = current.squares.slice();
      if(calculateWinner(squares).winner || squares[i]){
        return;
      }
      squares[i] = xIsNext ? 'X' : 'O';
      setHistory(historyPoint.concat([{squares:squares,indexMove: i}]));
      setStepNumber(historyPoint.length);
      setXIsNext(!xIsNext);
    }
    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }
    
    const current = history[stepNumber];
    const squares = current.squares;
    const winner = calculateWinner(squares);
    const winnerName = winner.winner;
  
    let move = history.map((step, move) => {
    const col = step.indexMove%3 + 1;
    const row = Math.floor(step.indexMove/3 + 1);
    const desc = move?'Go to move #' + move + ` at (${col},${row})`:'Go to game start';
    return (
        <li key={move}>
        <button className={move === stepNumber?'current-selected-item':''} onClick={()=>jumpTo(move)}>{desc}</button>
        </li>
        )
      })
      if (!sortAscending) {
        move.reverse();
      }

      let status;
      if (winnerName) {
        status = 'Winner: ' + winnerName;
      } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }

      if(!squares.includes(null) && !winnerName){
        status = 'No one wins ! Draw';
      }
      const sortType = sortAscending ? 'descending' : 'ascending';
      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={squares}
            onClick={(i) =>handleClick(i)}
            highlight={winner.highlight}/>
          </div>
          <div className="game-info">
            <div className="game-status">{status}</div>
            <button className="toggle-button" onClick={() => handleSort()}>{sortType}</button>
            <ol>{move}</ol>
          </div>
        </div>
      );
}
export default Game;