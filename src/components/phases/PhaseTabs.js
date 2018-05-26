import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const styles = {
    root: {
        flexGrow: 1,
        'margin-top': '2em',
    },
};


class PhaseTabs extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        };
    }

    componentDidMount() {


    }

    handleChange = (event, value) => {
        this.props.dispatch(matchesActions.selectTab(value));
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Tabs
                    value={this.props.selectedTab}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Groups" />
                    <Tab label="Round of 16" />
                    <Tab label="Quarters" />
                    <Tab label="Semi-Finals" />
                    <Tab label="Third Place" />
                    <Tab label="Final" />
                </Tabs>
            </Paper>
        )
    }
}


function mapStateToProps(state) {
    return {
        selectedTab: matchesSelectors.getSelectedTab(state),
    };
}

PhaseTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(PhaseTabs));

