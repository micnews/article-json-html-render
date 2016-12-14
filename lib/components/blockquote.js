import element from 'magic-virtual-element';

const setup = ({blockList}) => ({
  render: ({props: {items, pullQuote}}) => <blockquote class={pullQuote && 'q'}>{blockList(items)}</blockquote>
});

export default setup;
