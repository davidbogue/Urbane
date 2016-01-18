'use strict';

// tag::vars[]
var React = require('react');
var ReactDOM = require('react-dom');
var client = require('./client');
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {articles: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/articles'}).done(response => {
			this.setState({articles: response.entity._embedded.articles});
		});
	}

	render() {
		return (
			<ArticleList articles={this.state.articles}/>
		)
	}
}
// end::app[]

// tag::article-list[]
class ArticleList extends React.Component{
	render() {
		var articles = this.props.articles.map(article =>
			<Article key={article._links.self.href} article={article}/>
		);
		return (
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Date</th>
						<th>Author</th>
					</tr>
				</thead>
				<tbody>
					{articles}
				</tbody>
			</table>
		)
	}
}
// end::article-list[]

// tag::article[]
class Article extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.article.title}</td>
				<td>{this.props.article.date}</td>
				<td>{this.props.article.author}</td>
			</tr>
		)
	}
}
// end::article[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
