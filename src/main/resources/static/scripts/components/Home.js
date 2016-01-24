/*
    Home
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import ArticleList from './ArticleList';
import client from '../client';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {articles: [],
		              blogProfile: {}
		              };
	}

	componentDidMount() {
		client({method: 'GET', path: 'http://localhost:8080/api/articles'}).done(response => {
			this.setState({articles: response.entity._embedded.articles});
		});
		client({method: 'GET', path: 'http://localhost:8080/api/blogProfiles/1'}).done(response => {
        			this.setState({blogProfile: response.entity});
        		});
	}

	render() {
		return (
			<div>
				<Navigation/>
				<Header blogProfile={this.state.blogProfile}/>
				<ArticleList articles={this.state.articles}/>
				<hr/>
				<Footer blogProfile={this.state.blogProfile}/>
			</div>
		)
	}
}

export default Home;