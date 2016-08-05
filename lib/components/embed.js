import element from 'magic-virtual-element';
import renderText from '../text';

const defaultRenderCaption = (text, attribution) => {
  const attributionEl = attribution.length > 0 ? <cite>{attribution}</cite> : '';
  return (<figcaption>
    {text.concat([attributionEl])}
  </figcaption>);
};

const setup = ({embeds, customCaption}) => {
  const renderCaption = customCaption || defaultRenderCaption;

  return {
    test: ({embedType}) => embeds[embedType],
    render: ({props}) => {
      const {embedType, caption, attribution, figureProps} = props;
      const embed = embeds[embedType] && embeds[embedType](props);
      const captionText = renderText(caption || []);
      const attributionText = renderText(attribution || []);

      const captionElm = (captionText.length > 0 || attributionText.length > 0)
        ? renderCaption(captionText, attributionText)
        : '';

      return <figure {...figureProps}>{embed}{captionElm}</figure>;
    }
  };
};

export default setup;
