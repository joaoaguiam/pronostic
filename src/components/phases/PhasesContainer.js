import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
import * as wcwagersActions from '../../store/wc-wagers/actions';

// import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import PhaseTabs from './PhaseTabs';
import GroupPhaseContainer from './GroupPhaseContainer';
import Typography from '@material-ui/core/Typography';
import KnockoutPhaseContainer from './KnockoutPhaseContainer';

const styles = {
    root: {
    },
};


class PhasesContainer extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.dispatch(wcwagersActions.setContractAddress(this.props.routeParams.address));
        this.props.dispatch(matchesActions.fetchMatches());
    }

    renderSelectedPhase() {
        switch (this.props.selectedPhase) {
            case 0: { 
                return (
                    <GroupPhaseContainer />
                )
            }
            case 1: {
                return (
                    <KnockoutPhaseContainer title="Round of 16" subPhase="round_16" />
                )
            }
            case 2: {
                return (
                    <KnockoutPhaseContainer title="Quarters" subPhase="round_8" />
                )
            }
            case 3: {
                return (
                    <KnockoutPhaseContainer title="Semi-Finals" subPhase="round_4" />
                )
            }
            case 4: {
                return (
                    <KnockoutPhaseContainer title="Third Place Playoff" subPhase="round_2_loser" />
                )
            }
            case 5: {
                return (
                    <KnockoutPhaseContainer title="Final" subPhase="round_2" />
                )
            }
            default:
                return (
                    <div>
                        <br />
                        <Typography variant="caption" gutterBottom align="center">ERROR! No mathces available</Typography>
                    </div>
                )
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <PhaseTabs />
                {this.renderSelectedPhase()}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        selectedPhase: matchesSelectors.getSelectedTab(state)
    };
}

PhaseTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(PhasesContainer));

