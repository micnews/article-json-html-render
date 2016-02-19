import { element } from 'deku';

const setup = ({blockList}) => ({
  render: ({ props }) => {
    const { items } = props;
    return <blockquote>{blockList(items)}</blockquote>;
  }
});

export default setup;
