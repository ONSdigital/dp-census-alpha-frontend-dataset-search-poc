import React from 'react';
import {Intro} from './Intro';
import {Query} from './Query';


import '../styles/App.css';

export class Content extends React.Component {

    state = {
        stage: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            stage: 0
        };
        this.transitionSearchStage = this.transitionSearchStage.bind(this);
        this.setResults = this.setResults.bind(this);
    }

    transitionSearchStage() {
        this.setState({"stage": 1});
    }

    setResults(results) {
        this.setState({"results": results})
    }

    render() {
        const showIntro = this.state.stage === 0;
        const showSearch = this.state.stage === 1;
        return (
            <div className="content">
                <Intro show={showIntro} transitionToSearch={this.transitionSearchStage}/>
                <Query show={showSearch} setResults={this.setResults}/>
            </div>
        )
    }
}