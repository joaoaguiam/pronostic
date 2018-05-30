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


import '../../helpers/web3/Web3Helper';
import UserProfileDialog from '../user-profile/UserProfileDialog';

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
        this.state = {
            anchorEl: null,
        };
    }



    componentDidMount() {

        this.props.dispatch(wcwagersActions.fetchParticipants('0x1e0b778e6e3b2924a3715fc785d83ec8509c1009'))
    }

    handleUserProfileClick = () => {
        this.props.dispatch(userProfileActions.showUserProfileDialog())
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>
                <UserProfileDialog />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>Pronostic - World Cup 2018 </Typography>
                        {/* <Button onClick={this.handleClick} color="inherit">Register Participant</Button> */}
                        <IconButton onClick={this.handleUserProfileClick} color="inherit">
                            <AccountCircle />
                        </IconButton>
                        {/* <div>
                            <Button
                                aria-owns={anchorEl ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                color="inherit"
                            >
                                Open Menu
        </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                            </Menu>
                        </div> */}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // event: showEventSelectors.getEvent(state),
        // isFetched: showEventSelectors.getIsFetched(state)
    };
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Header));

