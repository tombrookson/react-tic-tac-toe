import React from 'react';
import './History.css';

export function History(props) {
    return (
        <div className="history">
            <p>History:</p>
            <ol className="history-list">{props.moves}</ol>
        </div>
    );
}