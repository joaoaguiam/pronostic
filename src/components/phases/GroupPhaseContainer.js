import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import moment from 'moment-timezone';

import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
import * as wcwagersActions from '../../store/wc-wagers/actions';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import 'flag-icon-css/css/flag-icon.css';

import _ from 'lodash';
import PhaseMatches from '../phases/PhaseMatches';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        // 'background-color': '#f5f5f5',
        // flexGrow: 1,
        'padding-top': "2em",
        'padding-bottom': "2em",
    },
    btnContainer: {
        flexGrow: 1,
        'padding-top': '2em',
    },
    group: {
        'padding-top': "2em",
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    wrapperText: {
        margin: theme.spacing.unit,
        textAlign: 'right',
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class GroupPhaseContainer extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        }
    }

    renderGroupSection(groupKey) {
        const { classes } = this.props;

        let group = this.props.matches.groups[groupKey];
        let matches = group.matches;
        return (
            <div key={groupKey} className={classes.group}>
                <Typography variant="title" gutterBottom>{group.name}</Typography>
                <PhaseMatches matches={matches} phase="groups" subPhase={groupKey} />
            </div>
        )
    }

    handleSubmit() {
        this.props.dispatch(wcwagersActions.submitBets("groups", '', this.props.bets));
    }
    render() {
        if (!this.props.isFetched) {
            return <Typography variant="caption">Loading...</Typography>
        }
        let groupKeys = _.keys(this.props.matches.groups);
        const { classes } = this.props;

        let phasesDates = this.props.phasesDates;
        let phaseDate = phasesDates.groups;

        let submissionDate = moment.unix(phaseDate);
        let submissionDateStr = submissionDate.format("MMM DD - hh:mm a");
        let now = moment();
        let submissionDenied = submissionDate.isBefore(now);

        let isMining = this.props.betsTxStatus === wcwagersSelectors.TX_STATUS.PENDING;
        let isDisabled = this.props.betsTxStatus === wcwagersSelectors.TX_STATUS.PENDING || submissionDenied;
        let phaseLink = this.props.betsSubmitted.groups;
        return (
            <div className={classes.root}>
                <Typography variant="display2" gutterBottom>Groups Phase</Typography>
                {groupKeys.map(this.renderGroupSection)}
                <Grid container className={classes.btnContainer}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={16}
                            justify={"flex-end"}
                        >
                            <Grid item className={classes.wrapper}>
                                <Button variant="raised" color="primary" onClick={this.handleSubmit} disabled={isDisabled} >Submit to Blockchain</Button>
                                {isMining && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Grid>

                        </Grid>
                        <Grid
                            container
                            spacing={16}
                            justify={"flex-end"}
                        >
                            <Grid item className={classes.wrapperText} >
                                <Typography variant="caption">Submissions allowed until: {submissionDateStr}</Typography>
                                {phaseLink !== '' &&
                                    <Typography variant="caption">Last submission: <a href={phaseLink} target="_balnk">{phaseLink}</a></Typography>
                                }
                            </Grid>

                        </Grid>


                    </Grid>

                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        matches: matchesSelectors.getMatches(state),
        bets: matchesSelectors.getBets(state),
        isFetched: matchesSelectors.isFetched(state),
        betsTxStatus: wcwagersSelectors.getBetsTxStatus(state),
        phasesDates: wcwagersSelectors.getPhaseDates(state),
        betsSubmitted: wcwagersSelectors.getBetsSubmitted(state),
    };
}

GroupPhaseContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GroupPhaseContainer));

