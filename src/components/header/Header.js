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

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


import '../../helpers/web3/Web3Helper';
import UserProfileDialog from '../user-profile/UserProfileDialog';

import { browserHistory } from 'react-router'

// import ContestDetailsDialog from '../contest-details/ContestDetailsDialog';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
        cursor: 'pointer',
        // ':hover': {
        //     color:
        // }
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

    }

    handleUserProfileClick = () => {
        this.props.dispatch(userProfileActions.showUserProfileDialog())
    };

    handleContestDetailsClick = () => {
        this.props.dispatch(wcwagersActions.showContestDetailsDialog())
    };

    goToContestHome() {
        let address = this.props.wcwagersAddress;
        if(address !== '') {
            browserHistory.push('/contest/'+address);
        }
        else {
            browserHistory.push('/');
        }
    }
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>
                <UserProfileDialog />
                {/* <ContestDetailsDialog /> */}
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex} onClick={this.goToContestHome}>Pronostic - World Cup 2018</Typography>
                        {/* <Button onClick={this.handleContestDetailsClick} color="inherit">Contest Details</Button> */}
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
        wcwagersAddress: wcwagersSelectors.getAddress(state),
        // isFetched: showEventSelectors.getIsFetched(state)
    };
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Header));

