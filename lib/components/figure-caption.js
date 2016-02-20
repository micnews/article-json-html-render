import {element} from 'deku';
import text from '../text';

const render = ({props}) => {
  const { items } = props;
  return <figcaption>{text(items)}</figcaption>;
};

export default {render};
