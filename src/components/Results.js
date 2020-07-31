import React from 'react';
import '../styles/App.css';

export class Results extends React.Component {


    render() {
        let displayList;
        let topic;
        if (this.props.results != null && this.props.results[0] != null && this.props.results[0].items != null && this.props.results[0].items.length > 0) {
            displayList = this.props.results[0].items.map(function (singleResult, index) {
                topic = "";
                for (let i = 1; i < 10; i++) {
                    let stringAccessor = `topic${i}`;
                    if (singleResult[stringAccessor] != null) {
                        if (i === 1) {
                            topic += singleResult[stringAccessor]
                        } else {
                            topic += ` / ${singleResult[stringAccessor]}`;
                        }
                    }
                }
                let topicHTML = <span className={"search-results__meta"}></span>;
                if (topic.length > 0) {
                    topicHTML = <span className={"search-results__meta"}>Topic: {topic}<br/></span>;
                }
                let aSingleResultHTML = function createMarkupForDescription() {
                    let description = singleResult.description;
                    if (singleResult.matches != null &&
                        singleResult.matches != null &&
                        singleResult.matches.description != null &&
                        singleResult.matches.description[0] != null &&
                        singleResult.matches.description[0].indexOf("<b><em>") > -1
                    ) {
                        description = singleResult.matches.description[0];
                    }
                    return {
                        __html:
                            `
                            Code: ${singleResult.alias}<br/>
                            ${description}`
                    };
                    //     __html:
                    // <p className="search-results__meta">
                    //     {topicHTML}
                    //     Code: {singleResult.alias}<br/>
                    //     {description}
                    // </p>

                }
                return <li key={index} className="col col--md-34 col--lg-50 search-results__item search-result-item">
                    <a href={singleResult.link}>
                        {singleResult.title}<br/>
                        {topicHTML}
                        <p className="search-results__meta"
                           dangerouslySetInnerHTML={aSingleResultHTML()}></p>
                    </a>
                </li>;
            });
        }
        return (
            <div className="search-results wrapper col col--md-34 col--lg-40 margin-left-md--1">
                <ul className="list--neutral results-list">{displayList}</ul>
            </div>
        )
    }
}
