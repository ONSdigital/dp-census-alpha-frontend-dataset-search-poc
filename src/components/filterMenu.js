import React from 'react';
import '../styles/App.css';

export class FilterMenu extends React.Component {

    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
    }


    makeList() {

    }

    render() {

        let topicFilterList = <span/>;
        if (this.props.topics[0] != null && this.props.topics[0].topics != null) {
            topicFilterList = this.props.topics[0].topics.map((rootTopic, index) => {
                return <li className="filters__item">
                    <div className="filters__field">
                        <input id="checkbox-bulletin" className="js-auto-submit__input" type="checkbox"
                               name="filter" value="bulletin"/>
                        <label htmlFor="checkbox-bulletin">
                            {rootTopic.title}
                        </label>
                    </div>
                    <ul className="list--neutral margin-top--0 margin-bottom--0">
                        {this.makeList()}
                    </ul>
                </li>;
            })
        }

        return (
            <form id="form" className="js-auto-submit__form">
                <div className="col col--md-12 col--lg-18 margin-bottom">
                    <div className="margin-bottom-md--2 flush-col js-mobile-filters">
                        <div
                            className="background--gallery padding-top-md--2 padding-right-md--1 padding-bottom-md--4 padding-left-sm--1 padding-left-md--1 flush js-mobile-filters__title">
                            <h3 className="inline-block flush">Refine results</h3>
                            <a href="/search?q=test" id="clear-search"
                               className="btn btn--primary btn--thin btn--narrow btn--small float-right">Clear all</a>
                        </div>
                        <div
                            className="background--mercury border-top--iron-md padding-top-sm--2 padding-top-md--1 padding-right-sm--1 padding-right-md--1 padding-bottom-sm--2 padding-bottom-md--2 padding-left-sm--1 padding-left-md--1 js-mobile-filters__contents">
                            <div className="filters js-filters">
                                <h4 className="filters__title">Content types to show</h4>
                                <fieldset className="filters__fieldset">
                                    <legend className="filters__sub-title">Topics</legend>
                                    <div className="js-checkbox-container">
                                        <ul className="list--neutral margin-top--0 margin-bottom--0">
                                            {topicFilterList}
                                        </ul>
                                    </div>
                                </fieldset>
                                <input className="sort__input" type="hidden" name="q" value="test"/>
                            </div>
                            {/*<button type="submit"*/}
                            {/*        className="btn btn--primary btn--thick margin-top-sm--2 margin-top-md--2 js-submit-button"*/}
                            {/*        style="display: none;">Filter*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}