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

test('text elements', t => {
  const Article = setupArticle({ embeds: {} });

  const items = [
    {
      type: 'paragraph',
      children: [{content: 'foo bar'}]
    }, {
      type: `header1`,
      children: [{content: 'beep boop1'}]
    }, {
      type: `header2`,
      children: [{content: 'beep boop2'}]
    }, {
      type: `header3`,
      children: [{content: 'beep boop3'}]
    }, {
      type: `header4`,
      children: [{content: 'beep boop4'}]
    }, {
      type: `header5`,
      children: [{content: 'beep boop5'}]
    }, {
      type: `header6`,
      children: [{content: 'beep boop6'}]
    }
  ];

  const actual = string.render(<Article items={items} />);
  const expected = string.render(<article>
    <p>foo bar</p>
    <h1>beep boop1</h1>
    <h2>beep boop2</h2>
    <h3>beep boop3</h3>
    <h4>beep boop4</h4>
    <h5>beep boop5</h5>
    <h6>beep boop6</h6>
  </article>)

  t.end();
});
