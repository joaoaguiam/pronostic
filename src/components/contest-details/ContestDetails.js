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
import Grid from '@material-ui/core/Grid';

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
import Paper from '@material-ui/core/Paper';


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
import ParticipantsList from './ParticipantsList';
import CenterContainerMedium from '../layout/center-container/CenterContainerMedium';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: '2em',
    },
    contestInfo:  {
        'padding': '2em',
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

});


class ContestDetails extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            nickname: '',
        };
    }



    componentDidMount() {
        this.props.dispatch(wcwagersActions.setContractAddress(this.props.routeParams.address));

    }
    // }
    // handleClick = event => {
    //     this.setState({ anchorEl: event.currentTarget });
    // };

    handleDialogClose = () => {
        this.props.dispatch(wcwagersActions.hideContestDetailsDialog())
    };
    // registerParticipant = () => {
    //     this.props.dispatch(wcwagersActions.registerParticipant())
    // };
    handleNicknameChange(e) {
        this.setState({ nickname: e.target.value });
    }
    registerParticipant = () => {
        this.props.dispatch(wcwagersActions.registerParticipant(this.state.nickname))
    };
    openBets() {
        // browserHistory.push('/contest/' + this.props.address + '/bet');
        this.props.dispatch(matchesActions.openBetsPage());
    }
    render() {
        const { classes } = this.props;
        // let isParticipant = _.indexOf(this.props.participants, this.props.userAddress) !== -1;
        let userAddress = this.props.userAddress;
        let isParticipant = _.findIndex(this.props.participants, function (participant) { return participant.address === userAddress; }) !== -1;

        let hasParticipants = this.props.participants.length > 0;
        let isMining = this.props.participantRegistrationTxStatus === wcwagersSelectors.TX_STATUS.PENDING;
        let isRegisterDisabled = this.state.nickname.trim() === '' || isMining;



        if (this.props.openBetsPage) {
            return (
                <PhasesContainer routeParams={{ address: this.props.routeParams.address }} />
            )
        }
        return (
            <div>

                <div className={classes.root}>
                    <Typography variant="headline" align="center">Welcome to Ponostic 2018</Typography>
                    <Typography variant="subheading" color="textSecondary" align="center">Ready to set your predictions for all 64 matches in the Fifa World Cup 2018?</Typography>

                    <CenterContainerSmall>

                        <Paper>
                            <div className={classes.contestInfo}>
                                <Typography variant='subheading'>{this.props.contestDetails.contestName}</Typography>
                                {/* <Typography>Contest Address</Typography> */}
                                {/* <Typography color="textSecondary">{this.props.address}</Typography> */}
                                {/* <br /> */}
                                {/* <Typography>Contest Name</Typography> */}

                                {/* <br /> */}
                                {/* <Typography>Contest Owner</Typography>
                                <Typography color="textSecondary">{this.props.contestDetails.owner}</Typography> */}
                                <br />
                                <Typography>Participation Fee</Typography>
                                <Typography color="textSecondary">{this.props.contestDetails.participationFeeEther} ether</Typography>
                                <br />
                                <Typography>Pot Size</Typography>
                                <Typography color="textSecondary">{this.props.contestDetails.contestBalanceEther} ether</Typography>
                                {!isParticipant &&
                                    <div className={classes.parentFlex}>
                                        <TextField
                                            required
                                            id="nickname"
                                            label="Nickname"
                                            value={this.state.nickname}
                                            className={classes.textField}
                                            margin="normal"
                                            onChange={this.handleNicknameChange}

                                        />
                                        <div className={classes.wrapper}>
                                            <Button onClick={this.registerParticipant} className={classes.registerBtn} variant="raised" color="primary" disabled={isRegisterDisabled}>Register</Button>
                                            {isMining && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>
                                    </div>
                                }

                                {isParticipant &&
                                    <div>
                                        {/* <Typography color="primary">Already a participant in this contest</Typography> */}

                                        <Button variant="raised" onClick={this.openBets} className={classes.registerBtn} color="primary">Set your predictions</Button>
                                    </div>
                                }
                                <br />
                                <ParticipantsList />

                            </div>
                        </Paper>

                    </CenterContainerSmall>

                </div>
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        userAddress: userProfileSelectors.getAddress(state),
        showContestDetailsDialog: wcwagersSelectors.isShowContestDetailsDialog(state),
        address: wcwagersSelectors.getAddress(state),
        contestDetails: wcwagersSelectors.getContestDetails(state),
        participants: wcwagersSelectors.getParticipants(state),
        participantRegistrationTxStatus: wcwagersSelectors.getParticipantRegistrationTxStatus(state),
        openBetsPage: matchesSelectors.getOpenBetsPage(state),
    };
}

ContestDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ContestDetails));

