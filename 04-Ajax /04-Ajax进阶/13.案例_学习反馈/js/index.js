/*
 * @Author: joy 1686452422@qq.com
 * @Date: 2023-06-05 14:56:48
 * @LastEditors: joy 1686452422@qq.com
 * @LastEditTime: 2023-11-20 16:43:48
 * @FilePath: /02-javaScript/04-Ajax /04-Ajax进阶/13.案例_学习反馈/js/index.js
 */
/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */

axios({
    url: 'http://hmajax.itheima.net/api/province'
}).then(result => {
    // console.log(result);
    const optionStr = result.data.list.map(pname => ` <option value="${pname}">${pname}</option>`).join('');
    // console.log(optionStr);
    document.querySelector('.province').innerHTML = ` <option value="">省份</option>` + optionStr;
})

document.querySelector('.province').addEventListener('change', async e => {
    // console.log(e.target.value);
    const result = await axios({ url: 'http://hmajax.itheima.net/api/city', params: { pname: e.target.value } })
    // console.log(result);
    const optionStr = result.data.list.map(cname => `<option value="${cname}">${cname}</option>`).join('');
    // console.log(optionStr);
    document.querySelector('.city').innerHTML = `<option value="">城市</option>` + optionStr;

    // 清空地区数据
    document.querySelector('.area').innerHTML = ` <option value="">地区</option>`;
})


document.querySelector('.city').addEventListener('change', async e => {
    // console.log(e.target.value);
    const result = await axios({ url: 'http://hmajax.itheima.net/api/area', params: { pname: document.querySelector('.province').value, cname: e.target.value } })
    // console.log(result);
    const optionStr = result.data.list.map(aname => `<option value="${aname}">${aname}</option>`).join('');
    document.querySelector('.area').innerHTML = `<option value="">地区</option>` + optionStr;
})


document.querySelector('.submit').addEventListener('click', async () => {
    const from = document.querySelector('.info-form');
    const data = serialize(from, { hash: true, empty: true });
    console.log(data);
    try {
        const result = await axios({
            url: 'http://hmajax.itheima.net/api/feedback',
            method: 'POST',
            data
        })

        console.log(result);
        alert(result.data.message);
    } catch (err) {
        console.log(err);
    }
})