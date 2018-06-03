import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CenterContainerSmall from './layout/center-container/CenterContainerSmall';

const styles = {
    root: {
    },
};


class Rules extends Component {
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
            <CenterContainerSmall>

                <div className={classes.root}>
                    {/* For more details about the typography: https://material-ui.com/style/typography/ */}
                    <br /><br />
                    <Typography variant="title">Rules</Typography>
                    <br /><br />
                    <Typography >...</Typography>
                </div>
            </CenterContainerSmall>
        )
    }
}


function mapStateToProps(state) {
    return {
        // selectedPhase: matchesSelectors.getSelectedTab(state)
    };
}

Rules.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Rules));

