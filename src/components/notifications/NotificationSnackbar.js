import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import autoBind from 'react-autobind';

import * as userProfileSelectors from '../../store/user-profile/reducer';
import * as userProfileActions from '../../store/user-profile/actions';

import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
import * as wcwagersActions from '../../store/wc-wagers/actions';

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
import Snackbar from '@material-ui/core/Snackbar';

import { browserHistory } from 'react-router'

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
        marginLeft: '1em',
    },

});


class ContestDetails extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            open: false,
            messageInfo: {},
        };
    }

    componentDidMount() {
        this.props.dispatch(wcwagersActions.setContractAddress(this.props.routeParams.address));
        // this.props.dispatch(matchesActions.fetchMatches());
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
    renderParticipant = (participant) => {
        let isMe = participant.address === this.props.userAddress;
        return (
            <ListItem key={participant}>
                <Avatar>
                    <AccountCircle />
                </Avatar>
                {isMe &&
                    <ListItemText primary={participant.address} secondary={participant.nickname} />
                }
                {!isMe &&
                    <div>
                        <div></div>
                        <ListItemText primary="" secondary={participant.address} />
                        <ListItemText primary="" secondary={participant.nickname} />
                    </div>
                }
            </ListItem>
        );
    }
    openBets() {
        browserHistory.push('/contest/' + this.props.address + '/bet');
    }
    render() {
        const { classes } = this.props;

        return (
            <Snackbar
                key={key}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                onExited={this.handleExited}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        UNDO
            </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
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
    };
}

ContestDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ContestDetails));

