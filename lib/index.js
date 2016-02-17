import {element} from 'deku';

const setupRenderer = ({embeds: {twitter}}) => {

  return {
    render: ({ props: {data}}) => {
      const children = data.map(row => twitter(row));

      return <article>{children}</article>;
    }
  };
};

module.exports = setupRenderer;
