import element from 'magic-virtual-element';
import text from '../text';

const render = ({props: {items}}) => <p>{text(items)}</p>;

export default {render};
