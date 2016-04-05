import {element} from 'deku';
import FigureCaption from './figure-caption';

const setup = ({embeds}) => ({
  test: ({embedType}) => embeds[embedType],
  render: ({props}) => {
    const {embedType, caption, figureProps} = props;
    const embed = embeds[embedType] && embeds[embedType](props);

    const captionElm = (caption && caption.length > 0)
      ? <FigureCaption items={caption} /> : '';

    return <figure {...figureProps}>{embed}{captionElm}</figure>;
  }
});

export default setup;
