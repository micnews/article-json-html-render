/* eslint-disable  */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import setupArticle from 'article-json-html-render';

const makeImage = embed => <img src={embed.src} />;

makeImage.propTypes = {
  src: React.PropTypes.string.isRequired
};

const Article = setupArticle({
  embeds: {
    image: makeImage
  }
});

const items = [
  { type: 'paragraph', children: [{content: 'foo'}] },
  { type: 'embed', embedType: 'image', src: 'http://example.com/image.jpg' }
];

console.log(renderToStaticMarkup(<Article items={items} />));
