import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';


import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import moment from 'moment-timezone';

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
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


import 'flag-icon-css/css/flag-icon.css';

import _ from 'lodash';


const styles = theme => ({
    root: {
        // 'background-color': '#f5f5f5',
        // flexGrow: 1,
        'padding-top': "2em",
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
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class GroupPhaseContainer extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        }
    }


    changeHomeScoreBet(phase, subPhase, matchId) {
        let dispatch = this.props.dispatch;

        return (e) => {
            let bet = e.target.value;
            dispatch(matchesActions.setGroupHomeBet(phase, subPhase, matchId, bet))
        }
    }
    changeAwayScoreBet(phase, subPhase, matchId) {
        let dispatch = this.props.dispatch;
        return (e) => {
            let bet = e.target.value;
            dispatch(matchesActions.setGroupAwayBet(phase, subPhase, matchId, bet))
        }
    }
    render() {
        const { classes } = this.props;

        let phase = this.props.phase;
        let subPhase = this.props.subPhase;
        let matches = this.props.matches;
        let bets = this.props.bets;
        // if(bets !== undefined) {
        //     console.log(bets);
        //     debugger;
        // }
        let container = this;
        return (
            <div className={classes.group}>
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
                            {this.props.matches.map(match => {
                                let teamHome = matchesSelectors.getTeam(this.props.allMatches, match.home_team);
                                let teamHomeName = teamHome !==undefined ? teamHome.name : '';
                                let teamHomeIso = teamHome !==undefined ? teamHome.iso2 : '';
                                
                                let teamAway = matchesSelectors.getTeam(this.props.allMatches, match.away_team);
                                let teamAwayName = teamAway !==undefined ? teamAway.name : '';
                                let teamAwayIso = teamAway !==undefined ? teamAway.iso2 : '';
                                
                                let date = moment(match.date).format("MMM DD - hh:mm a");


                                let homeBet = bets !== undefined && _.has(bets[match.name - 1], 'homeBet') ? bets[match.name - 1].homeBet : '';
                                
                                let awayBet = bets !== undefined && _.has(bets[match.name - 1], 'awayBet') ? bets[match.name - 1].awayBet : '';
                                return (
                                    <TableRow key={match.name}>
                                        <TableCell component="th" scope="row" className={classes.center}>{match.name}</TableCell>
                                        <TableCell><span className={"flag-icon flag-icon-" + teamHomeIso}></span> {teamHomeName}</TableCell>
                                        <TableCell><span className={"flag-icon flag-icon-" + teamAwayIso}></span> {teamAwayName}</TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell className={classes.betCell}>
                                            <TextField
                                                id={"homeBet" + match.name}
                                                value={homeBet}
                                                onChange={container.changeHomeScoreBet(phase, subPhase, match.name)}
                                                type="number"
                                                className={classes.betField}
                                                margin="dense"
                                            // value= {bets[matchIndex].homeBet}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <TextField
                                                id={"awayBet" + match.name}
                                                value={awayBet}
                                                onChange={container.changeAwayScoreBet(phase, subPhase, match.name)}
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
}


function mapStateToProps(state) {
    return {
        allMatches: matchesSelectors.getMatches(state),

        bets: matchesSelectors.getBets(state),
    };
}

GroupPhaseContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GroupPhaseContainer));

