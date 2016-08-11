import React from 'react';
import assert from 'assert';
import text from '../text';

const render = ({ items, level }) => {
  const inner = text(items);

  assert(level >= 1 && level <= 6);

  switch (level) {
    case 1: return <h1>{inner}</h1>;
    case 2: return <h2>{inner}</h2>;
    case 3: return <h3>{inner}</h3>;
    case 4: return <h4>{inner}</h4>;
    case 5: return <h5>{inner}</h5>;
    case 6: return <h6>{inner}</h6>;
    default: return '';
  }
};

render.propTypes = {
  items: React.PropTypes.array.isRequired,
  level: React.PropTypes.number.isRequired
};

export default render;
