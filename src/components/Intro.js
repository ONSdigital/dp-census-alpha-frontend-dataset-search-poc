import React from 'react';
import '../styles/App.css';

export class Intro extends React.Component {

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="wrapper">
                <h1>Proof-of-Concept Prototype for: <b>Dataset text search</b></h1>

                <p className="font-size--18">This project is to be used to prove that with Elastic-Search a user can use
                    text based search to find a dataset.</p>
                <p className="font-size--18">Disclaimer this is a proof of concept and should not be confused for a full
                    working project please
                    consider:</p>
                <ul className="font-size--18">
                    <li key="1" className="font-size--18 margin-top--0 margin-bottom--0">There might be edge cases that do not
                        work
                    </li>
                    <li key="2" className="font-size--18 margin-top--0 margin-bottom--0">The user journey might have dead ends
                    </li>
                    <li key="3"className="font-size--18 margin-top--0 margin-bottom--0">Not all errors when talking to APIs
                        will be handled well
                    </li>
                    <li key="4" className="font-size--18 margin-top--0 margin-bottom--0">There might be down time both planned
                        and unexpected
                    </li>
                    <li key="5" className="font-size--18 margin-top--0 margin-bottom--0">This Proof-of-Concept prototype is
                        using another Proof-of-Concept prototype as the backend
                    </li>
                    <li key="6" className="font-size--18 margin-top--0 margin-bottom--0"> Only a limited sample of datasets are
                        loaded into the backend
                    </li>
                </ul>
                <p className="font-size--18">If you acknowledge this is just a prototype please continue</p>
                <input type="submit"
                       value="Continue to Dataset text search"
                       className="btn btn--primary btn--thick margin-bottom--4 btn--focus font-weight-700 font-size--18"
                       onClick={() => {
                           this.props.transitionToSearch();
                       }}/>
            </div>
        )
    }
}
