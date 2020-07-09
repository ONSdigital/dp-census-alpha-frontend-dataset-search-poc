import React from 'react';
import fetch from '../helpers/fetch'
import {Results} from './Results'
import {Pagination} from './Pagination'

import '../styles/App.css';

// TODO Search as you type
// TODO wok out bug - pagination not sending new query but as you type is... but shouldn't
export class Query extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "searchString": "",
            "errorText": "",
            "limit": 50,
            "results": {},
            "itemsPerPage": 50,
            "totalPages": 0,
            "currentPageNum": 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    handleSubmit = async (e) => {
        if (e != null) {
            e.preventDefault();
        }
        if (this.state.searchString === "") {
            return;
        }
        const submitSuccess = await this.submitForm();
        this.setState({submitSuccess});
    };

    async submitForm() {
        const requestOptions = {
            method: 'GET',
        };
        try {
            let timeout = 5000;
            const response = await fetch(`http://34.248.174.250:10200/datasets?q=${this.state.searchString}&limit=${this.state.limit}&offset=${this.state.currentPageNum}`, requestOptions, timeout);
            let data = await response.json();
            if (response.status !== 200) {
                let errorText = "An unknown error occurred when communicating with the API";
                switch (response.status) {
                    case 400:
                        errorText = "Error 400: Bad Request from API";
                        break;
                    case 500:
                        errorText = "Error 500: Internal Server Error from API";
                        break;
                }
                this.setState({errorText: "Unsuccessful connection to backend API"})
            }
            console.log("data is");
            console.log(data);
            const totalPages = Math.ceil(data.total_count / this.state.itemsPerPage);
            this.setState(({
                    "results": [data],
                    "totalPages": totalPages
                }),
                () => {
                    this.props.setResults(this.state.results)
                });
        } catch {
            this.setState({errorText: "Unsuccessful connection to backend API"})
        }
    }

    setCurrentPage(value) {
        this.setState({currentPageNum: value});
    }

    setSearchInput(input) {
        this.setState({searchString: input, errorText: ""}, () => {
            this.handleSubmit();
        });

    }

    changeItemsPerPage(value) {
        this.setState({"itemsPerPage": value}, () => {
            this.handleSubmit();
        })
    }


    render() {
        if (!this.props.show) {
            return null;
        }
        const showPagination = (this.state.results[0] != null && this.state.results[0].total_count != null);
        return (
            <div className="wrapper" role="search">
                <form className="col-wrap search__form" onSubmit={this.handleSubmit}>
                    <label className="search__label search-label col col--md-23 col--lg-24 font-size--30"
                           htmlFor="search">Search for
                        a dataset</label>
                    <input type="search"
                           autoComplete="off"
                           className="search__input search-bar col col--md-21 col--lg-32"
                           id="search"
                           value={this.state.searchString}
                           onChange={(ev) => this.setSearchInput(ev.target.value)}/>
                    <button type="submit" className="search__button col--md-3 col--lg-3" id="nav-search-submit">
                        <span className="icon icon-search--light"/>
                    </button>
                </form>
                <Results results={this.state.results}/>
                <Pagination show={showPagination}
                            changeItemsPerPage={this.changeItemsPerPage}
                            setCurrentPage={this.setCurrentPage}
                            itemsPerPage={this.state.itemsPerPage}
                            totalPages={this.state.totalPages}
                            currentPageNum={this.state.currentPageNum}
                />
            </div>
        )
    }
}