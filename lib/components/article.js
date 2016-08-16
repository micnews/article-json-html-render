import element from 'magic-virtual-element';

const setup = ({blockList}) => ({
  render: ({props: {items}}) => <article>{blockList(items)}</article>
});

export default setup;
