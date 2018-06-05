import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import autoBind from 'react-autobind';

import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
import * as wcwagersActions from '../../store/wc-wagers/actions';
import * as userProfileSelectors from '../../store/user-profile/reducer';
import * as userProfileActions from '../../store/user-profile/actions';
// import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import PhaseTabs from './PhaseTabs';
import GroupPhaseContainer from './GroupPhaseContainer';
import Typography from '@material-ui/core/Typography';
import KnockoutPhaseContainer from './KnockoutPhaseContainer';
import CenterContainerLarge from '../layout/center-container/CenterContainerLarge';
import { browserHistory } from 'react-router'

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
        // this.props.dispatch(wcwagersActions.setContractAddress(this.props.routeParams.address));
        // this.props.dispatch(wcwagersActions.loadPhasesDates());
        // this.props.dispatch(wcwagersActions.loadBetsSubmitted());
    }

    componentWillUpdate(nextProps, nextState) {
        let userAddress = nextProps.userAddress;
        let isParticipant = _.findIndex(nextProps.participants, function (participant) { return participant.address == userAddress; }) !== -1;
        if(nextProps.isParticipantFetched && !isParticipant) {
            let address = nextProps.routeParams.address;
            if (address !== '') {
                browserHistory.push('/contest/' + address);
            }
            else {
                browserHistory.push('/');
            }
        }

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
            <CenterContainerLarge>
                <div className={classes.root}>
                    <PhaseTabs />
                    {this.renderSelectedPhase()}
                </div>
            </CenterContainerLarge>
        )
    }
}


function mapStateToProps(state) {
    return {
        selectedPhase: matchesSelectors.getSelectedTab(state),
        participants: wcwagersSelectors.getParticipants(state),
        userAddress: userProfileSelectors.getAddress(state),
        wcwagersAddress: wcwagersSelectors.getAddress(state),

        isParticipantFetched: wcwagersSelectors.isFetched(state),
    };
}

PhaseTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(PhasesContainer));

