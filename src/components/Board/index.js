import React from 'react';
import Square from '../Square'
function Board(props){

  const renderSquare = (i) =>{
    const highlight = props.highlight;
      return <Square key={i} value={props.squares[i]} onClick={() =>props.onClick(i)} highlight={highlight && highlight.includes(i) }/>;
    }
  
      const sizeBoard = 3;
      let squares = [];
      for (let i = 0; i<sizeBoard; i++) {
        let boardRow = [];
        for (let j = 0; j<sizeBoard; j++) {
          boardRow.push(renderSquare(i*sizeBoard + j));
        }
      squares.push(<div key={i} className="board-row">{boardRow}</div>);
      }
      return (
        <div>
          {squares}
        </div>
      );
  }
export default Board;