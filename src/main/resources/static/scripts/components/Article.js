/*
  View Article
*/

import React from 'react';
import client from '../client';
import Navigation from './Navigation';
import Footer from './Footer';

var Article = React.createClass({

    getInitialState: function() {
		return { article: {}, blogProfile: {} };
	},

	componentDidMount: function() {
		client({method: 'GET', path: 'http://localhost:8080/api/articles/1'}).done(response => {
			this.setState({article: response.entity});
		});
		client({method: 'GET', path: 'http://localhost:8080/api/blogProfiles/1'}).done(response => {
            this.setState({blogProfile: response.entity});
        });
	},

    render : function() {
         return(
            <div>
                <Navigation/>
                <h1>article</h1>
            	<hr/>
            	<Footer blogProfile={this.state.blogProfile}/>
            </div>
            )
    }
});

export default Article;