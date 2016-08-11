import React from 'react';

const wrapMark = ({ mark, markClass }, el) =>
  (mark ? <mark className={markClass || null}>{el}</mark> : el);

const wrapHref = ({ href }, el) => (href ? <a href={href}>{el}</a> : el);

const wrapBold = ({ bold }, el) => (bold ? <b>{el}</b> : el);

const wrapItalic = ({ italic }, el) => (italic ? <i>{el}</i> : el);

wrapMark.propTypes = {
  mark: React.PropTypes.bool,
  markClass: React.PropTypes.string
};

wrapHref.propTypes = {
  href: React.PropTypes.string
};

wrapBold.propTypes = {
  bold: React.PropTypes.bool
};

wrapItalic.propTypes = {
  italic: React.PropTypes.bool
};

const renderItem = (item, index) => {
  if (item.type === 'text') {
    let el = String(item.content || '');
    el = wrapItalic(item, el);
    el = wrapBold(item, el);
    el = wrapHref(item, el);
    el = wrapMark(item, el);

    if (React.isValidElement(el)) {
      el = React.cloneElement(el, { key: index });
    }

    return el;
  }

  if (item.type === 'linebreak') {
    return <br key={index} />;
  }

  return '';
};

export default (items) => items.map(renderItem);
