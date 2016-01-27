/*
  Markdown Viewer
*/

import React from 'react';
import Marked, { Renderer } from 'marked';
import client from '../client';
import highlightjs from "highlight.js";



var MarkdownViewer = React.createClass({

    rawMarkup: function() {
        var sampleText='test workds \n```java\n public DatabaseLoader(ArticleRepository repository, BlogProfileRepository blogProfileRepository) {\n        this.blogProfileRepository= blogProfileRepository;\n        this.articleRepository = repository;\n    }\n; \n```';
        var rawMarkup = Marked((this.props.markdownText||''), {sanitize: true});
//        var rawMarkup = Marked((sampleText||''), {sanitize: true});
        return { __html: rawMarkup };
     },

    render : function() {
        const renderer = new Renderer();
        renderer.code = (code, language) => {
          // Check whether the given language is valid for highlight.js.
          const validLang = !!(language && highlightjs.getLanguage(language));
          // Highlight only if the language is valid.
          const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
          // Render the highlighted code with `hljs` class.
          return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
        };
        Marked.setOptions({
          highlight: function (code,lang) {
            return highlightjs.highlightAuto(code).value;
          },
          renderer: renderer
        });
        return(
         <div dangerouslySetInnerHTML={this.rawMarkup()}></div>
        )
    }
});

export default MarkdownViewer;