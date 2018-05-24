import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import './Footer.scss';


class Footer extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }


    render() {

        return (
            <footer>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                            <ul className="list-inline mb-2">
                                <li className="list-inline-item">
                                    <a href="#">About</a>
                                </li>
                                <li className="list-inline-item">⋅</li>
                                <li className="list-inline-item">
                                    <a href="#">Contact</a>
                                </li>
                                <li className="list-inline-item">⋅</li>
                                <li className="list-inline-item">
                                    <a href="#">Terms of Use</a>
                                </li>
                                <li className="list-inline-item">⋅</li>
                                <li className="list-inline-item">
                                    <a href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}


function mapStateToProps(state) {
    return {
        // currentStep: createEventSelectors.getCurrentStep(state)
    };
}

export default connect(mapStateToProps)(Footer);
