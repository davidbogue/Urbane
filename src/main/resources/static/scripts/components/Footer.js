/*
	Footer
*/

import React from 'react';
import SocialLink from './SocialLink';

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

export default Footer;