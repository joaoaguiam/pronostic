import React, { Component } from 'react'

// import Foundation from 'react-foundation';

// import { Link } from 'react-router'
// import 'normalize.css';
// import Header from './components/header/Header'
// import SideBar from './layouts/sidebar/SideBar'

// Styles
import 'font-awesome/css/font-awesome.css';
// import 'font-awesome/scss/font-awesome.scss';

import '../lib/font-awesome/web-fonts-with-css/css/fontawesome-all.css';


import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// import 'foundation-sites/dist/css/foundation.min.css';
// import 'foundation-sites/dist/js/foundation.min.js';
// import NotificationGenerator from './layouts/notifications/NotificationGenerator';

import './App.scss'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

class App extends Component {
    render() {


        return (
            <div className="app">
                
                {this.props.children}
                <div className="hands-bg">

                </div>
                {/* <Footer /> */}
                {/* <Header />
        
            {this.props.children}

        
        <div className="center-content">
          <div className="main-view">
        
            {this.props.children}
          </div>
        </div> */}
            </div>
        );
    }
}

export default App
