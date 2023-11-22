/*
 * @Author: joy 1686452422@qq.com
 * @Date: 2023-06-05 14:56:58
 * @LastEditors: joy 1686452422@qq.com
 * @LastEditTime: 2023-11-21 16:03:15
 * @FilePath: /02-javaScript/04-Ajax /05-黑马头条案例/page/login/index.js
 */
/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */
document.querySelector('.btn').addEventListener('click', () => {
    const form = document.querySelector('.login-form');
    const data = serialize(form, { hash: true, empty: true });
    console.log(data);
    axios({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: data
    }).then(result => {
        localStorage.setItem('token', result.data.token);
        myAlert(true, '登录成功');
        setTimeout(() => {
            location.href = '../content/index.html';
        }, 1000);
    }).catch(error => {
        myAlert(false, '登录失败');
        // console.dir(error);
    });
});
