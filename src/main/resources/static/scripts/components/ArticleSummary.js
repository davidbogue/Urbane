/*
	Article Summary
*/
import React from 'react';
import MarkdownViewer from './MarkdownViewer';
import { Link } from 'react-router';

var ArticleSummary = React.createClass({
	render : function() {
		var postSummary = (this.props.article.post.split("\n").shift()+"..." || '');
		return (
			<div className="post-preview">
				<Link to={"article/"+ this.props.article._links.self.href.split('/').pop()}>
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