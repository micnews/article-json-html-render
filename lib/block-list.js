import React from 'react';
import startswith from 'lodash.startswith';
import Paragraph from './components/paragraph';
import setupBlockquote from './components/blockquote';
import Header from './components/header';

const isText = type => type === 'paragraph' || startswith(type, 'header');

const hasContent = ({ children }) =>
  children.some(child => (child.type !== 'linebreak' &&
    (child.content && child.content.trim())) || child.mark);

const setup = ({ Embed, renderEmptyTextNodes }) => {
  const types = {
    blockquote: ({ children }, index) => <Blockquote key={index} items={children} />,
    embed: (item, index) => {
      const EmbedComponent = Embed.component;
      return Embed.test(item) ? <EmbedComponent key={index} {...item} /> : '';
    },
    header1: ({ children }, index) => <Header key={index} level={1} items={children} />,
    header2: ({ children }, index) => <Header key={index} level={2} items={children} />,
    header3: ({ children }, index) => <Header key={index} level={3} items={children} />,
    header4: ({ children }, index) => <Header key={index} level={4} items={children} />,
    header5: ({ children }, index) => <Header key={index} level={5} items={children} />,
    header6: ({ children }, index) => <Header key={index} level={6} items={children} />,
    paragraph: ({ children }, index) => <Paragraph key={index} items={children} />
  };

  types.blockquote.propTypes =
  types.header1.propTypes =
  types.header2.propTypes =
  types.header3.propTypes =
  types.header4.propTypes =
  types.header5.propTypes =
  types.header6.propTypes =
  types.paragraph.propTypes = {
    children: React.PropTypes.array.isRequired
  };

  function renderItem(item, index) {
    const { type } = item;
    const typeFn = types[type];
    if (!typeFn || (!renderEmptyTextNodes && isText(type) && !hasContent(item))) {
      return '';
    }

    return typeFn(item, index);
  }

  const blockList = items => items.map(renderItem);
  const Blockquote = setupBlockquote({ blockList });

  return blockList;
};

export default setup;
