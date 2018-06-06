


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

});


class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            nickname: '',
        };
    }



    componentDidMount() {
        // this.props.dispatch(wcwagersActions.setContractAddress(this.props.routeParams.address));
        // this.props.dispatch(matchesActions.fetchMatches());
        // this.props.dispatch(notificationsActions.addNotification(this.props.routeParams.address));
    }
    // }
    // handleClick = event => {
    //     this.setState({ anchorEl: event.currentTarget });
    // };

    handleDialogClose = () => {
        // this.props.dispatch(wcwagersActions.hideContestDetailsDialog())
    };
    // registerParticipant = () => {
    //     this.props.dispatch(wcwagersActions.registerParticipant())
    // };

    // renderParticipant = (participant) => {
    //     let isMe = participant.address === this.props.userAddress;
    //     return (
    //         <ListItem key={participant}>
    //             <Avatar>
    //                 <AccountCircle />
    //             </Avatar>
    //             {isMe &&
    //                 <ListItemText primary={participant.address} secondary={participant.nickname} />
    //             }
    //             {!isMe &&
    //                 <div>
    //                     <div></div>
    //                     <ListItemText primary="" secondary={participant.address} />
    //                     <ListItemText primary="" secondary={participant.nickname} />
    //                 </div>
    //             }
    //         </ListItem>
    //     );
    // }
    // openBets() {
    //     // browserHistory.push('/contest/' + this.props.address + '/bet');
    //     this.props.dispatch(matchesActions.openBetsPage());
    // }
    render() {
        const { classes } = this.props;
        // let isParticipant = _.indexOf(this.props.participants, this.props.userAddress) !== -1;
        let userAddress = this.props.userAddress;
        let isParticipant = _.findIndex(this.props.participants, function (participant) { return participant.address === userAddress; }) !== -1;

        let isMining = this.props.participantRegistrationTxStatus === wcwagersSelectors.TX_STATUS.PENDING;
        let isRegisterDisabled = this.state.nickname.trim() === '' || isMining;



        // if (this.props.openBetsPage) {
        //     return (
        //         <PhasesContainer routeParams={{ address: this.props.routeParams.address }} />
        //     )
        // }
        let hasParticipants = this.props.participants.length > 0;

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
        let sortedparticipantList = _.sortBy(this.props.participants, [function(participant) { 
            return -1 * (otherParticipantsBets[participant.address] !== undefined ? otherParticipantsBets[participant.address].points : 0);
        }]);

        return (
            <div>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>Ranking</TableCell>
                                <TableCell>Nickname</TableCell>
                                <TableCell>Address</TableCell>
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
                                        <TableCell>{participant.address}</TableCell>
                                        <TableCell className={classes.center}>{points}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <br/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // userAddress: userProfileSelectors.getAddress(state),
        // showContestDetailsDialog: wcwagersSelectors.isShowContestDetailsDialog(state),
        // address: wcwagersSelectors.getAddress(state),
        // contestDetails: wcwagersSelectors.getContestDetails(state),
        participants: wcwagersSelectors.getParticipants(state),
        otherParticipantsBets: wcwagersSelectors.getOtherParticipantsBets(state),
        // participantRegistrationTxStatus: wcwagersSelectors.getParticipantRegistrationTxStatus(state),
        // openBetsPage: matchesSelectors.getOpenBetsPage(state),
    };
}

ParticipantsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ParticipantsList));



