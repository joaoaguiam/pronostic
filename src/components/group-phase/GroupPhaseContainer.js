import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import autoBind from 'react-autobind';


import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import moment from 'moment-timezone';

import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import _ from 'lodash';


const styles = {
    root: {
        // 'background-color': '#f5f5f5',
        // flexGrow: 1,
        padding: "2em",
    },
    group: {
        'padding-top': "2em",
    },
    center: {
        'text-align': 'center',
    },
    betCell: {

    },
    betField: {
        width: '30px',
        'input': {
            'text-align': 'center'
        }
    }
};

class GroupPhaseContainer extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        }
    }



    componentDidMount() {
        this.props.dispatch(matchesActions.fetchMatches());
    }


    changeHomeScoreBet(groupKey, matchId) {
        let dispatch = this.props.dispatch;

        return (e) => {
            let bet = e.target.value;
            // dispatch(matchesActions.setGroupHomeBet('groups', groupKey, matchId, bet))
        }
    }
    changeAwayScoreBet(groupKey, matchId) {
        let dispatch = this.props.dispatch;
        return (e) => {
            let bet = e.target.value;
            // dispatch(matchesActions.setGroupAwayBet('groups', groupKey, matchId, bet));
        }
    }
    renderGroupSection(groupKey) {
        const { classes } = this.props;

        let group = this.props.matches.groups[groupKey];
        let matches = this.props.matches;
        let container = this;
        return (
            <div key={groupKey} className={classes.group}>
                <Typography variant="title" gutterBottom>{group.name}</Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>Game #</TableCell>
                                <TableCell>Home Team</TableCell>
                                <TableCell>Away Team</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Score Bet</TableCell>
                                {/* <TableCell></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {group.matches.map(match => {
                                let teamHome = matchesSelectors.getTeam(matches, match.home_team);
                                let teamAway = matchesSelectors.getTeam(matches, match.away_team);
                                let date = moment(match.date).format("MMM DD - hh:mm a");

                                return (
                                    <TableRow key={match.name}>
                                        <TableCell component="th" scope="row" className={classes.center}>{match.name}</TableCell>
                                        <TableCell>{teamHome.emojiString} {teamHome.name}</TableCell>
                                        <TableCell>{teamAway.emojiString} {teamAway.name}</TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell className={classes.betCell}>
                                            <TextField
                                                value={this.state.age}
                                                onChange={container.changeHomeScoreBet(groupKey, match.name)}
                                                type="number"
                                                className={classes.betField}
                                                margin="dense"
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <TextField
                                                value={this.state.age}
                                                onChange={container.changeAwayScoreBet(groupKey, match.name)}
                                                type="number"
                                                className={classes.betField}
                                                margin="dense"
                                            /></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
    render() {
        if (!this.props.isFetched) {
            return <Typography variant="caption">Loading...</Typography>

        }
        let groupKeys = _.keys(this.props.matches.groups);
        return (
            <div className={this.props.classes.root}>
                <Typography variant="display2" gutterBottom>Groups Phase</Typography>
                {groupKeys.map(this.renderGroupSection)}

            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        matches: matchesSelectors.getMatches(state),
        isFetched: matchesSelectors.isFetched(state)
    };
}

GroupPhaseContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GroupPhaseContainer));

