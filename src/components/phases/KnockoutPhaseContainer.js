import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';


import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


import 'flag-icon-css/css/flag-icon.css';

import _ from 'lodash';
import PhaseMatches from '../phases/PhaseMatches';


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
});

class KnockoutPhaseContainer extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        }
    }

    render() {
        if (!this.props.isFetched) {
            return <Typography variant="caption">Loading...</Typography>

        }
        const { classes } = this.props;
        let matches = this.props.matches.knockout[this.props.subPhase].matches;

        return (

            <div className={classes.root}>
                <Typography variant="display2" gutterBottom>{this.props.title}</Typography>
                <PhaseMatches matches={matches} phase="knockout" subPhase={this.props.subPhase} isKnockout/>
                <Grid container className={classes.btnContainer}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={16}
                            // className={classes.demo}
                            // alignItems={alignItems}
                            // direction={direction}
                            justify={"flex-end"}
                        >
                            <Grid item>
                                <Button variant="raised" color="primary">Submit to Blockchain</Button>
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
        isFetched: matchesSelectors.isFetched(state)
    };
}

KnockoutPhaseContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(KnockoutPhaseContainer));

