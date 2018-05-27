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
    render() {
        if (!this.props.isFetched) {
            return <Typography variant="caption">Loading...</Typography>

        }
        let groupKeys = _.keys(this.props.matches.groups);
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="display2" gutterBottom>Groups Phase</Typography>
                {groupKeys.map(this.renderGroupSection)}
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
            </div >

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

GroupPhaseContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GroupPhaseContainer));

