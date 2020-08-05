import React from 'react';
import '../styles/App.css';

export class DimMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.makeListModel = this.makeListModel.bind(this);
    }

    makeListModel(list, level) {
        return list.map((singleDim) => {
            return <li key={`${singleDim.name}`}
                       className={"filters__item"}>
                <div className="filters__field">
                    <input id={`checkbox-bulletin-level--${singleDim.name}`}
                           className="js-auto-submit__input"
                           type="checkbox"
                           name="filter"
                           value={singleDim.name}
                           checked={singleDim.selected}
                           onChange={(e) => {
                               this.checkChanged(e)
                           }}
                    />
                    <label htmlFor={`checkbox-bulletin-level--${singleDim.name}`}>
                        {singleDim.label}
                    </label>
                </div>
            </li>;
        })
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            dimensions: nextProps.dimensions
        };
    }

    checkChanged(e) {
        this.props.dimensionsSelectionChanged(e.target.value, e.target.checked);
    }

    render() {
        let dimensionFilterList = <span/>;
        if (this.props.dimensions != null) {
            let dims = this.props.dimensions.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            dimensionFilterList = this.makeListModel(dims)
        }
        return (
            <div
                className="background--mercury border-top--iron-md js-mobile-filters__contents margin-top--4">
                <legend className="filters__sub-title margin-top--4">Dimensions</legend>
                <div className="js-checkbox-container">
                    <ul className="list--neutral margin-top--0 margin-bottom--0">
                        {dimensionFilterList}
                    </ul>
                </div>
            </div>

        )

    }
}