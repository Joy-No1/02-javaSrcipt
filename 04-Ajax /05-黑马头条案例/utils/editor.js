/*
 * @Author: joy 1686452422@qq.com
 * @Date: 2023-06-05 14:55:56
 * @LastEditors: joy 1686452422@qq.com
 * @LastEditTime: 2023-11-21 16:22:53
 * @FilePath: /02-javaScript/04-Ajax /05-黑马头条案例/utils/editor.js
 */
// 富文本编辑器
// 创建编辑器函数，创建工具栏函数


const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '发布文章的内容',
    onChange(editor) {
        const html = editor.getHtml()
        console.log('editor content', html)
        // 也可以同步到 <textarea>
        document.querySelector('.publish-content').value = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
