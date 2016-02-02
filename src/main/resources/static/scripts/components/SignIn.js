/*
	Sign In
*/

import React from 'react';
import client from '../client';
import MarkdownViewer from './MarkdownViewer';
import ReactRouter from 'react-router';
import { History } from 'react-router';

var SignIn = React.createClass({
	mixins : [History],

	getInitialState: function() {
        return { errorMessage: '' };
    },

   authUser : function(event) {
	    event.preventDefault();
	    // get the data from the input
	    var email = this.refs.email.value;
	    var password = this.refs.password.value;
	    client({
            method: 'POST',
            path: 'http://localhost:8080/api/userauth',
            params: {'email':email,'password':password},
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.entity;
        }).done(entity => { 
        	if(entity.success){
        		this.state.errorMessage='';
        		localStorage.setItem('authtoken',entity.sessionToken);
        		localStorage.setItem('username',entity.userName);
        		this.history.pushState(null, '/');
        	} else{
        		this.setState({errorMessage: 'Incorrect email or password entered. Please try again.'});
        	}
        	console.log(entity)
        });
    },

	render : function() {
		var errorDiv = '';
		if(this.state.errorMessage){ 
			errorDiv=<div className="alert alert-danger" role="alert">{this.state.errorMessage}</div> 
		}
		return(
				<div>
				    <div className="container">
				        <div className="row">
				            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 text-center">
				                <h1 style={{fontSize:'50px',padding:'40px'}}>Sign In</h1>
				                {errorDiv}
				                <form onSubmit={this.authUser}>
				                    <div className="row control-group">
				                        <div className="form-group col-xs-12 floating-label-form-group controls">
				                            <label>Email Address</label>
				                            <input type="email" className="form-control" placeholder="Email Address" ref="email"required/>
				                            <p className="help-block text-danger"></p>
				                        </div>
				                    </div>
				                    <div className="row control-group">
				                        <div className="form-group col-xs-12 floating-label-form-group controls">
				                            <label>Password</label>
				                            <input type="password" className="form-control" placeholder="Password" ref="password" required />
				                            <p className="help-block text-danger"></p>
				                        </div>
				                    </div>
				                    <br/>
				                    <div className="row">
				                        <div className="form-group col-xs-12">
				                            <button type="submit" className="btn btn-default">Sign In</button>
				                        </div>
				                    </div>
				                </form>
				            </div>
				        </div>
				    </div>
				</div>
			)
	}

});

export default SignIn;