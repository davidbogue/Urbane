/*
	Article Summary
*/
import React from 'react';

var ArticleSummary = React.createClass({
	render : function() {
		return (
			<div className="post-preview">
				<a href={"article/"+ this.props.article._links.self.href.split('/').pop()}>
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

export default ArticleSummary;