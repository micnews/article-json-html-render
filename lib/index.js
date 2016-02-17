import { element } from 'deku';
import setupArticle from './components/article';
import setupBlocklist from './block-list';
import setupEmbed from './components/embed';

const setup = opts => {
  const Embed = setupEmbed(opts);
  const blockList = setupBlocklist({
    Embed
  });
  const Article = setupArticle({
    blockList
  });

  return Article;
};

module.exports = setup;
