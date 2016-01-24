/*
 Social Link
 */

import React from 'react';

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

export default SocialLink;