import element from 'magic-virtual-element';
import renderText from '../text';

const defaultRenderCaption = text => <figcaption>{text}</figcaption>;
const defaultRenderFigure = ({props, children}) => <figure {...props.figureProps}>{children}</figure>;

const setup = ({embeds, customCaption, customFigure}) => {
  const renderCaption = customCaption || defaultRenderCaption;
  const renderFigure = customFigure || defaultRenderFigure;

  return {
    test: ({embedType}) => embeds[embedType],
    render: ({props}) => {
      const {embedType, caption} = props;
      const embed = embeds[embedType] && embeds[embedType](props);
      const captionText = renderText(caption || []);

      const captionElm = (captionText.length > 0)
        ? renderCaption(captionText)
        : '';

      return renderFigure({props, children: [embed, captionElm]});
    }
  };
};

export default setup;
