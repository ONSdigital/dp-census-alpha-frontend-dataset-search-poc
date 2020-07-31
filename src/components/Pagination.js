import React from 'react';
import '../styles/App.css';

export class Pagination extends React.Component {

    render() {
        if (!this.props.show) {
            return null;
        }
        let listElement = [];
        // Only 50 datasets are loaded and are not looking like more will be added so no need to worry about showing pages like 6...9 etc (for now)
        let numIconsToDisplay = this.props.totalPages > 5 ? 5 : this.props.totalPages;
        for (let i = 0; i < numIconsToDisplay; i++) {
            if (i === this.props.currentPageNum) {
                listElement.push(<li key={i + "-current"} className="margin-top-sm--0 margin-top-md--0 pagination-list-item">
                    <span className="page-link btn btn--plain btn--plain-active btn--block">{i + 1}</span>
                </li>);
            } else {
                listElement.push(<li key={i} className="margin-top-sm--0 margin-top-md--0 page-link btn btn--plain pagination-list-item">
                    <button className=" page-link btn btn--plain" type="button"
                            onClick={
                                () => {this.props.setCurrentPage(i)}
                            }>{i + 1}</button>
                </li>);
            }
        }
        return (<div className="pagination">
            <form id="js-pagination-container" className="js-auto-submit__form">
                <div className="col col--md-22 col--lg-28">
                    <nav>
                        <ul className="list--neutral list--inline margin-right-sm--1 margin-right-md--1">
                            {listElement.map(listItem => {
                                return (
                                    <span>
                                        {listItem}
                                    </span>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <div className="col col--md-14 col--lg-14 margin-top-md--2 padding-left--1">
                    <div className="baseline">
                        <label htmlFor="page-size">Results per page:</label>
                        <select name="size" id="page-size"
                                className="input select--thin font-size--14 width--5 padding-left--1 padding-right--1 js-auto-submit__input pagination-drop-down"
                                value={this.props.itemsPerPage}
                                onChange={(e) => {
                                    this.props.changeItemsPerPage(e.target.value)
                                }}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>)
    }
}
