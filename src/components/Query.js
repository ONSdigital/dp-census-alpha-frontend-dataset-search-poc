import React from 'react';
import fetch from '../helpers/fetch'
import {Results} from './Results'
import {Pagination} from './Pagination'
import {Warning} from './Warning'
import {FilterMenu} from "./filterMenu";

import '../styles/App.css';

export class Query extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "searchString": "",
            "errorText": "",
            "results": {},
            "itemsPerPage": 10,
            "totalPages": 0,
            "currentPageNum": 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.hideWarnings = this.hideWarnings.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({"errorText": this.state.errorMessage})
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
            const response = await fetch(`http://34.248.174.250:10200/datasets?q=${this.state.searchString}&limit=${this.state.itemsPerPage}&offset=${this.state.currentPageNum * this.state.itemsPerPage}&topics=${this.props.topicString}`, requestOptions, timeout);
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
                this.setState({errorMessage: errorText || this.props.errorMessage})
            }
            const totalPages = Math.ceil(data.total_count / this.state.itemsPerPage);
            this.setState({
                    "results": [data],
                    "totalPages": totalPages,
                    "errorMessage": errorText
                },
                () => {
                    this.props.setResults(this.state.results)
                });
        } catch {
            this.setState({errorMessage: "Unsuccessful connection to backend API"})
        }
    }

    setCurrentPage(value) {
        this.setState({currentPageNum: value}, () => {
            this.handleSubmit();
        });

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

    hideWarnings() {
        this.setState({"errorMessage": ""})
    }


    render() {
        if (!this.props.show) {
            return null;
        }
        const showPagination = (this.state.results[0] != null && this.state.results[0].total_count != null && this.state.results[0].total_count > 0);
        return (
            <div>
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
                    <FilterMenu topics={this.props.topics} topicSelectionChanged={this.props.topicSelectionChanged}/>
                    <Results results={this.state.results}/>
                    <Pagination show={showPagination}
                                changeItemsPerPage={this.changeItemsPerPage}
                                setCurrentPage={this.setCurrentPage}
                                itemsPerPage={this.state.itemsPerPage}
                                totalPages={this.state.totalPages}
                                currentPageNum={this.state.currentPageNum}
                    />
                </div>
                <Warning message={this.state.errorMessage}
                         hideWarnings={this.hideWarnings}/>
            </div>
        )
    }
}