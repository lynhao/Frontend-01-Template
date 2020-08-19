import assert from 'assert';
import parseHTML from '../src/parser.js';

it('parse single element', function () {
    let doc = parseHTML("<div></div>");
    let div = doc.children[0];
    assert.equal(div.tagName, "div");
    assert.equal(div.children.length, 0);
    assert.equal(div.type, "element");
    assert.equal(div.attributes.length, 2);
  })


it('parse single element has content', function () {
    let doc = parseHTML("<div>hello 8.8</div>");
    let text = doc.children[0].children[0]
    console.log(text);
    assert.equal(text.content, "hello 8.8");
    assert.equal(text.type, "text");
  })

  it('tag mismatch', function () {
    try {
        let doc = parseHTML("<div></iv>"); 
    } catch(e) {
        assert.equal(e.message, "Tag start end doesn't match!");
    }
  })

  it('text width <', function () {
    let doc = parseHTML("<div>a < b</div>"); 
    let text = doc.children[0].children[0];
    assert.equal(text.content, "a < b");
    assert.equal(text.type, "text");

  })

  it('with property', function () {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>"); 
    let div = doc.children[0];

    let count = 0;

    for(let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a")
            return;
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls")
            return;
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc")
            return;
        }
    }
    assert.ok(count === 3);
  })

  it('with double quoted property', function() {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>"); 
    let div = doc.children[0];

    let count = 0;
    for(let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a")
            return;
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls")
            return;
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc")
            return;
        }
    }
    assert.ok(count === 3);
  })
//   113,147,197-201,212-213,215-217,235,249-251,401-402,429
  it('EOF', function() {
    let doc = parseHTML("<EOF></EOF>"); 
  })

  it("before attribute name with space/tab", function() {
    let doc = parseHTML("<div  id=1></div>"); 
  })
  it("before attribute value with space/tab", function() {
    let doc = parseHTML("<div id= 1></div>"); 
  })

  it("after double quota still have quota", function() {
    let doc = parseHTML('<div id="1""></div>'); 
  })

  it("the atrribute value has no quota and is the self closing tag", function() {
    let doc = parseHTML('<img name=1/>'); 
  })
  
//   it("after equal sign with space/tab", function() {
//     let doc = parseHTML('<div id>=></div>'); 
//   })

  it("tag end with great than sign", function() {
    let doc = parseHTML('</>'); 
  })
  it("selfClosingStartTag EOF", function() {
    let doc = parseHTML('</>'); 
  })

  it('self closing in tagName', function() {
    let doc = parseHTML("<img/>"); 
  })

  it('script', function() {
    let content = `<div>abcd</div>
<span>x</span>
/script>
<script
<
</
</s
</sc
</scr
</scri
</scrip
</script`; 
    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0]

    assert.equal(text.type, "text")
    assert.equal(text.content, content)
  })
  it('script end has space', function() {
    let doc = parseHTML(`<script></script >`);
  })
  it('script', function() {
    let content = `<`;
    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0]

    assert.equal(text.type, "text")
    assert.equal(text.content, content)
  })

  it('with property3', function() {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>"); 
    let div = doc.children[0];

    let count = 0;
    for(let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a")
            return;
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls")
            return;
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc")
            return;
        }
    }
    assert.ok(count === 3);
  })

  it('attrbute with no value', function() {
    let doc = parseHTML("<div class/>"); 
    let div = doc.children[0];
  
  })

  it('attrbute with no value', function() {
    let doc = parseHTML("<div class id/>"); 
  
  })

  it('self close with no attribute', function() {
    let doc = parseHTML("<div />"); 
  
  })