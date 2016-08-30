import element from 'magic-virtual-element';

const setup = ({blockList}) => ({
  render: ({props: {items, articleProps = {}}}) => <article {...articleProps}>{blockList(items)}</article>
});

export default setup;
