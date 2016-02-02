/*
    Edit Article
*/

import React from 'react';
import client from '../client';
import Navigation from './Navigation';
import Footer from './Footer';
import MarkdownViewer from './MarkdownViewer';
import { History } from 'react-router';

var EditArticle = React.createClass({

    mixins : [History],

    getInitialState: function() {
        return { article: {} };
    },

    // componentWillMount: function(){
    //     if(!localStorage.getItem('authtoken')){
    //         this.history.pushState(null, '/');
    //     }
    // },

    componentDidMount: function() {
        if(this.props.params.articleId){
            client({method: 'GET', path: 'http://localhost:8080/api/articles/'+this.props.params.articleId}).done(response => {
                this.setState({article: response.entity});
                this.refs.title.value = response.entity.title;
                this.refs.imageurl.value = response.entity.backgroundImage;
                this.refs.post.value = response.entity.post;
            });
        }
    },

    handleChange: function() {
        this.state.article.post = this.refs.post.value;
        this.setState({article: this.state.article});
    },

    saveArticle: function(event){
        event.preventDefault();
        this.state.article.title = this.refs.title.value;
        this.state.article.backgroundImage = this.refs.imageurl.value;
        this.state.article.author = localStorage.getItem('username');

        client({
            method: (this.props.params.articleId)?'PUT':'POST',
            path: 'http://localhost:8080/api/articles/'+(this.props.params.articleId || ''),
            entity: this.state.article,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.entity;
        }).done(entity => {console.log(entity);
            this.history.pushState(null, '/');
        });
        
    },

    render : function(){
        return(
        <div>
            <Navigation background="gray"/>
            <article>
                <div className="container" style={{paddingTop:"100px"}}>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                          <form onSubmit={this.saveArticle}>
                            <div className="row">
                                <label>Title</label>
                                <input type="text" className="form-control" placeholder="Title" ref="title" required/>

                                <label>Header Image URL</label>
                                <input type="text" className="form-control" placeholder="url" ref="imageurl"/>

                                <small>Text can be edited using <a href="http://daringfireball.net/projects/markdown/">Markdown</a></small>
                                <textarea cols="93" rows="25" className="form-control" required
                                    onChange={this.handleChange} ref="post" />
                                <br/>
                                <div className="form-group col-xs-12">
                                    <button type="submit" className="btn btn-default">Save</button>
                                </div>
                            </div>
                          </form>
                          <hr/>
                          <h3>Preview</h3>
                          <hr/>
                            <MarkdownViewer markdownText={this.state.article.post}/>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        )
    }
})

export default EditArticle;