import element from 'magic-virtual-element';

const wrapMark = ({mark, markClass}, el) =>
  (mark ? <mark class={markClass || null}>{el}</mark> : el);

const wrapHref = ({href}, el) => (href ? <a href={href}>{el}</a> : el);

const wrapBold = ({bold}, el) => (bold ? <b>{el}</b> : el);

const wrapItalic = ({italic}, el) => (italic ? <i>{el}</i> : el);

const wrapStrikethrough = ({strikethrough}, el) => (strikethrough ? <s>{el}</s> : el);

const setupRenderItem = customTextFormattings => item => {
  if (item.type === 'text') {
    let el = String(item.content || '');
    el = wrapMark(item, el);
    el = wrapItalic(item, el);
    el = wrapBold(item, el);
    el = wrapStrikethrough(item, el);
    el = wrapHref(item, el);

    customTextFormattings.forEach(({property, render}) => {
      if (item[property]) {
        el = render(item, el);
      }
    });

    return el;
  }

  if (item.type === 'linebreak') {
    return <br/>;
  }

  return '';
};

const mergableElements = (el1, el2) =>
  // both are links to the same place
  (el1.type === 'a' && el2.type === 'a' && el1.attributes.href === el2.attributes.href) ||
  // ... or both are bold
  (el1.type === 'b' && el2.type === 'b') ||
  // ... or both are italic
  (el1.type === 'i' && el2.type === 'i') ||
  // ... or both are strikethrough
  (el1.type === 's' && el2.type === 's');

export default ({customTextFormattings = []}) => items => items
  .map(setupRenderItem(customTextFormattings))
  .reduce((items, el, index) => {
    const prevEl = items[items.length - 1];

    if (prevEl && mergableElements(prevEl, el)) {
      prevEl.children = prevEl.children.concat(el.children);
      return items;
    }

    items.push(el);
    return items;
  }, []);
