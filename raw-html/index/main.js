function PageLoad() {
    swal({
        title: "Success!",
        text: "Seeing this means the page was loaded with success!",
        icon: "success",
    });

    ElementLoader.LoadElement(document.querySelector('#code-demo'),
    'codeBlock', {
        id: 'elementLoad',
        lang: 'JavaScript',
        code:
        escape(
        '// Loading an element\n'+
        'ElementLoader.LoadElement(\n'+
        'parent,\n'+
        '"elmentName",\n'+
        '{\n'+
        'id: "elementId",\n'+
        'otherVar: "otherValue"\n'+
        '});')
    });

    ElementLoader.LoadElement(document.querySelector('#code-demo'),
    'codeBlock', {
        id: 'pageHtml',
        lang: 'HTML',
        code:
        escape(
        '<!-- HTML page simplified: -->\n'+
        '<div>\n'+
        '<h1>Hello World</h1>\n'+
        '</div>')
    });
}