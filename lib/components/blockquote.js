import element from 'magic-virtual-element';

const setup = ({blockList}) => ({
  render: ({props: {items}}) => <blockquote>{blockList(items)}</blockquote>
});

export default setup;
