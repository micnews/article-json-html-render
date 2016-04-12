import {element} from 'deku';
import renderText from '../text';

const defaultRenderCaption = text => <figcaption>{text}</figcaption>;

const setup = ({embeds, customCaption}) => {
  const renderCaption = customCaption || defaultRenderCaption;

  return {
    test: ({embedType}) => embeds[embedType],
    render: ({props}) => {
      const {embedType, caption, figureProps} = props;
      const embed = embeds[embedType] && embeds[embedType](props);
      const captionText = renderText(caption || []);

      const captionElm = (captionText.length > 0)
        ? renderCaption(captionText)
        : '';

      return <figure {...figureProps}>{embed}{captionElm}</figure>;
    }
  };
};

export default setup;
