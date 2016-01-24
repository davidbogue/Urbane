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
                           <a className="navbar-brand" href="/"></a>
                       </div>

                       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                           <ul className="nav navbar-nav navbar-right">
                               <li> <a href="/">Home</a> </li>
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
                                   <h1>{this.props.blogProfile.title}</h1>
                                   <hr className="small"/>
                                   <span className="subheading">{this.props.blogProfile.subTitle}</span>
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
	    var githubUrl = this.props.blogProfile.githubUrl;
	    var twitterUrl = this.props.blogProfile.twitterUrl;
	    var linkedInUrl = this.props.blogProfile.linkedInUrl;

		return <footer>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                      <ul className="list-inline text-center">
                        <li>
                          <SocialLink socialNetwork="github" socialUrl={githubUrl}/>
                        </li>
                        <li>
                          <SocialLink socialNetwork="twitter" socialUrl={twitterUrl}/>
                        </li>
                        <li>
                          <SocialLink socialNetwork="linkedin" socialUrl={linkedInUrl}/>
                        </li>
                      </ul>
                      <p className="copyright text-muted">Powered by <a href="https://github.com/davidbogue/Urbane">Urbane</a> </p>
                    </div>
                  </div>
                </div>
               </footer>
	}
});

/*
 Social Link
 */
var SocialLink = React.createClass({
    render: function(){
        var socialNetwork = this.props.socialNetwork;
        var url = this.props.socialUrl;

        var linkHtml;
        if (url) {
            linkHtml =<a href={url}>
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className={"fa fa-"+socialNetwork+" fa-stack-1x fa-inverse"}></i>
                      </span>
                    </a>
        }
        return <span>{linkHtml}</span>;
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