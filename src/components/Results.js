import React from 'react';
import '../styles/App.css';

export class Results extends React.Component {

    render() {
        let displayList;
        if (this.props.results != null && this.props.results[0] != null && this.props.results[0].items != null && this.props.results[0].items.length > 0) {
            displayList = this.props.results[0].items.map(function (singleResult, index) {
                return <li key={index} className="col col--md-34 col--lg-50 search-results__item search-result-item">
                    <a href={singleResult.link}>
                        {singleResult.title}
                        <p className="search-results__meta">
                            Code: {singleResult.alias}<br/>
                            {singleResult.description}
                            </p>
                    </a>
                </li>;
            });
        }
        return (
            <div className="search-results wrapper">
                <ul className="list--neutral results-list">{displayList}</ul>
            </div>
        )
    }
}
