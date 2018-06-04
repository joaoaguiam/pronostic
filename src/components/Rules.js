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

                    {/* For more details about the typography: https://material-ui.com/style/typography/ */}
                    <Grid container
                    spacing={24}
                    alignItems={alignItems}
                    direction="row"
                    justify={justify}>
                     <Grid item xs={12}
                     alignItems={alignItems}
                     direction={direction}
                     justify={justify}>
                       <Paper className={classes.paper}>
                       <Typography variant="display1">Contest Rules</Typography>
                       <br /><br />
                       <Typography>
                       <p>This is a winner-take-all type of contest.</p>
                       Each participant stakes Ether to enter the contest. The amount to be staked is a fixed Ether value of (how to retrieve the contract value?)
                        </Typography>
                       <br /><br />
                       </Paper>
                     </Grid>
                     </Grid>


                   <Grid item xs={6}
                   alignItems={alignItems}
                   direction={direction}
                   justify={justify}>
                     <Paper className={classes.paper}>
                     <Typography variant="title">Group stage :</Typography>
                     <Typography>
                     <p>10 points if you predict the exact score</p>
                     <p>5 points if you predict the winner</p>
                     <p>3 points if you predict a draw</p>
                     <p>0 point for a wrong prediction</p>
                     </Typography>
                     </Paper>
                   </Grid>

                   <Grid item xs={6}>
                     <Paper className={classes.paper}>

                     <Typography variant="title">Knockout stages:</Typography>
                     <Typography>
                     For the knockout stage the scoring is slightly different from the group stage.
                     Thus you will need to predict the final score (before the PKs) AND the winning team.
                     Where things are different is if you predict a draw. Because then you can get points for predicting the correct score AND points for predicting the correct winner.
                     Below are a few examples to illustrate how the scoring system works in the knockout stages.
                     </Typography>
                     </Paper>
                   </Grid>



          <Grid container spacing={24}>
           <Grid item xs={6}>
             <Paper className={classes.paper}>
             <p>I predict Uruguay-Argentina 2-0.</p>
             <p>Results : 1-1 after 120 minutes, Uruguay wins in PKs.</p>
            I predicted Uruguay as a winner, but I have the wrong score. I collect 5 points.
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
             I have the right score after 90 minutes, but only the final score matters! I collect 5 points for predicting the correct winner.
             </Paper>
             </Grid>
             <Grid item xs={6}>
             <Paper className={classes.paper}>
             <p>I predict Uruguay-Argentina 1-1 and Uruguay as an winner.</p>
             <p>Results : a draw 1-1 after overtime. Uruguay wins in PKs.</p>
             I have the right score after overtime. I collect 10 points. On top of that I collect 5 points for predicting the correct winner, for a total of 15 points!
             </Paper>
             </Grid>
             <Grid item xs={6}>
             <Paper className={classes.paper}>
             <p>I predict Uruguay-Argentina 1-1 and Uruguay as an winner.</p>
             <p>Results : a draw, 0-0 after overtime. Uruguay wins in PKs.</p>
             I have predicted a draw, but the wrong score. I collect 3 points.
             As I did not predict the correct winner, I only collect 3 points.
             </Paper>
             </Grid>
             </Grid>
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
