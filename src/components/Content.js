import React from 'react';
import {Intro} from './Intro';
import {Query} from './Query';


import '../styles/App.css';
import fetch from "../helpers/fetch";

export class Content extends React.Component {

    state = {
        stage: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            topics: {}
        };
        this.transitionSearchStage = this.transitionSearchStage.bind(this);
        this.setResults = this.setResults.bind(this);
        this.getTaxonomy = this.getTaxonomy.bind(this);
    }

    transitionSearchStage() {
        this.setState({"stage": 1});
    }

    setResults(results) {
        this.setState({"results": results})
    }

    componentDidMount() {
        this.getTaxonomy();
    }

    async getTaxonomy() {
        const requestOptions = {
            method: 'GET',
        };
        try {
            let timeout = 5000;
            const response = await fetch(`http://34.248.174.250:10200/taxonomy`, requestOptions, timeout);
            let data = await response.json();
            let errorText = "";
            if (response.status !== 200) {
                let errorText = "An unknown error occurred when communicating with the API";
                switch (response.status) {
                    case 400:
                        errorText = "Error 400: Bad Request from API";
                        break;
                    case 500:
                        errorText = "Error 500: Internal Server Error from API";
                        break;
                    default: {
                        errorText = "Unsuccessful connection to backend API";
                        break;
                    }
                }
                this.setState({errorMessage: errorText})
            }
            // Remove duplicates
            console.log("data[0].topics");
            console.log(data.topics);
            data.topics = data.topics.filter((topic, index, self) =>
                index === self.findIndex((t) => (
                    t.filterable_title === topic.filterable_title && t.title === topic.title
                ))
            );
            this.setState({
                "topics": [data],
                "errorMessage": errorText
            });
        } catch {
            this.setState({"errorMessage": "Unsuccessful connection to backend API"})
        }
    }


    render() {
        const showIntro = this.state.stage === 0;
        const showSearch = this.state.stage === 1;
        return (
            <div className="content">
                <Intro show={showIntro} transitionToSearch={this.transitionSearchStage}/>
                <Query show={showSearch} setResults={this.setResults} errorMessage={this.state.errorMessage}
                       topics={this.state.topics}/>
            </div>
        )
    }
}