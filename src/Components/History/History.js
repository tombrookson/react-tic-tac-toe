import React from 'react';
import './History.css';

export function History(props) {
    return (
        <ol>{props.moves}</ol>
    );
}