/*
  View Article
*/

import React from 'react';
import client from '../client';
import Navigation from './Navigation';
import Footer from './Footer';
import MarkdownViewer from './MarkdownViewer';


var Article = React.createClass({

    getInitialState: function() {
		return { article: {}, blogProfile: {} };
	},

	componentDidMount: function() {
		client({method: 'GET', path: 'http://localhost:8080/api/articles/'+this.props.params.articleId}).done(response => {
			this.setState({article: response.entity});
		});
		client({method: 'GET', path: 'http://localhost:8080/api/blogProfiles/1'}).done(response => {
            this.setState({blogProfile: response.entity});
        });
	},

    saveArticle: function(){

    },
    
    render : function() {
         return(
            <div>
                <Navigation/>
                <ArticleHeader article={this.state.article}/>
            	<article>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <MarkdownViewer markdownText={this.state.article.post}/>
                            </div>
                        </div>
                    </div>
                </article>
            	<Footer blogProfile={this.state.blogProfile}/>
            </div>
            )
    }
});

var ArticleHeader = React.createClass({
    render :  function(){
        var headerStyle = {
                  backgroundImage: 'url('+(this.props.article.backgroundImage || '/img/default-post-bg.jpg')+')'
                };
        return (
            <header className="intro-header" style={headerStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <div className="post-heading">
                                <h1>{this.props.article.title}</h1>
                                <h2 className="subheading"></h2>
                                <span className="meta"> - {this.props.article.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
});

export default Article;