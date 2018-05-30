import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

// import './GroupPhaseContainer.scss';

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


class Header extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        // this.state = {
        //     anchorEl: null,
        // };
    }



    componentDidMount() {

    }
    // }
    // handleClick = event => {
    //     this.setState({ anchorEl: event.currentTarget });
    // };

    handleDialogClose = () => {
        this.props.dispatch(userProfileActions.hideUserProfileDialog())
    };
    registerParticipant = () => {
        this.props.dispatch(wcwagersActions.registerParticipant())
    };
    render() {
        const { classes } = this.props;
        console.log(this.props.showUserProfileDialog);
        return (
            <Dialog
                open={this.props.showUserProfileDialog}
                onClose={this.handleDialogClose}
                aria-labelledby="user-profile-dialog-title"
                classes={{
                    paper: classes.root, // class name, e.g. `classes-state-root-x`
                }}
            >
                {/* <DialogTitle id="buy-ticket-title"><Typography variant="title" align="center">Select Tickets</Typography></DialogTitle> */}
                <DialogTitle id="user-profile-dialog-title">User Profile</DialogTitle>
                <DialogContent id="user-profile-dialog-content">
                    <Typography>Network</Typography>
                    <Typography color="textSecondary">{this.props.network}</Typography>
                    <br />
                    <Typography>Address</Typography>
                    <Typography color="textSecondary">{this.props.address}</Typography>
                    <br />
                    <Typography>Balance</Typography>
                    <Typography color="textSecondary">{this.props.balance}</Typography>
                    <br />
                    <Button onClick={this.registerParticipant} variant="raised" color="primary">Register Participant</Button>
                </DialogContent>
                {/* <DialogActions>
                        <Button onClick={this.handleClose} variant="raised" color="primary" disabled>Purchase with USD</Button>
                        <Button onClick={this.handleClose} variant="raised" color="secondary" disabled={isDisabled}>Purchase with Ether</Button>
                    </DialogActions> */}
            </Dialog>
        )
    }
}


function mapStateToProps(state) {
    return {
        showUserProfileDialog: userProfileSelectors.isShowUserProfileDialog(state),
        address: userProfileSelectors.getAddress(state),
        balance: userProfileSelectors.getBalanceEther(state),
        network: userProfileSelectors.getNetwork(state),
    };
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Header));

