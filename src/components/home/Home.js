import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import autoBind from 'react-autobind';
// import { Modal, Popover, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { browserHistory } from 'react-router'

import './Home.scss';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

// import * as createCampaingActions from '../../store/create-campaign/actions';
// import * as createCampaingSelectors from '../../store/create-campaign/reducer';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';

class Home extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            show: true,
        }
    }

    // handleFieldChange(e, fieldName) {
    //     let value = e.target.value;
    //     this.props.dispatch(createCampaingActions.updateNewCampaignField(fieldName, value));
    // }

    // handleLogoUploaded(url, hash) {
    //     this.props.dispatch(createCampaingActions.updateNewCampaignField('campaignLogo', url));

    // }
    // handleCreateCampaignClick() {
    //     this.props.dispatch(createCampaingActions.createCampaignOnBlockchain());
    // }


    handleCreateCampaignClick(e) {
        browserHistory.push('/create-campaign/');
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        $("#myModal").modal({ backdrop: "static" })

        this.setState({ show: true });
    }
    render() {

        return (

            <div className="container home-container text-center">
                <div className="mx-auto col-sm-8">
                    {/* card card-register */}
                    {/* <div className="card-header">Create Pixel 4 Impact campaign</div> */}
                    <div className="card-body">
                        <h1><i className="fas fa-hand-holding-heart logo-icon"></i>Pixel<span className="logo-icon">4</span>Impact</h1>
                        <h2>
                            <span>Create a fund-raising campaign on the blockchain and receive a unique picture created collaboratively by everyone that believes on your project!</span>
                        </h2>

                        <input className="btn btn-primary create-campaign" type="button" value="Create Campaign" onClick={this.handleCreateCampaignClick} />

                    </div>

                </div>
            </div>

        );
    }
    // return (
    // <div className="home-container">

    //     <div className="jumbotron text-center">
    //         <h1>Pixel 4 Impact</h1>
    //         <p>Get a pixel for a canvas impact!</p>
    //     </div>
    //     <div className="container-fluid">
    //         <h2>About Company Page</h2>
    //         <h4>Lorem ipsum..</h4>
    //         <p>Lorem ipsum..</p>
    //         <button className="btn btn-default btn-lg">Get in Touch</button>
    //     </div>

    //     <div className="container-fluid bg-grey">
    //         <h2>Our Values</h2>
    //         <h4><strong>MISSION:</strong> Our mission lorem ipsum..</h4>
    //         <p><strong>VISION:</strong> Our vision Lorem ipsum..</p>
    //     </div>
    // </div>
    //     )
    // }
}


function mapStateToProps(state) {
    return {
        // newCampaign: createCampaingSelectors.getNewCampaign(state)
    };
}

export default connect(mapStateToProps)(Home);
