import test from 'tape';
import setupArticle from './lib';
import {renderString, tree} from 'deku';
import element from 'magic-virtual-element';

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
  const expected = renderString(tree(
    <article><figure><span id='twitter-id'/></figure></article>));
  const actual = renderString(tree(<Article items={items} />));

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
  const expected = renderString(tree(<article></article>));
  const actual = renderString(tree(<Article items={items} />));

  t.equal(actual, expected);
  t.end();
});

test('embed with custom figureProps', t => {
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
    id: 'twitter-id',
    figureProps: {
      foo: 'bar',
      hello: 'world'
    }
  }];
  const expected = renderString(tree(
    <article>
      <figure foo='bar' hello='world'><span id='twitter-id'/></figure>
    </article>));
  const actual = renderString(tree(<Article items={items} />));

  t.equal(actual, expected);

  t.end();
});

test('text elements', t => {
  const Article = setupArticle({ embeds: {} });

  const items = [
    {
      type: 'paragraph',
      children: [{content: 'foo bar', type: 'text'}]
    }, {
      type: `header1`,
      children: [{content: 'beep boop1', type: 'text'}]
    }, {
      type: `header2`,
      children: [{content: 'beep boop2', type: 'text'}]
    }, {
      type: `header3`,
      children: [{content: 'beep boop3', type: 'text'}]
    }, {
      type: `header4`,
      children: [{content: 'beep boop4', type: 'text'}]
    }, {
      type: `header5`,
      children: [{content: 'beep boop5', type: 'text'}]
    }, {
      type: `header6`,
      children: [{content: 'beep boop6', type: 'text'}]
    }
  ];

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <p>foo bar</p>
    <h1>beep boop1</h1>
    <h2>beep boop2</h2>
    <h3>beep boop3</h3>
    <h4>beep boop4</h4>
    <h5>beep boop5</h5>
    <h6>beep boop6</h6>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('text', t => {
  const Article = setupArticle({embeds: {}});
  const items = [
    {
      type: 'paragraph',
      children: [
        {type: 'text', content: 'foo'},
        {type: 'text', content: 'foz', href: 'http://disney.com'},
        {type: 'text', content: 'fez', italic: true},
        {type: 'text', content: 'fiz', bold: true},
        {type: 'text', content: 'faz', italic: true, bold: true,
          href: 'http://mic.com'}
      ]
    }
  ];
  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <p>
      foo
      <a href='http://disney.com'>foz</a>
      <i>fez</i>
      <b>fiz</b>
      <a href='http://mic.com'><b><i>faz</i></b></a>
    </p>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('text with no content', t => {
  const Article = setupArticle({embeds: {}});
  const items = [
    'paragraph',
    'header1', 'header2', 'header3', 'header4', 'header5', 'header6'
  ].map(type => ({
    type, children: []
  }));

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article></article>));

  t.equal(actual, expected);
  t.end();
});

test('text with no content, opts.renderEmptyTextNodes = true', t => {
  const Article = setupArticle({embeds: {}, renderEmptyTextNodes: true});
  const items = [
    'paragraph',
    'header1', 'header2', 'header3', 'header4', 'header5', 'header6'
  ].map(type => ({
    type, children: []
  }));

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <p></p>
    <h1></h1>
    <h2></h2>
    <h3></h3>
    <h4></h4>
    <h5></h5>
    <h6></h6>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('blockquote', t => {
  const Article = setupArticle({embeds: {}});
  const items = [{
    type: 'blockquote',
    children: [{
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'abc'
      }]
    }, {
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'def',
        bold: true
      }]
    }]
  }];
  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(
    <article>
      <blockquote>
        <p>abc</p>
        <p><b>def</b></p>
      </blockquote>
    </article>
  ));

  t.equal(actual, expected);
  t.end();
});

test('unkown type', t => {
  const Article = setupArticle({embeds: {}});
  const items = [{
    type: 'whatever'
  }];

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article></article>));

  t.equal(actual, expected);
  t.end();
});

test('text node with linebreak, mark & unkown type', t => {
  const Article = setupArticle({ embeds: {} });

  const items = [
    {
      type: 'paragraph',
      children: [
        {type: 'text', content: 'foo'},
        {type: 'linebreak'},
        {type: 'unknown'},
        {type: 'text', content: 'foo'},
        {type: 'text', content: 'foz', mark: true},
        {type: 'text', content: 'fiz', mark: true, markClass: 'mark-class'},
        {type: 'text', mark: true}
      ]
    }
  ];

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <p>
      foo<br/>
      foo
      <mark>foz</mark>
      <mark class='mark-class'>fiz</mark>
      <mark></mark>
    </p>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('embed with caption', t => {
  const Article = setupArticle({
    embeds: {
      image: ({src}) => <img src={src} />
    }
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false
    }, {
      type: 'text',
      content: 'Author',
      href: 'http://example.com/author',
      italic: false,
      bold: false
    }]
  }];

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <figure>
      <img src='http://example.com/image.jpg'></img>
      <figcaption>
        Source: <a href='http://example.com/author'>Author</a>
      </figcaption>
    </figure>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('custom caption', t => {
  const customCaption = data => <figcaption-foo>{data}</figcaption-foo>;
  const Article = setupArticle({
    embeds: {
      image: ({src}) => <img src={src} />
    },
    customCaption
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false
    }, {
      type: 'text',
      content: 'Author',
      href: 'http://example.com/author',
      italic: false,
      bold: false
    }]
  }];

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <figure>
      <img src='http://example.com/image.jpg'></img>
      <figcaption-foo>
        Source: <a href='http://example.com/author'>Author</a>
      </figcaption-foo>
    </figure>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('embed with caption and attribution', t => {
  const Article = setupArticle({
    embeds: {
      image: ({src}) => <img src={src} />
    }
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Image description',
      href: null,
      italic: false,
      bold: false
    }],
    attribution: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false
    }, {
      type: 'text',
      content: 'author',
      href: 'http://example.com',
      italic: false,
      bold: false
    }]
  }];

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <figure>
      <img src='http://example.com/image.jpg'></img>
      <figcaption>
        Image description
        <cite>Source: <a href='http://example.com'>author</a></cite>
      </figcaption>
    </figure>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('embed with attribution without link', t => {
  const Article = setupArticle({
    embeds: {
      image: ({src}) => <img src={src} />
    }
  });

  const items = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [],
    attribution: [{
      type: 'text',
      content: 'Source',
      href: null,
      italic: false,
      bold: false
    }]
  }];

  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <figure>
      <img src='http://example.com/image.jpg'></img>
      <figcaption>
        <cite>Source</cite>
      </figcaption>
    </figure>
  </article>));

  t.equal(actual, expected);
  t.end();
});
