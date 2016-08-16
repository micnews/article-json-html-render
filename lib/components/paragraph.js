import React from 'react';
import text from '../text';

const render = ({ items }) => <p>{text(items)}</p>;

render.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default render;
