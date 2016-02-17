import test from 'tape';
import setupRenderer from './lib';
import {element, string} from 'deku';

test('embed', t => {
  t.plan(2);

  const Renderer = setupRenderer({
    embeds: {
      twitter: tweet => {
        t.equal(tweet.id, 'twitter-id');
        return <span id={tweet.id} />;
      }
    }
  });
  const data = [{
    type: 'embed',
    embedType: 'twitter',
    id: 'twitter-id'
  }];
  const expected = string.render(<article><span id='twitter-id'/></article>);
  const actual = string.render(<Renderer data={data} />);

  t.equal(actual, expected);

  t.end();
});

test('unknown embed', t => {
  t.plan(1);

  const Renderer = setupRenderer({});

  const data = [{
    type: 'embed',
    embedType: 'unknown-embed'
  }];
  const expected = string.render(<article></article>);
  const actual = string.render(<Renderer data={data} />);

  t.equal(actual, expected);
  t.end();
});
