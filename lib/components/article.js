import {element} from 'deku';

const setup = ({blockList}) => ({
  render: ({props: {items}}) => <article>{blockList(items)}</article>
});

export default setup;
