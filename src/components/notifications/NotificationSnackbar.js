import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import autoBind from 'react-autobind';

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
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

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


class NotificationSnackbar extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            open: false,
            messageInfo: {},
        };
    }

    handleClose() {
        this.props.dispatch(notificationsActions.removeNotification());
    }
    handleExited() {
        // this.props.dispatch(notificationsActions.removeNotification());
        debugger;
    }
    render() {
        const { classes } = this.props;
        let open = this.props.notif !== undefined;
        let message = open ? this.props.notif.message : '';
        let key = open ? this.props.notif.key : 'key';

        return (
            <Snackbar
                key={key}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={10000}
                onClose={this.handleClose}
                onExited={this.handleExited}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
                action={[
            //         <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            //             UNDO
            // </Button>,
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
        notif: notificationsSelectors.getNotif(state),
    };
}

NotificationSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(NotificationSnackbar));

