import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import autoBind from 'react-autobind';

// import './GroupPhaseContainer.scss';



// import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Typography from '@material-ui/core/Typography';





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
};


class Header extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        }
    }



    componentDidMount() {

        // this.props.dispatch(matchesActions.fetchMatches());
        // $(document).foundation();

        // var popup = new Foundation.Reveal($('#myElement'));
        // popup.open();
        // $(document).foundation();
        // $(document).foundation();
        // $('#buyDialog').foundation('open');

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="title" color="inherit" className={classes.flex}>Pronostic - World Cup 2018 </Typography>
                        {/* <Button color="inherit">Login</Button> */}
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

