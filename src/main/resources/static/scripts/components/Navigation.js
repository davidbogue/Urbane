/*
	Navigation
*/

import React from 'react';
import { Link } from 'react-router';

var Navigation = React.createClass({
  getInitialState: function() {
    return { authToken: localStorage.getItem('authtoken') };
  },

  signOut : function(){
    localStorage.removeItem('authtoken');
    this.setState({authToken: null});
  },

	render : function() {
	  var navStyle = {};
    if(this.props.background){
        navStyle={background:this.props.background};
	  }
		return <nav className="navbar navbar-default navbar-custom navbar-fixed-top" style={navStyle}>
                   <div className="container-fluid">

                       <div className="navbar-header page-scroll">
                           <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                               <span className="sr-only">Toggle navigation</span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                           </button>
                           <Link className="navbar-brand" to="/"></Link>
                       </div>

                       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                           <ul className="nav navbar-nav navbar-right">
                               <li> <Link to="/">Home</Link> </li>
                               <li> <AuthenticationLink authtoken={this.state.authToken} signOut={this.signOut}/> </li>
                           </ul>
                       </div>
                   </div>
               </nav>
	}
});

var AuthenticationLink = React.createClass({
  
  render : function(){
    if(this.props.authtoken){
      return(
        <a href='#' onClick={this.props.signOut}>Sign Out</a>
      )
    } else {
      return(
        <Link to="/signin">Sign In</Link>
      )
    }
  }

});

export default Navigation;
