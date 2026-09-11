import React from 'react';
import {create, act} from 'react-test-renderer';
import DOMPurify from 'dompurify';
import Markdown from './Markdown';

function renderMarkdown(children) {
  let renderer;

  act(() => {
    renderer = create(<Markdown>{children}</Markdown>);
  });

  return renderer;
}

function getHtml(renderer) {
  // eslint-disable-next-line no-underscore-dangle
  return renderer.root.findByType('div').props.dangerouslySetInnerHTML.__html;
}

describe('Markdown', () => {
  describe('AC-7: DOMPurify sanitization', () => {
    test('malicious img onerror attribute is not executable in output', () => {
      // markdown-it entity-encodes raw HTML; DOMPurify ensures no actual attribute survives
      const renderer = renderMarkdown('<img src="x" onerror="alert(1)">');
      const html = getHtml(renderer);

      // No actual <img element with onerror attribute (unencoded)
      expect(html).not.toMatch(/<img[^>]*onerror/i);
    });

    test('script tag payload is not executable in output', () => {
      const renderer = renderMarkdown('<script>evil()</script>safe text');
      const html = getHtml(renderer);

      // No actual <script> element (unencoded tag opener)
      expect(html).not.toMatch(/<script/i);
    });

    test('rendered output is the DOMPurify-sanitized string, not raw markdown-it output', () => {
      const sanitizeSpy = jest.spyOn(DOMPurify, 'sanitize').mockReturnValue('<p>SANITIZED-MARKER</p>');

      const renderer = renderMarkdown('**bold**');
      const html = getHtml(renderer);

      expect(sanitizeSpy).toHaveBeenCalled();
      expect(html).toContain('SANITIZED-MARKER');
      sanitizeSpy.mockRestore();
    });

    test('supported emphasis formatting preserved', () => {
      const renderer = renderMarkdown('**bold** and *italic*');
      const html = getHtml(renderer);

      expect(html).toMatch(/<strong>/i);
      expect(html).toMatch(/<em>/i);
    });

    test('supported link formatting preserved', () => {
      const renderer = renderMarkdown('[link text](https://example.com)');
      const html = getHtml(renderer);

      expect(html).toMatch(/<a /i);
      expect(html).toMatch(/href="https:\/\/example\.com"/i);
    });

    test('supported list formatting preserved', () => {
      const renderer = renderMarkdown('- item one\n- item two');
      const html = getHtml(renderer);

      expect(html).toMatch(/<ul>/i);
      expect(html).toMatch(/<li>/i);
    });

    test('strikethrough formatting preserved', () => {
      const renderer = renderMarkdown('~~strike~~');
      const html = getHtml(renderer);

      expect(html).toMatch(/<s>/i);
    });
  });
});
