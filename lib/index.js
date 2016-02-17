import {element} from 'deku';

const setupRenderer = ({embeds}) => {

  return {
    render: ({ props: {data}}) => {
      const children = data.map(row => embeds[row.embedType](row));

      return <article>{children}</article>;
    }
  };
};

module.exports = setupRenderer;
