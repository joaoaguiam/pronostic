import React, { Component, ReactDOM } from "react";
import { connect } from "react-redux";

import autoBind from "react-autobind";

import "./ShowCampaign.scss";

import Header from "../header/Header";
import $ from "jquery";

// import { Line } from 'react-progressbar.js';

import * as showCampaignSelectors from "../../store/show-campaign/reducer";
import * as showCampaignActions from "../../store/show-campaign/actions";

import { TwitterPicker } from "react-color";
// import { browserHistory } from 'react-router'


const maxWidth = 670;
const defaultPixelWidth = 10;
const emptyColor = "#f5f5f5";


const initialState = {
    mouseColor: "#f4511e",
    selectMode: false,
    selectedPixel: {
        x: undefined,
        y: undefined
    },
    hoverPixel: {
        x: undefined,
        y: undefined
    },
    donation: undefined
};

class ShowCampaign extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

        // this.lastPixelX = -1;
        // this.lastPixelY = -1;
        this.state = initialState;
    }

    // generatePixels(xPixels, yPixels) {
    //     let pixelColors = [];

    //     for (var i = 0; i < xPixels; i++) {
    //         pixelColors[i] = [];

    //         for (var j = 0; j < yPixels; j++) {
    //             pixelColors[i][j] = 'rgb(' + Math.floor(Math.random() * 255) + ', ' +
    //                 Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';

    //             if (i % Math.floor(Math.random() * 3) === 0) {
    //                 pixelColors[i][j] = emptyColor;
    //             }
    //             if (j % Math.floor(Math.random() * 3) === 0) {
    //                 pixelColors[i][j] = emptyColor;
    //             }
    //         }
    //     }
    //     return pixelColors;
    // }
    getPixelSize() {
        let availableWidth = $(".show-campaign-page").width();
        console.log("availableWidth:" + availableWidth);
        let canvasW = this.props.campaign.xPixels * defaultPixelWidth;
        if (canvasW <= maxWidth) {
            return defaultPixelWidth;
        }
        return Math.floor(maxWidth / this.props.campaign.xPixels);
    }

    drawBaseCanvas() {
        let pixelSize = this.getPixelSize();

        // fill the stored pixels from the blockchain
        var ctx = document.getElementById("pixels-canvas").getContext("2d");
        for (var iX = 0; iX < this.props.campaign.xPixels; iX++) {
            for (var iY = 0; iY < this.props.campaign.yPixels; iY++) {
                let color = this.props.campaign.pixels[iX][iY];
                if (color === undefined) {
                    color = emptyColor;
                }
                ctx.fillStyle = color;
                ctx.fillRect(iX * pixelSize, iY * pixelSize, pixelSize, pixelSize);
            }
        }

        // draw the selected pixel
        if (this.state.selectMode && this.state.selectedPixel.x !== undefined && this.state.selectedPixel.y !== undefined) {
            if (this.props.campaign.pixels[this.state.selectedPixel.x][this.state.selectedPixel.y] === undefined) {
                ctx.fillStyle = this.state.mouseColor;
                ctx.fillRect(
                    this.state.selectedPixel.x * pixelSize,
                    this.state.selectedPixel.y * pixelSize,
                    pixelSize,
                    pixelSize
                );
            }
        }

        // draw the hovered pixel
        if (this.state.selectMode && this.state.hoverPixel.x !== undefined && this.state.hoverPixel.y !== undefined) {
            if (this.props.campaign.pixels[this.state.hoverPixel.x][this.state.hoverPixel.y] === undefined) {
                ctx.fillStyle = this.state.mouseColor;
                ctx.fillRect(
                    this.state.hoverPixel.x * pixelSize,
                    this.state.hoverPixel.y * pixelSize,
                    pixelSize,
                    pixelSize
                );
            }
        }

    }
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    handleMouseMove(evt) {
        let pixelSize = this.getPixelSize();
        let canvas = document.getElementById("pixels-canvas");
        var mousePos = this.getMousePos(canvas, evt);
        let iX = Math.floor(mousePos.x / pixelSize);
        let iY = Math.floor(mousePos.y / pixelSize);
        this.setState({ hoverPixel: { x: iX, y: iY } });
        // // setLastPixel(iX, iY);
        // this.drawBaseCanvas(iX, iY);
    }

    handleMouseOut(evt) {
        this.setState({ hoverPixel: { x: undefined, y: undefined } });
    }
    renderCanvas() {
        this.drawBaseCanvas();
        let canvas = document.getElementById("pixels-canvas");

        canvas.addEventListener("mousemove", this.handleMouseMove, false);
        canvas.addEventListener("mouseout", this.handleMouseOut, false);

    }

    componentDidUpdate() {
        this.renderCanvas();
        if(this.props.status === showCampaignSelectors.DONATION_STATUS.WAITING_MINING || this.props.status === showCampaignSelectors.DONATION_STATUS.MINED) {
            $("#donationModal").modal({ backdrop: "static" });
        }
    }
    componentDidMount = async () => {
        let pixel4ImpactAddress = this.props.routeParams.address;
        this.props.dispatch(showCampaignActions.fetchCampaing(pixel4ImpactAddress));
    };

    handleCanvasClick(e) {
        if (this.state.selectMode) {
            if (this.props.campaign.pixels[this.state.hoverPixel.x][this.state.hoverPixel.y] === undefined) {
                this.setState({ selectedPixel: this.state.hoverPixel });
            }
        }
    }
    handleColorChange(color) {
        console.log(color.hex);
        this.setState({ mouseColor: color.hex });
    }

    handleDonatePixelClick(e) {
        this.setState({ selectMode: true });
    }

    handleDonationChange(e) {
        this.setState({ donation: e.target.value })
    }
    handleConfirmDonationClick(e) {
        let pixel4ImpactAddress = this.props.routeParams.address;
        this.props.dispatch(showCampaignActions.confirmDonationOnBlockchain(pixel4ImpactAddress, this.state.selectedPixel, this.state.mouseColor, this.state.donation));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFetched && this.state.donation === undefined) {
            this.setState({ donation: nextProps.campaign.minDonation });
        }
    }
    openCampaignPage() {
        $("#donationModal").modal('hide');
        location.reload();
        // // browserHistory.push('/show-campaign/'+this.props.contractDetails.address);
        // let pixel4ImpactAddress = this.props.routeParams.address;
        // this.setState(initialState);
        // this.props.dispatch(showCampaignActions.fetchCampaing(pixel4ImpactAddress));
    }

    renderDonationConfirmationModal() {
        // debugger;
        if (this.props.status === showCampaignSelectors.DONATION_STATUS.WAITING_MINING) {
            return (
                <div id="donationModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
                                <div className="info-text text-center"><span>Your donation is being confirmed by the blockchain...</span></div>
                                <div className="text-center button-container">
                                    <div className="loading"><i className="fas fa-spinner fa-spin fa-2x"></i></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            )
        };
        if (this.props.status === showCampaignSelectors.DONATION_STATUS.MINED) {
            return (
                <div id="donationModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}

                                <div className="info-text text-center"><span><i className="fas fa-check-circle success"></i> Thank you for getting a Pixel4Impact for this campaing!</span></div>
                                <div className="text-center button-container">
                                    <input className="btn btn-secondary" type="button" value="Reload Campaign Page" onClick={this.openCampaignPage} />
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
        console.log(this.props);

        if (this.props.isFetched) {
            let pixelSize = this.getPixelSize();
            let canvasW = this.props.campaign.xPixels * pixelSize;
            let canvasH = this.props.campaign.yPixels * pixelSize;
            let canvasClass = this.state.selectMode ? "select-mode" : "";
            // let donation = (this.state.donation !== undefined) ? this.state.donation : this.props.campaign.minDonation;
            let selectedPixel = "(" + this.state.selectedPixel.x + " , " + this.state.selectedPixel.y + ")";

            return (
                <div>
                    <Header />
                    <div className="container show-campaign-page">
                        <div className="card card-register mx-auto col-sm-8">
                            {/* <div className="card-header">Create Pixel 4 Impact campaign</div> */}
                            <div className="card-body">
                                <div className="row">
                                    <div className="logo-container ">
                                        <img
                                            src={this.props.campaign.campaignLogo}
                                            alt={this.props.campaign.campaignName}
                                        />
                                        {/* https://alchetron.com/cdn/gastagus-21950eda-85e7-432e-9fd1-7b3527f8c73-resize-750.png" */}
                                    </div>
                                    <div className="">
                                        <h1>{this.props.campaign.ngoName}</h1>

                                        <h2>{this.props.campaign.campaignName}</h2>
                                    </div>
                                </div>
                                <div className="canvas-container text-center">
                                    <canvas id="pixels-canvas" className={canvasClass} width={canvasW} height={canvasH} onClick={this.handleCanvasClick} />
                                </div>
                                {this.state.selectMode &&
                                    <div className=" row">
                                        <div className="container mx-auto col-sm-8 selection-details">

                                            <h3>Your Donation</h3>
                                            <div className="detail-field">
                                                {this.state.selectedPixel.x === undefined &&
                                                    <span>Selected Pixel: <small className="no-pixel">Select your Pixel4Impact</small></span>
                                                }
                                                {this.state.selectedPixel.x !== undefined &&
                                                    <span>Selected Pixel: <small className="selected-pixel">{selectedPixel}</small></span>
                                                }
                                            </div>
                                            <div className="detail-field">

                                                <TwitterPicker triangle="hide"
                                                    color={this.state.mouseColor}
                                                    onChangeComplete={this.handleColorChange}
                                                />
                                            </div>
                                            <div className="detail-field form-group">
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="input-group mb-2">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text"><i className="fab fa-ethereum"></i></div>
                                                            </div>
                                                            <input className="form-control" id="donation" type="number" step="0.0001" aria-describedby="donationHelp" placeholder={this.props.campaign.minDonation} value={this.state.donation} onChange={this.handleDonationChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <small id="donationHelp" className="form-text text-muted">The minimum donation accepted for this campaing is: {this.props.campaign.minDonation} ether</small>
                                            </div>
                                            <div className="text-center">
                                                <input className="btn btn-primary donate" type="button" value="Confirm Donation" onClick={this.handleConfirmDonationClick} />

                                            </div>
                                        </div>
                                    </div>
                                }
                                {!this.state.selectMode &&
                                    <div className="text-center btns-container">
                                        {/* <input className="btn btn-outline-primary contributions" type="button" value="Donators" /> */}
                                        <input className="btn btn-primary donate" type="button" value="Donate a Pixel4Impact" onClick={this.handleDonatePixelClick} />
                                    </div>
                                }
                            </div>
                        </div>
                        {this.renderDonationConfirmationModal()}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Header />

                    <div className="show-campaign-page text-center">Loading...</div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isFetched: showCampaignSelectors.isFetched(state),
        campaign: showCampaignSelectors.getCampaign(state),
        status: showCampaignSelectors.getStatus(state),
    };
}

export default connect(mapStateToProps)(ShowCampaign);
