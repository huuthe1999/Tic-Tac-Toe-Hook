import React from 'react';
import '../../index.css';
export default function Square(props) {
    return (
      <button className={props.highlight ? 'square-highlight square':'square'} onClick={props.onClick}>
        {props.value}
      </button>
    )
  }