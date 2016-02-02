/*
	Article Summary
*/
import React from 'react';
import MarkdownViewer from './MarkdownViewer';
import { Link } from 'react-router';

var ArticleSummary = React.createClass({

	renderEditLink : function(){
		if(localStorage.getItem('authtoken')){
			return(
				<Link to={"/editarticle/"+ this.props.article._links.self.href.split('/').pop()}>
					<span className="label label-default" style={{float:'right'}}>Edit</span>
				</Link>
			)
		}
		return <span>no auth token</span>;
	},

	render : function() {
		var postSummary = (this.props.article.post.split("\n").shift()+"..." || '');
		var editLink = '';
		if(localStorage.getItem('authtoken')){
			editLink=
				<Link to={"/editarticle/"+ this.props.article._links.self.href.split('/').pop()}>
					<span className="label label-default" style={{float:'right'}}>Edit</span>
				</Link>;
			;
		}
		return (
			<div className="post-preview">
				{editLink}
				<Link to={"/article/"+ this.props.article._links.self.href.split('/').pop()}>
					<h2 className="post-title">
						{this.props.article.title}
					</h2>
					<h3 className="post-subtitle">
						<MarkdownViewer markdownText={postSummary}/>
					</h3>
				</Link>

				<p className="post-meta">- {this.props.article.author}</p>
				<hr/>
			</div>
		)
	}
});


export default ArticleSummary;