import React from 'react';
import renderText from '../text';

const defaultRenderCaption = (text, attribution) => {
  const attributionEl = attribution.length > 0 ? <cite key='cite'>{attribution}</cite> : '';
  return (<figcaption>
    {text.map((el, index) => {
      if (React.isValidElement(el)) {
        return React.cloneElement(el, { key: `attr${index}` });
      }

      return el;
    }).concat([attributionEl])}
  </figcaption>);
};

const setup = ({ embeds, customCaption }) => {
  const renderCaption = customCaption || defaultRenderCaption;

  function makeEmbed(props) {
    const { embedType, caption, attribution, figureProps = {} } = props;
    const embed = embeds[embedType] && embeds[embedType](props);
    const captionText = renderText(caption || []);
    const attributionText = renderText(attribution || []);

    const captionElm = (captionText.length > 0 || attributionText.length > 0)
      ? renderCaption(captionText, attributionText)
      : '';

    return <figure {...figureProps}>{embed}{captionElm}</figure>;
  }

  makeEmbed.propTypes = {
    embedType: React.PropTypes.string.isRequired,
    caption: React.PropTypes.array,
    attribution: React.PropTypes.array,
    figureProps: React.PropTypes.object
  };

  return {
    test: ({ embedType }) => embeds[embedType],
    component: makeEmbed
  };
};

export default setup;
