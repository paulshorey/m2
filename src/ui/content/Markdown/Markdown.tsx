import MarkdownIt from 'markdown-it';
import React, { memo } from 'react';
import HtmlToReact from '../HtmlToReact';
import hljs from 'highlight.js';
import CodeBlock from '@techytools/uui/components/v0/content/CodeBlock';

/**
 * Usage: markdownToHTML.render(str)
 */
const markdownToHTML = MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: false,
  xhtmlOut: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  },
});

const Markdown = ({ debug = false, className = '', str = '' }) => {
  let markdownString = str
    // .replace(/<br \/>/g, '') // remove <br /> tags
    // .replace(/</g, '&lt;') // show other HTML tags
    .replace(/^( {2})/gm, ''); // hide first 2 spaces of all indentation

  let markdownGithub = markdownString
    // .replace(/<br \/>/g, '') // remove <br /> tags
    // .replace(/</g, '&lt;') // show other HTML tags
    .replace(/^[\s\n\r]+/gm, '') // remove lines with only spaces
    .replace(/(?<!>)\n/g, '  \n'); // add 2 spaces to end of each line
  return (
    <div className={'Markdown ' + className}>
      <HtmlToReact str={markdownToHTML.render(markdownGithub)} />
      {debug && (
        <div>
          <h3>Markdown string:</h3>
          <CodeBlock value={markdownString} />
        </div>
      )}
    </div>
  );
};

export default memo(Markdown);
