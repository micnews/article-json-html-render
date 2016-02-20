import {element} from 'deku';

const wrapMark = ({mark, markClass}, el) =>
  mark ? <mark class={markClass || null}>{el}</mark> : el;

const wrapHref = ({href}, el) => href ? <a href={href}>{el}</a> : el;

const wrapBold = ({bold}, el) => bold ? <b>{el}</b> : el;

const wrapItalic = ({italic}, el) => italic ? <i>{el}</i> : el;

const renderItem = (item) => {
  if (item.type === 'text') {
    let el = String(item.content || '');
    el = wrapItalic(item, el);
    el = wrapBold(item, el);
    el = wrapHref(item, el);
    el = wrapMark(item, el);

    return el;
  }

  if (item.type === 'linebreak') {
    return <br/>;
  }

  return '';
};

export default (items) => items.map(renderItem);
