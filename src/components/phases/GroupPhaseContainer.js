import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';


import * as matchesSelectors from '../../store/matches/reducer';
import * as matchesActions from '../../store/matches/actions';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';



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

    renderGroupSection(groupKey) {
        const { classes } = this.props;

        let group = this.props.matches.groups[groupKey];
        let matches = group.matches;
        let bets = this.props.bets;
        // if(bets !== undefined) {
        //     console.log(bets);
        //     debugger;
        // }
        let container = this;
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

GroupPhaseContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GroupPhaseContainer));

