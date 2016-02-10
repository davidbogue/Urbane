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

	componentWillMount() {
		client({method: 'GET', path: 'http://localhost:8080/api/blogProfiles/1'}).done(response => {
        			this.setState({blogProfile: response.entity});
        		});
	}

	render() {
		return (
			<div>
				<Navigation/>
				<Header blogProfile={this.state.blogProfile}/>
				<ArticleList pageNumber={this.props.params.pageNumber}/>
				<hr/>
				<Footer blogProfile={this.state.blogProfile}/>
			</div>
		)
	}
}

export default Home;