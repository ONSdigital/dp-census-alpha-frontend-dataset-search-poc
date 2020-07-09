import React from 'react';
import '../styles/App.css';

export class Error extends React.Component {
    state = {
        errorText: ""
    };

    componentWillReceiveProps(props) {
        this.setState({errorText: props.errorText})
    }

    render() {
        let message;
        if (this.state.errorText.length) {
            message = <p>{this.state.errorText}</p>
        }
        return (
            <div>
                {message}
            </div>

        )
    }
}
