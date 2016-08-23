import element from 'magic-virtual-element';
import assert from 'assert';

const setup = ({renderText}) => ({
  render: ({props: {items, level}}) => {
    const inner = renderText(items);

    assert(level >= 1 && level <= 6);

    switch (level) {
      case 1: return <h1>{inner}</h1>;
      case 2: return <h2>{inner}</h2>;
      case 3: return <h3>{inner}</h3>;
      case 4: return <h4>{inner}</h4>;
      case 5: return <h5>{inner}</h5>;
      case 6: return <h6>{inner}</h6>;
    }
  }
});

export default setup;
