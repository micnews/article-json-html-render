import test from 'tape';
import setupArticle from './lib';
import {element, string} from 'deku';

test('embed', t => {
  t.plan(2);

  const Article = setupArticle({
    embeds: {
      twitter: tweet => {
        t.equal(tweet.id, 'twitter-id');
        return <span id={tweet.id} />;
      }
    }
  });
  const items = [{
    type: 'embed',
    embedType: 'twitter',
    id: 'twitter-id'
  }];
  const expected = string.render(<article><figure><span id='twitter-id'/></figure></article>);
  const actual = string.render(<Article items={items} />);

  t.equal(actual, expected);

  t.end();
});

test('unknown embed', t => {
  t.plan(1);

  const Article = setupArticle({ embeds: {} });

  const items = [{
    type: 'embed',
    embedType: 'unknown-embed'
  }];
  const expected = string.render(<article></article>);
  const actual = string.render(<Article items={items} />);

  t.equal(actual, expected);
  t.end();
});
