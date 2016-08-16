import React from 'react';

function setupArticle({ blockList }) {
  function makeArticle({ items }) {
    return <article>{blockList(items)}</article>;
  }

  makeArticle.propTypes = {
    items: React.PropTypes.array.isRequired
  };

  return makeArticle;
}

export default setupArticle;
