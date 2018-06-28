import React, { Component } from 'react'
import { connect } from 'react-redux';

// import Foundation from 'react-foundation';

// import { Link } from 'react-router'
// import 'normalize.css';
// import Header from './components/header/Header'
// import SideBar from './layouts/sidebar/SideBar'

// Styles
// import 'font-awesome/css/font-awesome.css';
// import 'font-awesome/scss/font-awesome.scss';

import '../lib/font-awesome/web-fonts-with-css/css/fontawesome-all.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

// import 'foundation-sites/dist/css/foundation.min.css';
// import 'foundation-sites/dist/js/foundation.min.js';

import './App.scss'
import Header from './components/header/Header';
import * as userProfileActions from './store/user-profile/actions';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import NotificationSnackbar from './components/notifications/NotificationSnackbar';
import Footer from './components/Footer';
import { isWeb3Available } from './helpers/web3/Web3Helper';
import Web3NotAvailable from './components/Web3NotAvailable';

const theme = createMuiTheme({
    palette: {
        // primary: {
        //     // light: will be calculated from palette.primary.main,
        //     main: '#41308F'
        // },
        // secondary: {
        //     // light: will be calculated from palette.primary.main,
        //     main: '#B0E44F'
        // }
    },
    // overrides: {
    //     // Name of the component ⚛️ / style shee
    //     MuiButton: {
    //         // Name of the rule
    //         root: {
    //             // Some CSS
    //             // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //             // borderRadius: '1.5625em',
    //             // border: 0,
    //             // color: 'white',
    //             // height: 48,
    //             // padding: '0 30px',
    //             // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
    //         },
    //     },
    //     MuiDialogActions: {
    //         root: {
    //             padding: "24px",
    //             margin: 0,
    //             'justify-content': 'center',
    //             'border-top': '1px solid #8C8C8C',
    //         }
    //     },
    //     MuiPaper: {
    //         rounded: {
    //             borderRadius: '1.5625em',
    //         }
    //     }
    // },
});

const styles = theme => ({
    bottomBar: {
        position: '',
        bottom: 0,
        left: 0,
        right: 0,
    }

});

class App extends Component {

    componentDidMount() {
        if (isWeb3Available()) {
            this.props.dispatch(userProfileActions.fetchEthereumAccount());
        }
    }

    render() {

        let hasWeb3 = isWeb3Available();
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Header routeParams={this.props.routeParams} />
                    <NotificationSnackbar />
                    {!hasWeb3 && <Web3NotAvailable />}

                    {hasWeb3 && this.props.children}

                    <Footer />
                    {/* <BottomNavigation
                        value={0}
                        // onChange={this.handleChange}
                        showLabels
                        className={this.props.classes.bottomBar}
                    >
                                        <Typography>Participation Fee</Typography>

                        
                    </BottomNavigation> */}
                </div>
            </MuiThemeProvider>

        );
    }
}

function mapStateToProps(state) {
    return {
        //
    };
};


App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(App));

