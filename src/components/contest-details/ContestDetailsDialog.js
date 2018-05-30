import React, { Component } from 'react';
import { connect } from 'react-redux';

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


class ContestDetailsDialog extends Component {
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
        this.props.dispatch(wcwagersActions.hideContestDetailsDialog())
    };
    // registerParticipant = () => {
    //     this.props.dispatch(wcwagersActions.registerParticipant())
    // };

    renderParticipant = (participant) => {
        let isMe = participant === this.props.userAddress;
        return (
            <ListItem key={participant}>
                <Avatar>
                    {/* <ImageIcon /> */}
                    <AccountCircle />
                </Avatar>
                {isMe &&
                    <ListItemText primary={participant} secondary='' />
                }
                {!isMe &&
                    <ListItemText primary="" secondary={participant} />
                }
            </ListItem>
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.props.showContestDetailsDialog}
                onClose={this.handleDialogClose}
                aria-labelledby="contest-details-dialog-title"
                classes={{
                    paper: classes.root, // class name, e.g. `classes-state-root-x`
                }}
            >
                {/* <DialogTitle id="buy-ticket-title"><Typography variant="title" align="center">Select Tickets</Typography></DialogTitle> */}
                <DialogTitle id="contest-details-dialog-title">Contest Details</DialogTitle>
                <DialogContent id="contest-details-dialog-content">
                    <Typography>Smart Contract Address</Typography>
                    <Typography color="textSecondary">{this.props.address}</Typography>
                    <br />
                    <Typography>Name</Typography>
                    <Typography color="textSecondary">{this.props.contestDetails.contestName}</Typography>
                    <br />
                    <Typography>Participation Fee</Typography>
                    <Typography color="textSecondary">{this.props.contestDetails.participationFeeEther}</Typography>
                    <br />
                    <Typography>Contest Balance</Typography>
                    <Typography color="textSecondary">{this.props.contestDetails.contestBalanceEther}</Typography>
                    <br />
                    <Typography>Participants</Typography>
                    {this.props.participants.map(this.renderParticipant)}
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
        userAddress: userProfileSelectors.getAddress(state),
        showContestDetailsDialog: wcwagersSelectors.isShowContestDetailsDialog(state),
        address: wcwagersSelectors.getAddress(state),
        contestDetails: wcwagersSelectors.getContestDetails(state),
        participants: wcwagersSelectors.getParticipants(state),
    };
}

ContestDetailsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ContestDetailsDialog));

