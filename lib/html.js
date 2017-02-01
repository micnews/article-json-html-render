import { renderString, tree, element } from './deku';
import setupArticle from './';

module.exports = (opts = {}) => {
  const Article = setupArticle(opts);

  return (json) => renderString(tree(<Article items={json || []} />))
    .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
};
