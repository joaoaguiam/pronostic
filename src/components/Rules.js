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

 

