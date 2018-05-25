import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

// import './GroupPhaseContainer.scss';



import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';




const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: '100%',

    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,
        'border-radius': '0px'
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


class CenterContainer extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
        }
    }



    componentDidMount() {


    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container

                    className={classes.demo}
                    alignItems="stretch"
                    justify="center">
                    <Grid item xs={12} md={8}>
                        {this.props.children}
                    </Grid>
                </Grid>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        
    };
}

CenterContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CenterContainer));

