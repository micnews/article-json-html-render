import setupArticle from 'article-json-html-render';
import setupArticleToHtml from 'article-json-html-render/html';
import {element, string} from 'deku';

const items = [
  {type: 'paragraph', children: [{content: 'foo'}]},
  {type: 'embed', embedType: 'image', src: 'http://example.com/image.jpg'}
];

// Render into Deku component tree
const Article = setupArticle({
  embeds: {
    image: embed => <img src={embed.src} />
  }
});

console.log(string.render(<Article items={items} />));

// Render into html
const renderHtml = setupArticleToHtml();
console.log(renderHtml(items));
