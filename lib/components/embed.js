import { element } from 'deku';
import FigureCaption from './figure-caption';

const setup = ({ embeds }) => {
  return {
    test: ({embedType}) => embeds[embedType],
    render: ({ props }) => {
      const { embedType } = props;
      const embed = embeds[embedType] && embeds[embedType](props);

      if (!embed) {
        return undefined;
      }

      const caption = (props.caption && props.caption.length > 0)
        ? <FigureCaption items={props.caption} /> : '';

      return <figure>{embed}{caption}</figure>;
    }
  };
};

export default setup;
