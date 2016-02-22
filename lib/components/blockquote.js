import {element} from 'deku';

const setup = ({blockList}) => ({
  render: ({props: {items}}) => <blockquote>{blockList(items)}</blockquote>
});

export default setup;
