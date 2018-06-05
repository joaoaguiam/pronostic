import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';


import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import * as wcwagersSelectors from '../../store/wc-wagers/reducer';
import * as wcwagersActions from '../../store/wc-wagers/actions';

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
import StarsIcon from '@material-ui/icons/Stars';

import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

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
    winnerIcon: {
        fontSize: 20,
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
            let bet = Math.max(0, e.target.value);
            dispatch(matchesActions.setGroupHomeBet(phase, subPhase, matchId, bet))
        }
    }
    changeAwayScoreBet(phase, subPhase, matchId) {
        let dispatch = this.props.dispatch;
        return (e) => {
            let bet = Math.max(0, e.target.value);
            dispatch(matchesActions.setGroupAwayBet(phase, subPhase, matchId, bet))
        }
    }
    setWinnerBet(phase, subPhase, matchId) {
        let dispatch = this.props.dispatch;
        return (e) => {
            let bet = e.target.value;
            dispatch(matchesActions.setWinnerBet(phase, subPhase, matchId, bet))
        }
    }
    render() {
        const { classes } = this.props;

        let phase = this.props.phase;
        let subPhase = this.props.subPhase;
        let bets = this.props.bets;
        let isKnockout = this.props.isKnockout;
        // if(bets !== undefined) {
        //     console.log(bets);
        //     debugger;
        // }

        let timePhase = 'groups';
        if (phase !== 'groups') {
            timePhase = subPhase;
            timePhase = timePhase.replace('_loser', '');
        }
        let phaseDate = this.props.phasesDates[timePhase];
        let submissionDate = moment.unix(phaseDate);
        let submissionDateStr = submissionDate.format("MMM DD - hh:mm a");
        let now = moment();
        let submissionDenied = submissionDate.isBefore(now);

        // let savedBetsPhase = this.props.savedBets[timePhase];

        console.log(submissionDateStr);
        let container = this;
        return (
            <div className={classes.group}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>Game #</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Home Team</TableCell>
                                {isKnockout && <TableCell>Predicted Winner</TableCell>}
                                <TableCell>Away Team</TableCell>
                                <TableCell>Prediction</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Points</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.matches.map(match => {
                                let teamHome = matchesSelectors.getTeam(this.props.allMatches, match.home_team);
                                let teamHomeName = teamHome !== undefined ? teamHome.name : '';
                                let teamHomeIso = teamHome !== undefined ? teamHome.iso2 : '';

                                let teamAway = matchesSelectors.getTeam(this.props.allMatches, match.away_team);
                                let teamAwayName = teamAway !== undefined ? teamAway.name : '';
                                let teamAwayIso = teamAway !== undefined ? teamAway.iso2 : '';

                                let date = moment(match.date).format("MMM DD - hh:mm a");

                                let isFinished = match.finished;
                                let homeResult = match.home_result;
                                let awayResult = match.away_result;

                                let isWinnerHome = match.winner === match.home_team || match.home_result > match.away_result;
                                let isWinnerAway = match.winner === match.away_team || match.home_result < match.away_result;

                                let homeBet = bets !== undefined && _.has(bets[match.name - 1], 'homeBet') ? bets[match.name - 1].homeBet : '';
                                let awayBet = bets !== undefined && _.has(bets[match.name - 1], 'awayBet') ? bets[match.name - 1].awayBet : '';
                                let winnerBet = bets !== undefined && _.has(bets[match.name - 1], 'winnerBet') ? bets[match.name - 1].winnerBet : '';

                                let savedBet = this.props.savedBets[timePhase];
                                let changedHomeBet = savedBet !== undefined && _.has(savedBet[match.name - 1], 'homeBet') ? (savedBet[match.name - 1].homeBet !== homeBet) : (homeBet !== '');
                                let changedAwayBet = savedBet !== undefined && _.has(savedBet[match.name - 1], 'awayBet') ? (savedBet[match.name - 1].awayBet !== awayBet) : (awayBet !== '');
                                let changedWinnerBet = savedBet !== undefined && _.has(savedBet[match.name - 1], 'winnerBet') ? (savedBet[match.name - 1].winnerBet == winnerBet ? 'default' : 'secondary') : 'secondary';
                                // if(match.name === 18) {
                                //     debugger;
                                // }

                                let pointsForMatch = matchesSelectors.calculateMatchPoints(match, savedBet, timePhase);

                                if(match.name === 49) {
                                    // debugger;
                                }
                                return (
                                    <TableRow key={match.name}>
                                        <TableCell component="th" scope="row" className={classes.center}>{match.name}</TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>
                                            <span className={"flag-icon flag-icon-" + teamHomeIso}></span> {teamHomeName}

                                        </TableCell>
                                        {isKnockout &&
                                            <TableCell>
                                                <Radio
                                                    checked={winnerBet === 'home'}
                                                    onChange={this.setWinnerBet(phase, subPhase, match.name)}
                                                    value="home"
                                                    color={changedWinnerBet}
                                                    name="radio-button-demo"
                                                    // aria-label="E"
                                                    className={classes.size}
                                                    icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
                                                    checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
                                                    disabled={submissionDenied}
                                                />
                                                -
                                            <Radio
                                                    checked={winnerBet === 'away'}
                                                    onChange={this.setWinnerBet(phase, subPhase, match.name)}
                                                    value="away"
                                                    color={changedWinnerBet}
                                                    name="radio-button-demo"
                                                    // aria-label="E"
                                                    className={classes.size}
                                                    icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
                                                    checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
                                                    disabled={submissionDenied}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell><span className={"flag-icon flag-icon-" + teamAwayIso}></span> {teamAwayName}</TableCell>
                                        <TableCell className={classes.betCell}>
                                            <TextField
                                                id={"homeBet" + match.name}
                                                value={homeBet}
                                                onChange={container.changeHomeScoreBet(phase, subPhase, match.name)}
                                                type="number"
                                                className={classes.betField}
                                                margin="dense"
                                                disabled={submissionDenied}
                                                error={changedHomeBet}
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
                                                disabled={submissionDenied}
                                                error={changedAwayBet}

                                            />
                                        </TableCell>
                                        <TableCell>
                                            {isFinished &&
                                                <div>
                                                    {/* {isWinnerHome && <StarsIcon className={classes.winnerIcon} color="primary" />} */}
                                                    {homeResult} - {awayResult}
                                                    {/* {isWinnerAway && <StarsIcon className={classes.winnerIcon} color="primary" />} */}
                                                </div>
                                            }
                                        </TableCell>
                                        <TableCell>{pointsForMatch}</TableCell>

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
        phasesDates: wcwagersSelectors.getPhaseDates(state),
        savedBets: matchesSelectors.getSavedBets(state),
    };
}

GroupPhaseContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GroupPhaseContainer));
