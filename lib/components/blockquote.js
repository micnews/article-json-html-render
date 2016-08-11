import React from 'react';

function setupBlockquote({ blockList }) {
  function makeBlockquote({ items }) {
    return <blockquote>{blockList(items)}</blockquote>;
  }

  makeBlockquote.propTypes = {
    items: React.PropTypes.array.isRequired
  };

  return makeBlockquote;
}

export default setupBlockquote;
