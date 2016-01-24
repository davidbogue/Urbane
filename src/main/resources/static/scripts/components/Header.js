/*
	Header
*/
import React from 'react';

var Header = React.createClass({
	render: function() {
		var headerStyle = {
              backgroundImage: 'url('+(this.props.blogProfile.backgroundImage || './img/home-bg.jpg')+')'
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

export default Header;