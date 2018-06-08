import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    root: {
        flexGrow: 1,
        'margin-top': '2em',
    },
    tabContainer: {
        'margin': '2em'
    }
});


class RulesKnockoutExamples extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            selectedTab: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Tab0" />
                        <Tab label="Tab1" />
                        <Tab label="Tab2" />
                        <Tab label="Tab3" />
                    </Tabs>
                </Paper>
                {this.state.selectedTab === 0 &&
                    <div className={classes.tabContainer}>
                        <Typography>Tab 0 </Typography>

                    </div>
                }
                {this.state.selectedTab === 1 &&
                    <div className={classes.tabContainer}>
                        <Typography>Tab 1 </Typography>
                    </div>
                }
                {this.state.selectedTab === 2 &&
                    <div className={classes.tabContainer}>
                        <Typography>Tab 2 </Typography>
                    </div>
                }
                {this.state.selectedTab === 3 &&
                    <div className={classes.tabContainer}>
                        <Typography>Tab 3 </Typography>
                    </div>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // selectedPhase: matchesSelectors.getSelectedTab(state)
    };
}

RulesKnockoutExamples.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(RulesKnockoutExamples));
