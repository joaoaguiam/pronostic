import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

// import * as matchesSelectors from '../../store/matches/reducer';
// import * as matchesActions from '../../store/matches/actions';

// import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
// import * as wcwagersActions from '../../store/wc-wagers/actions';

// import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const styles = {
    root: {
    },
};


class Home extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        };
    }

    componentDidMount() {
        // this.props.dispatch(wcwagersActions.setContractAddress(this.props.routeParams.address));
        // this.props.dispatch(matchesActions.fetchMatches());
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <br /><br />
                <Typography variant="caption" gutterBottom align="center">You need to connect to an existing contest.</Typography>
                <br /><br />
                <Typography variant="caption" gutterBottom align="center"><a href="https://github.com/joaoaguiam/pronostic" target="_blank">GitHub repo</a></Typography>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // selectedPhase: matchesSelectors.getSelectedTab(state)
    };
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Home));

