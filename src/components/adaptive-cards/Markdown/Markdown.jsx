import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import webexComponentClasses from '../../helpers';

/**
 * Markdown component
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.children  Text to be converted
 * @param {string} [props.className]  Custom CSS class to apply
 * @returns {object} JSX of the element
 */
export default function Markdown({children, className}) {
  const [cssClasses] = webexComponentClasses('markdown', className);
  const markdownIt = useMemo(() => new MarkdownIt('zero').enable(
    [
      // https://github.com/markdown-it/markdown-it/issues/289
      'emphasis',
      'escape',
      'link',
      'list',
      'newline',
      'normalize',
      'paragraph',
      'strikethrough',
    ],
  ), []);
  let html = markdownIt.render(children);

  if (html.startsWith('<p>') && html.indexOf('</p>') === html.length - 5) {
    html = html.slice(3, -5);
  }

  return (
    <div className={cssClasses} dangerouslySetInnerHTML={{__html: html}} />
  );
}

Markdown.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

Markdown.defaultProps = {
  children: '',
  className: '',
};
