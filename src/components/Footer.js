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


class Footer extends Component {
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
                <Typography variant="caption" gutterBottom align="center">#buidl with passion by Jean-Marc Henry and Joao Aguiam</Typography>
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

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Footer));

