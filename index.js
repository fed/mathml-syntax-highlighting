// highlight.js
import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

// CodeMirror
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/lib/codemirror.css';

// ##############################################
// Highlight.js for static content
// ##############################################
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

const staticMathMLContainer = document.getElementById('static');
const sampleMathMLContent = `
    <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mrow>
            <munderover>
                <mo>&#8721;</mo>
                <mrow>
                    <mi>k</mi>
                    <mo>=</mo>
                    <mn>1</mn>
                </mrow>
                <mn>7</mn>
            </munderover>
            <mfrac>
                <msup>
                    <mi>x</mi>
                    <mi>k</mi>
                </msup>
                <mrow>
                    <mi>k</mi>
                    <mo>!</mo>
                </mrow>
            </mfrac>
        </mrow>
    </math>`;

const encodedContent = htmlEntities(sampleMathMLContent);

// Inject MathML into the DOM.
staticMathMLContainer.innerHTML = encodedContent;

// Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
// hljs.initHighlighting();

// Alternatively we can target exactly the code block we want.
hljs.highlightBlock(staticMathMLContainer);

// ##############################################
// CodeMirror for dynamic content
// ##############################################
const dynamicMathMLTextarea = document.getElementById('dynamic');
const codeMirrorInstance = CodeMirror(
    el => dynamicMathMLTextarea.parentNode.replaceChild(el, dynamicMathMLTextarea),
    {
        value: sampleMathMLContent,
        mode: 'xml'
    }
);
