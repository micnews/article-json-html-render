import {element} from 'deku';

const setupRenderer = ({embeds = {}}) => {

  return {
    render: ({ props: {data}}) => {
      const children = data.map(row => {
        const embed = embeds[row.embedType];
        return embed ? embed(row) : '';
      });

      return <article>{children}</article>;
    }
  };
};

module.exports = setupRenderer;
