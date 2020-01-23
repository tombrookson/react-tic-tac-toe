import React from 'react';
import './NameModal.css';

export class NameModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nickname: '',
        };
    }

    onChange(event) {
        this.setState({nickname: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        
        if (this.state.nickname !== '') {
            this.props.onNicknameSubmit(this.state.nickname);
        }
    }

    render() {
        return (
            <div className="name-modal">
                <div className="name-modal-box">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <p>Please enter a nickname:</p>
        
                        <input name="nickname" type="text" className="name-modal-input" onChange={(e) => this.onChange(e)} />
        
                        <button type="submit" className="name-modal-btn">Start</button>
                    </form>
                </div>
            </div>
        );
    }
}