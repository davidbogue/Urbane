/*
    Article List
*/

import React from 'react';
import ArticleSummary from './ArticleSummary';

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

export default ArticleList;
