import element from 'magic-virtual-element';

const setup = ({renderText}) => ({
  render: ({props: {items}}) => <p>{renderText(items)}</p>
});

export default setup;
