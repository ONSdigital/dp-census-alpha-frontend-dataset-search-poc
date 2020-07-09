import React from 'react';
import '../styles/App.css';

export class Footer extends React.Component {

    // TODO sort footer OGL padding (check different dimensions that nothing is hidden by footer if change is made
    render() {
        return <footer className="footer">
            <img className="footer-license__img" alt="OGL"
                 src="https://cdn.ons.gov.uk/assets/images/logo-ogl-footer.svg"
                 width="60"></img>
            <p className="footer-license__text margin-left-sm--0">
                All content is available under the <a className="icon--hide"
                                                      href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                                                      target="_blank"
                                                      rel="noopener noreferrer">Open Government Licence v3.0</a> <span
                className="icon icon-external--light-small"></span>, except where otherwise stated
            </p>
        </footer>
    }
}
