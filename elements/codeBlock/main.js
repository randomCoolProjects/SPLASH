function selectText(node) {
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        swal({
            title: "Error!",
            text: "Impossible to copy.",
            icon: "error",
        });
    }
}

function codeCopy(id)
{
    var codeElement = document.querySelector(`#${id} > .code`);
    selectText(codeElement);
    document.execCommand('copy');
}

function highLightCode(code)
{
    var newCode = '';
    var strOpened;
    var insideString = false;
    var lastWord = '';
    var insideComment = false;

    for (var i = 0; i < code.length; i ++)
    {
        var ch = code[i];

        if (ch == '/' && code[i+1] && code[i+1] == '/' && !insideString)
        {
            insideComment = true;
            newCode += '<span class="comment">'
        }
        if (ch == '\n' || ch == '\r' && insideComment == true)
        {
            newCode += '</span>';
            insideComment = false;
        }

        if (insideComment)
        {
            newCode += ch;
            continue;
        }

        if (ch == '\'' || ch == '"')
        {
            if (insideString && ch == strOpened)
            {
                newCode += ch + '</span>';
                insideString = false;
                continue;
            }
            else if (!insideString)
            {
                strOpened = ch;
                insideString = true;
                newCode += '<span class="string">';
            }
        }

        if (ch.toUpperCase() == ch.toLowerCase())
        {
            if (ch == '.' && !insideString)
            {
                var newCode_0 = newCode.substring(0, newCode.length - lastWord.length);
                var newCode_1 = newCode.substring(newCode_0.length);
                newCode = newCode_0 + '<span class="object">' + newCode_1 +'</span>';
            }
            lastWord = '';
        }

        newCode += ch;
        lastWord += ch;
    }
    return newCode;
}


function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
  

function codeBlock(id)
{
    var lang = document.querySelector('#' + id + '> .codeLang').innerText.toLowerCase();
    var codeElement = document.querySelector('#' + id + '> .code');
    var tmp_code = document.querySelector('#tmp-code');
    var code = unescape(tmp_code.innerText);
    console.log(code)
    tmp_code.outerHTML = '';
    if (lang == 'javascript' || lang == 'css')
    code = highLightCode(code);
    else if (lang == 'html') code = escapeHtml(code);
    while(code.includes('\n'))
    code = code.replace('\n', '<br>');
    codeElement.innerHTML = code;
}