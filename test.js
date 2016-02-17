import test from 'tape';
import setupRenderer from './lib';
import {element, string} from 'deku';

test('twitter', t => {
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

test('youtube', t => {
  t.plan(2);

  const Renderer = setupRenderer({
    embeds: {
      youtube: embed => {
        t.equal(embed.id, 'youtube-id');
        return <span id={embed.id} />;
      }
    }
  });

  const data = [{
    type: 'embed',
    embedType: 'youtube',
    id: 'youtube-id'
  }];
  const expected = string.render(<article><span id='youtube-id'/></article>);
  const actual = string.render(<Renderer data={data} />);

  t.equal(actual, expected);
  t.end();
});
