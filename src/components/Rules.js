import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CenterContainerSmall from './layout/center-container/CenterContainerSmall';
import CenterContainerLarge from './layout/center-container/CenterContainerLarge';
import RulesKnockoutExamples from './rules/RulesKnockoutExamples';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: `${theme.spacing.unit * 3}px`,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'wrap',
        marginBottom: theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
});


class Rules extends Component {
    state = {
        direction: 'column',
        justify: 'space-between',
        alignItems: 'center',
    };
    constructor(props) {
        super(props);
        autoBind(this);

    }

    componentDidMount() {
        // this.props.dispatch(wcwagersActions.setContractAddress(this.props.routeParams.address));
        // this.props.dispatch(matchesActions.fetchMatches());
    }

    render() {
        const { classes } = this.props;
        const { alignItems, direction, justify } = this.state;
        return (
            <CenterContainerLarge>

                <div className={classes.root}>

                    <Grid container
                        spacing={24}
                        alignItems={alignItems}
                        direction="row"
                        justify={justify}>
                        <Grid item xs={12}
                            alignItems={alignItems}
                            direction={direction}
                            justify={justify}>
                            <Typography variant="display1" align="center">GETTING STARTED</Typography>
                            <br />

                        </Grid>
                    </Grid>
                    {/* <Paper className={classes.paper}> */}

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading} variant="title">What do I need to participate?</Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <Typography>
                                <br />Use a computer with Chrome or Firefox<br />
                                <br />Install the Metamask plugin in your browser<br />
                                <br />Put Ether in your Metamask account<br />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading} variant="title">How does it work?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <br />This is a winner-take-all type of contest.<br />
                                <br />Each participant stakes Ether to enter the contest. The amount to be staked is a fixed Ether value of 0.033(about 20$)<br />
                                <br />Each participant makes predictions on the score of each match<br />
                                <br />When the participant is ready to submit his prediction he/she submits the prediction to the blockchain<br />
                                <br />There is a total of 5 submissions to make. One for the group stage, 4 for the knockout stages (one for the round of 16, one for the quarters,..)<br />
                                <br />The predictions need to be submitted before the start of the first game of round of predictions<br />
                                <br />Each prediction can make the participant points (see below for scoring system)<br />
                                <br />At the end of the contest, the person with the most points wins the whole pot<br />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading} variant="title">How do I submit my predictions to the blockchain?</Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <Typography>
                                <br />Once you have entered all of your predictions, click on the blue 'Submit to blockchain' button at the bottom of the page<br />
                                <br />Note that this operation will cost you gas (about 0.10$ with gas price of 1 gwei) so you should do it once your predictions are final<br />
                                <br />Note that your predictions are stored locally, so that if you do not finish making all your predictions you can continue later without submitting<br />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading} variant="title">What is the deadline for submitting predictions?</Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <Typography>
                                <br />Each stage of prediction has a different deadline, which is the date/time of the first match of that stage <br />
                                <br />For instance, the group stage predictions need to be submitted 15 minutes before the start of the opening match (Jun 14 - 08:45 am MDT)<br />
                                <br />If you miss the deadline you will not get any points for that stage<br />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading} variant="title">How much will it costs me to participate?</Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <Typography>
                                <br />The registration costs 0.033 Ether plus the gas fee (about 20$)<br />
                                <br />Add to this the gas fee for each stage's prediction submission. If the gas price is 1 gwei it will end up costing you about 70 cents<br />
                                <br />With a gas price of 5 gwei, it would add about 3$<br />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* </Paper> */}
                    <Grid container
                        spacing={24}
                        alignItems={alignItems}
                        direction="row"
                        justify={justify}>
                        <Grid item xs={12}
                            alignItems={alignItems}
                            direction={direction}
                            justify={justify}>
                            {/* <Paper className={classes.paper}> */}
                            <br />
                            <br />
                            <br />

                            <Typography variant="display1" align="center">SCORING SYSTEM</Typography>
                            <br />
                            {/* </Paper> */}
                        </Grid>
                    </Grid>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading} variant="title">How are points calculated in the Group stage?</Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <Typography>
                                <br />10 points if you predict the exact score<br />
                                <br />5 points if you predict the winner<br />
                                <br />3 points if you predict a draw<br />
                                <br />0 point for a wrong prediction<br />
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading} variant="title">How are points calculated in the Knockout stages?</Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            {/* <Grid container>
                            <Grid item>
                            <Typography>
                                <br />For the knockout stage the scoring is slightly different from the group stage.<br />
                                <br />You will need to predict the final score (before the PKs) AND the winning team.<br />
                                <br />Where things are different is if you predict a draw. Because then you can get points for predicting the correct score AND points for predicting the correct winner.<br />
                                <br />Below are a few examples to illustrate how the scoring system works in the knockout stages.<br />
                            </Typography>
                            <br />
                            </Grid>
                            </Grid>  */}
                            <Grid container spacing={24}>
                                <Grid container>
                                    <Grid item style={{padding: '1em'}}>
                                        <Typography>
                                            <br />For the knockout stage the scoring is slightly different from the group stage.<br />
                                            <br />You will need to predict the final score (before the PKs) AND the winning team.<br />
                                            <br />Where things are different is if you predict a draw. Because then you can get points for predicting the correct score AND points for predicting the correct winner.<br />
                                            <br />Below are a few examples to illustrate how the scoring system works in the knockout stages.<br />
                                        </Typography>
                                        <br />
                                    </Grid>
                                </Grid>

                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <p>I predict Uruguay-Argentina 2-0.</p>
                                        <p>Results : 1-1 after 120 minutes, Uruguay wins in PKs.</p>
                                        <p>I predicted Uruguay as a winner, but I have the wrong score. I collect 5 points.</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <p>I predict Uruguay-Argentina 2-0.</p>
                                        <p>Results : 2-0 after 90 minutes, Uruguay wins.</p>
                                        <p>I have the exact score. I collect 10 points.</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <p>I predict Uruguay-Argentina 1-1 and Uruguay as an winner.</p>
                                        <p>Results : a draw 1-1 after 90 minutes. Uruguay wins in overtime 2-1.</p>
                                        <p>I have the right score after 90 minutes, but only the final score matters! I collect 5 points for predicting the correct winner.</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <p>I predict Uruguay-Argentina 1-1 and Uruguay as an winner.</p>
                                        <p>Results : a draw 1-1 after overtime. Uruguay wins in PKs.</p>
                                        <p>I have the right score after overtime. I collect 10 points. On top of that I collect 5 points for predicting the correct winner, for a total of 15 points!</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <p>I predict Uruguay-Argentina 1-1 and Uruguay as an winner.</p>
                                        <p>Results : a draw, 0-0 after overtime. Uruguay wins in PKs.</p>
                                        <p>I have predicted a draw, but the wrong score. I collect 3 points.</p>
                                        <p>As I did not predict the correct winner, I only collect 3 points.</p>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                </div>
            </CenterContainerLarge>
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


// Group stage :
// 10 points if you predict the exact score

// 5 points if you predict the winner

// 3 points if you predict a draw

// 0 point for a wrong prediction



// Knockout stages:

// For the knockout stage the scoring is slightly different from the group stage. Thus you will need to predict the final score (before the PKs) AND the winning team.

// Where things are different is if you predict a draw. Because then you can get points for predicting the correct score AND points for predicting the correct winner.

// Below are a few examples to illustrate how the scoring system works in the knockout stages.

// A/

// I predict Uruguay-Argentina 2-0.

// Results : 1-1 after 120 minutes, Uruguay wins in PKs.

// I predicted Uruguay as a winner, but I have the wrong score. I collect 5 points.



// B/

// I predict Uruguay-Argentina 2-0.

// Results : 2-0 after 90 minutes, Uruguay wins.

// I have the exact score. I collect 10 points.



// C/

// I predict Uruguay-Argentina 1-1 and Uruguay as an winner.

// Results : a draw 1-1 after 90 minutes. Uruguay wins in overtime 2-1.

// I have the right score after 90 minutes, but only the final score matters! I collect 5 points for predicting the correct winner.



// D/

// I predict Uruguay-Argentina 1-1 and Uruguay as an winner.

// Results : a draw 1-1 after overtime. Uruguay wins in PKs.

// I have the right score after overtime. I collect 10 points. On top of that I collect 5 points for predicting the correct winner, for a total of 15 points!



// E/

// I predict Uruguay-Argentina 1-1 and Uruguay as an winner.

// Results : a draw, 0-0 after overtime. Uruguay wins in PKs.

// I have predicted a draw, but the wrong score. I collect 3 points.
// As I didn't predict the correct winner, I only collect 3 points.
