import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';
import { browserHistory } from 'react-router'

import './CreateCampaign.scss';
// import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';
import $ from 'jquery';

import * as createCampaingActions from '../../store/create-campaign/actions';
import * as createCampaingSelectors from '../../store/create-campaign/reducer';
import IpfsUpload from '../generic/ipfs/ipfs-upload/IpfsUpload';
import Header from '../header/Header';

class CreateCampaign extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleFieldChange(e, fieldName) {
        let value = e.target.value;
        this.props.dispatch(createCampaingActions.updateNewCampaignField(fieldName, value));
    }

    handleLogoUploaded(url, hash) {
        this.props.dispatch(createCampaingActions.updateNewCampaignField('campaignLogo', url));

    }
    handleCreateCampaignClick() {
        this.props.dispatch(createCampaingActions.createCampaignOnBlockchain());
    }
    componentDidUpdate() {
        // if (this.props.status === createCampaingSelectors.CAMPAIGN_STATUS.WAITING_MINING ||
        //     this.props.status === createCampaingSelectors.CAMPAIGN_STATUS.WAITING_MINING) {

        // }
        $("#campaignContractModal").modal({ backdrop: "static" });
    }

    openCampaignPage() {
        $("#campaignContractModal").modal('hide');
        browserHistory.push('/show-campaign/'+this.props.contractDetails.address);
    }

    renderContractConfirmationModal() {
        if (this.props.status === createCampaingSelectors.CAMPAIGN_STATUS.WAITING_MINING) {
            return (
                <div id="campaignContractModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
                                <div className="info-text text-center"><span>The campaign smart contract is being confirmed by the blockchain...</span></div>
                                <div className="text-center button-container">
                                    <div className="loading"><i className="fas fa-spinner fa-spin fa-2x"></i></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )
        };
        if (this.props.status === createCampaingSelectors.CAMPAIGN_STATUS.CREATED) {
            return (
                <div id="campaignContractModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}

                                <div className="info-text text-center"><span><i className="fas fa-check-circle success"></i> The campaign smart contract was successfully created</span></div>
                                <div className="text-center button-container">
                                    <input className="btn btn-secondary" type="button" value="Open Campaign Page" onClick={this.openCampaignPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        };

        return null;
    }

    render() {
        let logoValue = (this.props.newCampaign.campaignLogo === '') ? 'Choose Logo' : this.props.newCampaign.campaignLogo;
        console.log(this.props);
        
        return (
            <div>
                <Header />
                <div className="container create-campaign-page">
                    <div className="card card-register mx-auto col-sm-8">
                        {/* <div className="card-header">Create Pixel 4 Impact campaign</div> */}
                        <div className="card-body">
                            <h1>Create Campaign</h1>
                        
                            <form>
                                <div className="form-group">
                                    <label htmlFor="ngoName">Organization Name</label>
                                    <input className="form-control" id="ngoName" type="text" aria-describedby="nameHelp" placeholder="Enter your organization name" value={this.props.newCampaign.ngoName} onChange={(e) => { this.handleFieldChange(e, 'ngoName') }} />
                                </div>
                                <hr />
                                <div className="form-group">
                                    <label htmlFor="campaignName">Campaign Name</label>
                                    <input className="form-control" id="campaignName" type="text" aria-describedby="campaignHelp" placeholder="Enter your campaign name" value={this.props.newCampaign.campaignName} onChange={(e) => { this.handleFieldChange(e, 'campaignName') }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="campaignWebsite">Campaign Website</label>
                                    <input className="form-control" id="campaignWebsite" type="text" aria-describedby="campaignWebsiteHelp" placeholder="Enter your campaign website" value={this.props.newCampaign.campaignWebsite} onChange={(e) => { this.handleFieldChange(e, 'campaignWebsite') }} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="campaignLogo">Campaign Logo</label>
                                    {/* <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="campaignLogo" value={this.props.newCampaign.campaignLogo} onChange={(e) => {this.handleFieldChange(e, 'campaignLogo') }} />
                                    <label className="custom-file-label" htmlFor="campaignLogo">{logoValue}</label>
                                </div> */}
                                    <IpfsUpload placeholder="Choose Logo" value={logoValue} fileUploadedCB={this.handleLogoUploaded} />
                                </div>
                                <hr />
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <label htmlFor="xPixels">Horizontal Pixels</label>
                                            <input className="form-control" id="xPixels" type="number" aria-describedby="xPixelsHelp" placeholder="" value={this.props.newCampaign.xPixels} onChange={(e) => { this.handleFieldChange(e, 'xPixels') }} />
                                            <small id="xPixelsHelp" className="form-text text-muted">The number of pixels in the horizontal axis</small>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="yPixels">Vertical Pixels</label>
                                            <input className="form-control" id="yPixels" type="number" aria-describedby="yPixelsHelp" placeholder="" value={this.props.newCampaign.yPixels} onChange={(e) => { this.handleFieldChange(e, 'yPixels') }} />
                                            <small id="yPixelsHelp" className="form-text text-muted">The number of pixels in the vertical axis</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="minDonation">Minimum Donation</label>
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fab fa-ethereum"></i></div>
                                                </div>
                                                <input className="form-control" id="minDonation" type="number" step="0.0001" aria-describedby="minDonationHelp" placeholder="0.01" value={this.props.newCampaign.minDonation} onChange={(e) => { this.handleFieldChange(e, 'minDonation') }} />
                                            </div>
                                        </div>
                                    </div>
                                    <small id="minDonationHelp" className="form-text text-muted">The minimum donation accepted in order to get a Pixel 4 Impact. Value is in ether.</small>
                                </div>
                                <div className="text-center">
                                    <input className="btn btn-primary" type="button" value="Create Campaign" onClick={this.handleCreateCampaignClick} />
                                </div>
                            </form>
                        </div>
                    </div>
                    {this.renderContractConfirmationModal()}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        newCampaign: createCampaingSelectors.getNewCampaign(state),
        status: createCampaingSelectors.getStatus(state),
        contractDetails: createCampaingSelectors.getContractDetails(state),
    };
}

export default connect(mapStateToProps)(CreateCampaign);
