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
            topics: {},
            topicString: ""
        };
        this.transitionSearchStage = this.transitionSearchStage.bind(this);
        this.setResults = this.setResults.bind(this);
        this.getTaxonomy = this.getTaxonomy.bind(this);
        this.topicSelectionChanged = this.topicSelectionChanged.bind(this);
        this.createTopicString = this.createTopicString.bind(this);
        this.clearAll = this.clearAll.bind(this);
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

    topicSelectionChanged(value, isSelected, topics) {
        if (topics == null) {
            topics = this.state.topics[0].topics;
        }
        let updatedTopicFilter = this.updateTopicSelection(value, isSelected, topics);
        updatedTopicFilter = this.checkSelectionAndLimit(value, updatedTopicFilter);
        console.log(updatedTopicFilter);
        this.setState({
                topics: [{
                    topics: updatedTopicFilter,
                }]
            }, () => {
                const topicString = this.createTopicString();
                this.setState({topicString: topicString});
            }
        );
    }

    createTopicString() {
        let topicStruct = this.state.topics[0].topics;
        let topicString = "";

        function grabFilterStrings(rootTopic, topicString) {
            // rootTopic is an array
            // rootTopic has child topics
            //[{x child[a]},{y [child[b]},{z child[c]}]
            rootTopic.forEach((topic) => {
                if (topic.selected) {
                    topicString += (topicString === "" ? topic.filterable_title : `,${topic.filterable_title}`);
                }
                if (topic.child_topics != null && topic.child_topics.length > 0) {
                    topicString = grabFilterStrings(topic.child_topics, topicString)
                }
            });
            return topicString;
        }

        topicString = grabFilterStrings(topicStruct, topicString);
        return topicString
    }

    updateTopicSelection(value, isSelected, topics) {
        for (let i = 0; i < topics.length; i++) {
            let topicObj = topics[i];
            if (topicObj.filterable_title === value) {
                topicObj.selected = isSelected;
                break;
            }
            if (topicObj.child_topics != null) {
                this.updateTopicSelection(value, isSelected, topicObj.child_topics);
            }
        }

        return topics;
    }

    checkSelectionAndLimit(value, topics) {
        // 1. For each tier get all that have value 'selected' as true
        // 2. If the new 'value' is in there then set all the others to false
        // 3. recursive, if not then dig a layer deeper and repeat

        let selectedAtTier = topics.filter(obj => {
            return obj.selected === true
        });
        if (selectedAtTier.length > 1) { // new selection is at this level
            selectedAtTier.forEach((selectedObj) => {
                if (selectedObj.filterable_title !== value) {
                    // Todo iterate down whole tree and remove all
                    let removeAllSelectedChildTopics = (rootTopic) => {
                        rootTopic.selected = false;
                        if (rootTopic.child_topics != null) {
                            rootTopic.child_topics.forEach((aTopic) => {
                                removeAllSelectedChildTopics(aTopic);
                            });
                        }
                    };
                    removeAllSelectedChildTopics(selectedObj);
                }
            })
        } else {
            // drill down to filter children children values
            if (topics.child_topics != null) {

                topics.child_topics.forEach((childTopic) => {
                    this.checkSelectionAndLimit(value, childTopic)
                });

            }


        }
        return topics
    }

    clearAll() {
        if (this.state.topics[0] && this.state.topics[0].topics != null) {
            let topic = this.state.topics[0].topics;
            const clearTopicLevel = (rootTopic) => {
                rootTopic.forEach((childTopic) => {
                    childTopic.selected = false;
                    if (childTopic.child_topics != null && childTopic.child_topics.length > 0) {
                        clearTopicLevel(childTopic.child_topics);
                    }
                })
            }
            clearTopicLevel(topic);
            let newTopicList = [{topics: topic}];
            this.setState({topics: newTopicList})

        }
    }

    render() {
        const showIntro = this.state.stage === 0;
        const showSearch = this.state.stage === 1;

        if (this.state.topics[0] != null && this.state.topics.topics != null) {
            console.log("Rendering content, topics is:");
            console.log(this.state.topics);
        }


        return (
            <div className="content">
                <Intro show={showIntro} transitionToSearch={this.transitionSearchStage}/>
                <Query show={showSearch}
                       setResults={this.setResults}
                       errorMessage={this.state.errorMessage}
                       topics={this.state.topics}
                       topicSelectionChanged={this.topicSelectionChanged}
                       topicString={this.state.topicString}
                       clearAll={this.clearAll}/>
            </div>
        )
    }
}