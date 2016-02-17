import { element } from 'deku';

const setup = ({ blockList }) => {
  return {
    render: ({ props: {items} }) => <article>{blockList(items)}</article>
  };
};

export default setup;
