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
                let topicHTML = <span className={"search-results__meta"}/>;
                if (topic.length > 0) {
                    topicHTML = <span className={"search-results__meta"}>Topic: {topic}<br/></span>;
                }

                let aSingleResultTitleHTML = () => {
                    let title = singleResult.title
                    if (singleResult.matches != null &&
                        singleResult.matches.title != null &&
                        singleResult.matches.title[0] != null &&
                        singleResult.matches.title[0].indexOf("<b><em>") > -1
                    ) {
                        title = singleResult.matches.title[0];
                    }
                    return {
                        __html: `${title}`
                    };
                }
                let aSingleResultMetaHTML = () => {
                    let description = "";
                    if (singleResult.matches != null &&
                        singleResult.matches.description != null &&
                        singleResult.matches.description[0] != null &&
                        singleResult.matches.description[0].indexOf("<b><em>") > -1
                    ) {
                        description = singleResult.matches.description[0];
                        if (singleResult.description != null) {
                            let plainMatch = singleResult.matches.description[0].replace(/<b>|<\/b>|<em>|<\/em>/gi, "")
                            let startPos = singleResult.description.indexOf(plainMatch);
                            let endPos = plainMatch.length;
                            description = singleResult.description.substring(0, startPos) + singleResult.matches.description[0] + singleResult.description.substring(startPos + endPos);
                        }

                    } else if (singleResult.description != null) {
                        description = singleResult.description;
                    }

                    let dimensionMatch = ""
                    if (singleResult.matches != null &&
                        singleResult.matches["dimensions.name"] != null &&
                        singleResult.matches["dimensions.name"][0] != null &&
                        singleResult.matches["dimensions.name"][0].indexOf("<b><em>") > -1) {
                        dimensionMatch = "Dimension name match: " + singleResult.matches["dimensions.name"][0];
                    }
                    if (description !== ""){
                        return {
                            __html:
                                `Code: ${singleResult.alias}<br/>
                                ${description} <br/>
                                ${dimensionMatch}`
                        };
                    } else {
                        return {
                            __html:
                                `Code: ${singleResult.alias}<br/>
                                ${dimensionMatch}`
                        };
                    }
                }
                return <li key={index} className="col col--md-34 col--lg-50 search-results__item search-result-item">
                    <a href={singleResult.link}>
                        <span dangerouslySetInnerHTML={aSingleResultTitleHTML()}/>
                        <br/>
                    </a>
                    <a href={singleResult.link}>
                        {topicHTML}
                        <p className="search-results__meta"
    dangerouslySetInnerHTML={aSingleResultMetaHTML()}/>
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
