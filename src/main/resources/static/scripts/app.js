'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var client = require('./client');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');


// tag::home[]
class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {articles: []};
	}

	componentDidMount() {
		client({method: 'GET', path: 'http://localhost:8080/api/articles'}).done(response => {
			this.setState({articles: response.entity._embedded.articles});
		});
	}

	render() {
		return (
			<div>
				<Navigation/>
				<Header/>
				<ArticleList articles={this.state.articles}/>
				<hr/>
				<Footer/>
			</div>
		)
	}
}
// end::home[]

// tag::article-list[]
class ArticleList extends React.Component{
	render() {
		var articles = this.props.articles.map(article =>
			<ArticleSummary key={article._links.self.href} article={article}/>
		);
		return (
			<div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            			{articles}
                        <ul className="pager">
                            <li className="next">
                                <a href="#">Older Posts &rarr;</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
		)
	}
}
// end::article-list[]

/*
	Article Summary
*/
var ArticleSummary = React.createClass({
	render : function() {
		return (
			<div className="post-preview">
				<a href='article/{this.props.article.id}'>
					<h2 className="post-title">
						{this.props.article.title}
					</h2>
					<h3 className="post-subtitle">
						{this.props.article.post}
					</h3>
				</a>
				<p className="post-meta">Posted by {this.props.article.author} on {this.props.article.date}</p>
				<hr/>
			</div>
		)
	}
});



/*
  View Article
*/
var Article = React.createClass({
  render : function() {
    return <h1>Article View</h1>
  }
});


/*
	Navigation

*/
var Navigation = React.createClass({
	render : function() {
		return <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
                   <div className="container-fluid">

                       <div className="navbar-header page-scroll">
                           <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                               <span className="sr-only">Toggle navigation</span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                           </button>
                           <a className="navbar-brand" href="index.html">Start Bootstrap</a>
                       </div>

                       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                           <ul className="nav navbar-nav navbar-right">
                               <li> <a href="index.html">Home</a> </li>
                               <li> <a href="#">About</a> </li>
                               <li> <a href="#">Sign In</a> </li>
                           </ul>
                       </div>
                   </div>
               </nav>
	}
});

/*
	Header
*/
var Header = React.createClass({
	render: function() {
		var headerStyle = {
              backgroundImage: 'url(img/home-bg.jpg)'
            };
		return  <header className="intro-header" style={headerStyle}>
                   <div className="container">
                       <div className="row">
                           <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                               <div className="site-heading">
                                   <h1>Clean Blog</h1>
                                   <hr className="small"/>
                                   <span className="subheading">A Clean Blog Theme by Start Bootstrap</span>
                               </div>
                           </div>
                       </div>
                   </div>
               </header>
	}
});

/*
	Footer
*/
var Footer = React.createClass({
	render: function(){
		return <footer>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <ul className="list-inline text-center">
                        <li>
                          <a href="#">
                            <span className="fa-stack fa-lg">
                              <i className="fa fa-circle fa-stack-2x"></i>
                              <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="fa-stack fa-lg">
                              <i className="fa fa-circle fa-stack-2x"></i>
                              <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                            </span>
                          </a>
                        </li>
                      </ul>
                      <p className="copyright text-muted">Powered by Urbane </p>
                    </div>
                  </div>
                </div>
               </footer>
	}
});

/*
  Not Found
*/
var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
});


/*
  Routes
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Home}/>
    <Route path="/article/:articleId" component={Article}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.getElementById('react'));