/*
 * @Author: joy 1686452422@qq.com
 * @Date: 2023-06-05 14:56:18
 * @LastEditors: joy 1686452422@qq.com
 * @LastEditTime: 2023-11-14 17:52:46
 * @FilePath: /02-javaScript/04-Ajax /02-Ajax案例/05.案例-个人信息设置/js/index.js
 */
/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'lmx';

axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(result => {
    // console.log(result);
    const userObj = result.data.data;
    Object.keys(userObj).forEach(key => {
        if (key === 'avatar') {
            document.querySelector('.prew').src = userObj[key];
        } else if (key === 'gender') {
            const gRadioList = document.querySelectorAll('.gender');
            const gNum = userObj[key];
            gRadioList[gNum].checked = true;
        } else {
            document.querySelector(`.${key}`).value = userObj[key];
        }
    })
});


// 文件选择元素绑定事件
document.querySelector('.upload').addEventListener('change', e => {
    console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append('avatar', e.target.files[0]);
    fd.append('creator', creator);

    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'PUT',
        data: fd
    }).then(result => {
        // console.log(result);
        const imgUrl = result.data.data.avatar;
        document.querySelector('.prew').src = imgUrl;
    });
});

// 提交表单
document.querySelector('.submit').addEventListener('click', () => {
    const userForm = document.querySelector('.user-form');
    const userObj = serialize(userForm, { hash: true, empty: true });
    // console.log(userObj);
    userObj.creator = creator;
    // 性别数字字符串转数字类型
    userObj.gender = +userObj.gender;
    console.log(userObj);
    // 提交到服务器
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: userObj
    }).then(result => {
        // console.log(result);
        const toastDom = document.querySelector('.my-toast');
        const toast = new bootstrap.Toast(toastDom);
        toast.show();
    });
});

