


import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import autoBind from 'react-autobind';

import * as userProfileSelectors from '../../store/user-profile/reducer';
import * as userProfileActions from '../../store/user-profile/actions';

import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
import * as wcwagersActions from '../../store/wc-wagers/actions';

import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import * as notificationsSelectors from '../../store/notifications/reducer';
import * as notificationsActions from '../../store/notifications/actions';
import moment from 'moment-timezone';

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
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import CenterContainerSmall from '../layout/center-container/CenterContainerSmall';
import CircularProgress from '@material-ui/core/CircularProgress';

import { browserHistory } from 'react-router'
import PhasesContainer from '../phases/PhasesContainer';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
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
    },
    registerBtn: {
        margin: '1.5em',
    },
    parentFlex: {
        display: 'flex',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    center: {
        'text-align': 'center',
    },
    payBtn: {
        float: 'right',
        margin: 2 * theme.spacing.unit,
    }

});


class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            showPayWinnerConfirmation: false,
            isConfirmed: false,
        };
    }

    payWinner() {
        this.props.dispatch(wcwagersActions.payWinners());
        this.setState({ showPayWinnerConfirmation: false });
    }
    payWinnerConfirmation() {
        this.setState({ showPayWinnerConfirmation: true, isConfirmed: false });
    }
    hidePayWinnerConfirmation() {
        this.setState({ showPayWinnerConfirmation: false });
    }
    setIsConfirmed(event) {
        // debugger;
        this.setState({ isConfirmed: event.target.checked });
    }
    renderPayWinnerConfirmation() {
        let isOkDisabled = !this.state.isConfirmed;
        let winners = this.props.winners;
        let winnerTxt = winners.length > 1 ? 'Winners' : 'Winner';
        let potSizeEther = this.props.contestDetails.contestBalanceEther;
        let ammountPayee = potSizeEther / winners.length;
        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                // maxWidth="xm"
                aria-labelledby="payWinner-confirmation-dialog-title"
                open={this.state.showPayWinnerConfirmation}
            >
                <DialogTitle id="payWinner-confirmation-dialog-title">Confirm {winnerTxt}</DialogTitle>
                <DialogContent>
                    <Typography>{winnerTxt}:</Typography>
                    <List dense={true}>
                        {winners.map((participant) => {
                            return (
                                <div className={this.props.classes.wrapper} key={participant.address}>

                                    <ListItem >
                                        <ListItemText
                                            primary={participant.nickname}
                                            secondary={participant.address}
                                        />
                                    </ListItem>
                                    {/* <CircularProgress size={24} className={this.props.classes.buttonProgress} /> */}
                                </div>
                            );
                        })}
                    </List>
                    <br />
                    <Typography>Pot Size:</Typography>
                    <Typography color="textSecondary">{potSizeEther}</Typography>
                    <br />
                    <Typography>Ammount per winner:</Typography>
                    <Typography color="textSecondary">{ammountPayee}</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.isConfirmed}
                                // {this.state.checkedB}
                                onChange={this.setIsConfirmed}
                                // value="checkedB"
                                color="primary"
                            />
                        }
                        label={"Confirm " + winnerTxt}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.hidePayWinnerConfirmation} color="primary">Cancel</Button>
                    <Button onClick={this.payWinner} color="primary" disabled={isOkDisabled}>Ok</Button>
                </DialogActions>
            </Dialog>
        )
    }
    render() {
        const { classes } = this.props;
        // let userAddress = this.props.userAddress;
        // let isParticipant = _.findIndex(this.props.participants, function (participant) { return participant.address === userAddress; }) !== -1;

        let isMining = this.props.participantRegistrationTxStatus === wcwagersSelectors.TX_STATUS.PENDING;

        let hasParticipants = this.props.participants.length > 0;

        let finalPhaseDate = this.props.phasesDates['round_2'];
        let finalDate = moment.unix(finalPhaseDate);

        let now = moment();

        let isPayDisabled = Number(this.props.contestDetails.contestBalanceEther) === 0 || finalDate.isAfter(now);

        let isOwner = (this.props.contestDetails.owner === this.props.userAddress);

        if (!hasParticipants) {
            return (
                <div>
                    <Typography>Participants</Typography>
                    <Typography color="textSecondary">No participants registered yet!</Typography>
                </div>
            )
        }
        let rank = 1;
        let otherParticipantsBets = this.props.otherParticipantsBets;
        let sortedparticipantList = _.sortBy(this.props.participants, [function (participant) {
            return -1 * (otherParticipantsBets[participant.address] !== undefined ? otherParticipantsBets[participant.address].points : 0);
        }]);

        return (
            <div>
                {this.renderPayWinnerConfirmation()}
                {/* <Paper className={classes.root}> */}
                <Typography variant="subheading">Participants</Typography>
                <br />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>Ranking</TableCell>
                            <TableCell>Nickname</TableCell>
                            {/* <TableCell>Address</TableCell> */}
                            <TableCell>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedparticipantList.map(participant => {
                            let points = this.props.otherParticipantsBets[participant.address] !== undefined ? this.props.otherParticipantsBets[participant.address].points : '-';
                            return (
                                <TableRow key={participant.address}>
                                    <TableCell component="th" scope="row" className={classes.center}>{rank++}</TableCell>
                                    <TableCell>{participant.nickname}</TableCell>
                                    {/* <TableCell>{participant.address}</TableCell> */}
                                    <TableCell className={classes.center}>{points}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                {/* </Paper> */}
                {/* {this.props.isOwner && */}
                <div className={classes.wrapper}>
                    {isOwner && <Button onClick={this.payWinnerConfirmation} className={classes.payBtn} variant="raised" color="primary" disabled={isPayDisabled}>Pay Winner</Button>}
                    {isMining && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
                {/* } */}
                <br />
                <br />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        participants: wcwagersSelectors.getParticipants(state),
        otherParticipantsBets: wcwagersSelectors.getOtherParticipantsBets(state),
        isOwner: wcwagersSelectors.isOwner(state),
        winners: wcwagersSelectors.getCurrentWinners(state),
        contestDetails: wcwagersSelectors.getContestDetails(state),
        phasesDates: wcwagersSelectors.getPhaseDates(state),
        userAddress: userProfileSelectors.getAddress(state),

    };
}

ParticipantsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ParticipantsList));



