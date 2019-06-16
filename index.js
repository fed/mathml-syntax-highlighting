// highlight.js
import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

// CodeMirror
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/lib/codemirror.css';

// MathML examples
import { multiLineIndented, multiLineNotIndented, singleLine } from './mathml';

// ################################################
// Highlight.js for static content
// ################################################
hljs.registerLanguage('xml', xml);

// htmlentities() is a PHP function which converts special characters (like <)
// into their escaped/encoded values (like &lt;).
// This allows you to show to display the string without the browser reading it as HTML.
// JavaScript doesn't have a native version of it. If you just need the very basics
// so that the browser won't interpret as HTML, this should work fine.
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const staticContainer = document.getElementById('static');
const encodedContent = htmlEntities(multiLineIndented);

// Inject MathML into the DOM.
staticContainer.innerHTML = encodedContent;

// Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
// hljs.initHighlighting();

// Alternatively we can target exactly the code block we want.
hljs.highlightBlock(staticContainer);

// ################################################
// CodeMirror for dynamic content
// ################################################
const dynamicTextarea = document.getElementById('dynamic');
const codeMirrorInstance = CodeMirror(
    el => dynamicTextarea.parentNode.replaceChild(el, dynamicTextarea),
    {
        value: singleLine,
        mode: 'xml',
        lineWrapping: true
    }
);

codeMirrorInstance.setSize(null, 100);

// ################################################
// CodeMirror for dynamic content with auto indent
// ################################################
const dynamicTextareaAutoIndent = document.getElementById('dynamic-autoindent');
const codeMirrorAutoIndentInstance = CodeMirror(
    el => dynamicTextareaAutoIndent.parentNode.replaceChild(el, dynamicTextareaAutoIndent),
    {
        value: multiLineNotIndented,
        mode: 'xml',
        lineNumbers: true,
        lineWrapping: true
    }
);

codeMirrorAutoIndentInstance.execCommand('selectAll');
codeMirrorAutoIndentInstance.execCommand('indentAuto');
codeMirrorAutoIndentInstance.setCursor({ line: 1, ch: 1 });
