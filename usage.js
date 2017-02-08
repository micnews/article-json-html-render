import setupArticle from 'article-json-html-render';
import {element, string} from 'deku';

const Article = setupArticle({
  embeds: {
    image: embed => <img src={embed.src} />
  }
});

const items = [
  {type: 'paragraph', children: [{content: 'foo'}]},
  {type: 'embed', embedType: 'image', src: 'http://example.com/image.jpg'}
];

console.log(string.render(<Article items={items} />));
