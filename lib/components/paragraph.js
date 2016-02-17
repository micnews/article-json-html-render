import { element } from 'deku';
import text from '../text';

function render ({ props }) {
  const { items } = props;
  return <p>{text(items)}</p>;
}

export default { render };
