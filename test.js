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

test('text and it\'s formattings', t => {
  const Article = setupArticle({embeds: {}});
  const items = [
    {
      type: 'paragraph',
      children: [
        {type: 'text', content: 'foo'},
        {type: 'text', content: 'foz', href: 'http://disney.com'},
        {type: 'text', content: 'fez', italic: true},
        {type: 'text', content: 'fiz', bold: true},
        {type: 'text', content: 'fuz', strikethrough: true},
        {type: 'text', content: 'fyz', mark: true},
        {type: 'text', content: 'faz', italic: true, bold: true,
          mark: true, strikethrough: true, href: 'http://mic.com'}
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
      <s>fuz</s>
      <mark>fyz</mark>
      <a href='http://mic.com'><s><b><i><mark>faz</mark></i></b></s></a>
    </p>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('text w links should use minimal amount of a-tags', t => {
  const Article = setupArticle({embeds: {}});
  const items = [
    {
      type: 'paragraph',
      children: [
        {type: 'text', content: 'faz', href: 'http://disney.com'},
        {type: 'text', content: 'fez', mark: true, href: 'http://disney.com', markClass: 'hello'},
        {type: 'text', content: 'fiz', href: 'http://disney.com'}
      ]
    }, {
      type: 'paragraph',
      children: [
        {type: 'text', content: 'faz', href: 'http://foo.com'},
        {type: 'text', content: 'fez', mark: true, href: 'http://bar.com', markClass: 'hello'},
        {type: 'text', content: 'fiz', href: 'http://disney.com'}
      ]
    }
  ];
  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <p>
      <a href='http://disney.com'>faz<mark class='hello'>fez</mark>fiz</a>
    </p>
    <p>
      <a href='http://foo.com'>faz</a>
      <a href='http://bar.com'><mark class='hello'>fez</mark></a>
      <a href='http://disney.com'>fiz</a>
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
    pullQuote: false,
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

test('blockquote pullQuote=true', t => {
  const Article = setupArticle({embeds: {}});
  const items = [{
    type: 'blockquote',
    pullQuote: true,
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
      <blockquote class='q'>
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

test('customTextFormattings', t => {
  const Article = setupArticle({
    embeds: {
      image: ({src}) => <img src={src} />
    },
    customTextFormattings: [
      {
        property: 'underline',
        render: (item, el) => {
          return (<span style='text-decoration: underline;'>{el}</span>);
        }
      }
    ]
  });

  const items = [{
    type: 'paragraph',
    children: [{
      type: 'text',
      content: 'underlined text',
      underline: true
    }]
  }, {
    type: 'header1',
    children: [{
      type: 'text',
      content: 'underlined text',
      underline: true
    }]
  }, {
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Image description',
      underline: true
    }],
    attribution: [{
      type: 'text',
      content: 'Source: ',
      underline: true
    }, {
      type: 'text',
      content: 'author',
      href: 'http://example.com',
      underline: true
    }]
  }];
  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <p><span style='text-decoration: underline;'>underlined text</span></p>
    <h1><span style='text-decoration: underline;'>underlined text</span></h1>
    <figure>
      <img src='http://example.com/image.jpg'></img>
      <figcaption>
        <span style='text-decoration: underline;'>Image description</span>
        <cite>
          <span style='text-decoration: underline;'>Source: </span>
          <span style='text-decoration: underline;'><a href='http://example.com'>author</a></span>
        </cite>
      </figcaption>
    </figure>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('customTextFormattings wraps all other formattings', t => {
  const Article = setupArticle({
    customTextFormattings: [
      {
        property: 'underline',
        render: (item, el) => {
          return (<span style='text-decoration: underline;'>{el}</span>);
        }
      }
    ]
  });

  const items = [{
    type: 'paragraph',
    children: [{
      type: 'text',
      content: 'content',
      underline: true,
      italic: true,
      bold: true,
      mark: true,
      strikethrough: true,
      href: 'http://mic.com'
    }]
  }];
  const actual = renderString(tree(<Article items={items} />));
  const expected = renderString(tree(<article>
    <p>
      <span style='text-decoration: underline;'>
        <a href='http://mic.com'><s><b><i><mark>
          content
        </mark></i></b></s></a>
      </span>
    </p>
  </article>));

  t.equal(actual, expected);
  t.end();
});

test('articleProps', t => {
  const Article = setupArticle({ embeds: {} });

  const articleProps = {
    contenteditable: true,
    class: 'custom-article-class'
  };
  const expected = renderString(tree(<article {...articleProps}></article>));
  const actual = renderString(tree(<Article articleProps={articleProps} items={[]} />));

  t.equal(actual, expected);
  t.end();
});

test('render plain html with no embeds', t => {
  t.plan(1);

  const htmlRender = setupArticle.html();
  const items = [{
    type: 'paragraph',
    children: [{
      type: 'text',
      content: 'Text'
    }]
  }, {
    type: 'embed',
    embedType: 'twitter',
    id: 'twitter-id'
  }];
  const expected = renderString(tree(
    <article><p>Text</p></article>
  ));
  const actual = htmlRender(items);

  t.equal(actual, expected);

  t.end();
});
