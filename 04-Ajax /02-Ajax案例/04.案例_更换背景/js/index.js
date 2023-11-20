/*
 * @Author: joy 1686452422@qq.com
 * @Date: 2023-06-05 14:56:18
 * @LastEditors: joy 1686452422@qq.com
 * @LastEditTime: 2023-11-14 17:14:18
 * @FilePath: /02-javaScript/04-Ajax /02-Ajax案例/04.案例_更换背景/js/index.js
 */

/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */

document.querySelector('.bg-ipt').addEventListener('change', e => {
    console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append('img', e.target.files[0]);
    axios({
        url: 'http://hmajax.itheima.net/api/uploadimg',
        method: 'POST',
        data: fd
    }).then(result => {
        // console.log(result);
        const imgUrl = result.data.data.url;
        document.body.style.backgroundImage = `url(${imgUrl})`;
        localStorage.setItem('bgImg', imgUrl);
    })
})

const bgUrl = localStorage.getItem('bgImg');
console.log(bgUrl);
bgUrl && (document.body.style.backgroundImage = `url(${bgUrl})`);
