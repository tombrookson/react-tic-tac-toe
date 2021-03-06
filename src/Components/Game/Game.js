import React from 'react';
import './Game.css';
import { calculateWinner } from '../../Helpers/Winner';
import { Board } from '../Board/Board';
import { History } from '../History/History';
import { NameModal } from '../NameModal/NameModal';

export class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            user: {
                nickname: '',
            },
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleNicknameSubmit(nickname) {
        this.setState({
            user: {
                nickname: nickname,
            },
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = <div className="game-status">Winner: <strong>{winner}</strong></div>;
        } else {
            status = <div className="game-status">Next player: <strong>{(this.state.xIsNext ? 'X' : 'O')}</strong></div>;
        }

        const userNickname = this.state.user.nickname;

        return (
            <div className="game">
                <div className="game-info">
                    {status}

                    {
                        (userNickname !== '') &&
                        <div className="game-user-nickname">Nickname: <strong>{userNickname}</strong></div>
                    }
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-history">
                    {
                        debugMode() &&
                        <History moves={moves} />
                    }
                </div>
                {
                    (userNickname === '') &&
                    <NameModal onNicknameSubmit={(e) => this.handleNicknameSubmit(e)} />
                }
            </div>
        );
    }
}

function debugMode() {
    var url = new URL(window.location.href);
    var c = url.searchParams.get("debug");
    return (c === 'true');
}