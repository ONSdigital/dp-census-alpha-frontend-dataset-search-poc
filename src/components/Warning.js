import React from 'react';
import '../styles/App.css';

export class Warning extends React.Component {

    render() {
        if (this.props.message == null || this.props.message === "") {
            return null;
        }
        return (
            <div>
                <ul className="notifications">
                    <li key="0" className="notifications__item visible notifications__item--warning ">
                        {this.props.message}
                        <button className="notifications__button"
                                onClick={
                                    () => {
                                        this.props.hideWarnings()
                                    }
                                }>Close
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}
