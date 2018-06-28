import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';


import _ from 'lodash';
// import './GroupPhaseContainer.scss';

import * as userProfileSelectors from '../../store/user-profile/reducer';
import * as userProfileActions from '../../store/user-profile/actions';

import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
import * as wcwagersActions from '../../store/wc-wagers/actions';

import * as matchesSelectors from '../../store/matches/reducer';

// import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

let blockies = require("../../../lib/blockies/blockies");

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    container: {
        height: '100%',
    }
};


class MatchPredictionsDialog extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            allPredictions: [],
        };
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.showMatchPredictionsDialog !== 0 &&
    //         (
    //             this.props.showMatchPredictionsDialog !== prevProps.showMatchPredictionsDialog ||
    //             this.props.otherParticipantsBets !== prevProps.otherParticipantsBets
    //         )) {
    //         let otherPredictions = wcwagersSelectors.getPredictionsForMatch(this.props.otherParticipantsBets, this.props.showMatchPredictionsDialog);
    //         // debugger;
    //         this.setState({ allPredictions: otherPredictions });
    //     }
    // }

    handleDialogClose = () => {
        this.props.dispatch(wcwagersActions.hideMatchPredictionsDialog())
    };

    render() {
        const { classes } = this.props;
        console.log(this.props.showMatchPredictionsDialog);
        let allPredictions = wcwagersSelectors.getPredictionsForMatch(this.props.flatMatches, this.props.otherParticipantsBets, this.props.showMatchPredictionsDialog);
        let allPredictionsSorted = _.sortBy(allPredictions, [function (prediction) {
            return (prediction.points !== undefined ? -1 * prediction.points : undefined);
        }]);
        let homeTeam = '';
        let awayTeam = '';
        let result = '';
        if (this.props.showMatchPredictionsDialog !== 0) {
            let selectedMatch = this.props.flatMatches[Number(this.props.showMatchPredictionsDialog) - 1];
            homeTeam = matchesSelectors.getTeam(this.props.matches, selectedMatch.home_team);
            awayTeam = matchesSelectors.getTeam(this.props.matches, selectedMatch.away_team);
            let homeResult = selectedMatch.home_result;
            let awayResult = selectedMatch.away_result;
            if (homeResult) {
                result = "(" + homeResult + " - " + awayResult + ")";
            }
        }
        console.log(allPredictions);
        // if(allPredictions.length > 0) {
        //     debugger;
        // }
        return (
            <Dialog
                open={this.props.showMatchPredictionsDialog > 0}
                onClose={this.handleDialogClose}
                aria-labelledby="match-predictions-dialog-title"
                classes={{
                    paper: classes.root, // class name, e.g. `classes-state-root-x`
                }}
            >
                {/* <DialogTitle id="buy-ticket-title"><Typography variant="title" align="center">Select Tickets</Typography></DialogTitle> */}
                <DialogTitle id="match-predictions-dialog-title">All Predictions for Match #{this.props.showMatchPredictionsDialog} - {homeTeam.name} vs {awayTeam.name}</DialogTitle>
                <DialogContent id="match-predictions-dialog-content">
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Participant</TableCell>
                                <TableCell>Prediction</TableCell>
                                <TableCell>Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allPredictionsSorted.map(prediction => {
                                console.log("participant: " + prediction.participant);
                                let participant = _.find(this.props.participants, { 'address': prediction.participant });
                                let homeBet = prediction.matchBets.homeBet;
                                let awayBet = prediction.matchBets.awayBet;
                                let points = prediction.points;
                                let isYanick = participant.nickname === 'Yanick';
                                return (
                                    <TableRow key={"MatchPrediction_" + prediction.participant}>
                                        <TableCell>{participant.nickname}</TableCell>
                                        {/* {!isYanick && <TableCell>{participant.nickname}</TableCell>}
                                        {isYanick && <TableCell><s>Yanick</s> Achour <i class="far fa-smile"></i></TableCell>} */}
                                        <TableCell>
                                            <div>
                                                {/* {isWinnerHome && isKnockout && <span>*</span>} */}
                                                {homeBet} - {awayBet}
                                                {/* {isWinnerAway && isKnockout && <span>*</span>} */}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {points}
                                        </TableCell>

                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>


                </DialogContent>
            </Dialog>
        )
    }
}


function mapStateToProps(state) {
    return {
        showMatchPredictionsDialog: wcwagersSelectors.getShowMatchPredictionsDialog(state),
        otherParticipantsBets: wcwagersSelectors.getOtherParticipantsBets(state),
        participants: wcwagersSelectors.getParticipants(state),
        flatMatches: matchesSelectors.getFlatMatches(state),
        matches: matchesSelectors.getMatches(state),

    };
}

MatchPredictionsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(MatchPredictionsDialog));

