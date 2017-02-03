import { renderString, tree, element } from './deku';

export default (setupArticle) => {
  return (opts = {}) => {
    const Article = setupArticle(opts);

    return (json) => renderString(tree(<Article items={json || []} />))
      .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
  };
};
