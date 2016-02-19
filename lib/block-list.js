import { element } from 'deku';
import Paragraph from './components/paragraph';
import setupBlockquote from './components/blockquote';
import Header from './components/header';
import startswith from 'lodash.startswith';

const isText = type => type === 'paragraph' || startswith(type, 'header');

const setup = ({ Embed }) => {
  const blockList = items => items.map(renderItem);
  const Blockquote = setupBlockquote({blockList});
  const renderItem = item => {
    const {type, children} = item;
    if (isText(type)) {
      const hasContent = children.filter(child => type !== 'linebreak' &&
          (child.content && child.content.trim()) || child.mark).length > 0;

      if (!hasContent) {
        return '';
      }
    }

    if (type === 'paragraph') {
      return <Paragraph items={children} />;
    }

    if (type === 'header1') {
      return <Header type={1} items={children} />;
    }

    if (type === 'header2') {
      return <Header type={2} items={children} />;
    }

    if (type === 'header3') {
      return <Header type={3} items={children} />;
    }

    if (type === 'header4') {
      return <Header type={4} items={children} />;
    }

    if (type === 'header5') {
      return <Header type={5} items={children} />;
    }

    if (type === 'header6') {
      return <Header type={6} items={children} />;
    }

    if (type === 'blockquote') {
      return <Blockquote items={children} />;
    }

    if (type === 'embed') {
      return Embed.test(item) ? <Embed {...item} /> : '';
    }

    return '';
  };

  return blockList;
};

export default setup;
