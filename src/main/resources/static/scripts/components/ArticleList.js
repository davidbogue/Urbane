/*
    Article List
*/

import React from 'react';
import ReactDOM  from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import ArticleSummary from './ArticleSummary';
import client from '../client';
import { Link } from 'react-router';

class ArticleList extends React.Component{

    constructor(props) {
    		super(props);
    		this.state = {articles: [],
    		              nextPage: '',
    		              previousPage: ''};
    }

    loadFromServer(page){
        console.log('calling get article in load from server');
	    client({method: 'GET', path: 'http://localhost:8080/api/articles?sort=id,desc&size=10&page='+page}).done(response => {
        			this.setState({articles: response.entity._embedded.articles});
        			var nextPageNumber = (response.entity._links.next ) ? ++page : '';
        			this.setState({nextPage: nextPageNumber})
        		});
	}

    componentWillReceiveProps(nextProps) {
        console.log('calling get article componentWillReceiveProps');
        this.loadFromServer((nextProps.pageNumber || '0'));
    }

    componentDidUpdate() {
      if(this.props.pageNumber){
          ReactDOM.findDOMNode(this).scrollIntoView();;
      }
    }

	render() {
		var articles = this.state.articles.map(article =>
			<ArticleSummary key={article._links.self.href} article={article}/>
		);
		return (
			<div className="container">
			    <div className="row" >
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <CSSTransitionGroup
                              component="div"
                              transitionName="example"
                              transitionEnterTimeout={600}
                              transitionLeaveTimeout={1}
                            >
            			{articles}
            			</CSSTransitionGroup>
                        <ArticlePager nextPage={this.state.nextPage}/>
                    </div>
                </div>
            </div>
		)
	}
}

var ArticlePager = React.createClass({
    render :  function(){
        var nextPage = this.props.nextPage;
        var linkHtml;
        if (nextPage) {
            linkHtml =<ul className="pager">
                          <li className="next">
                              <Link to={"/page/"+nextPage}>Older Posts &rarr;</Link>
                          </li>
                      </ul>
        }
        return  <span>{linkHtml}</span>;
    }
});

export default ArticleList;
