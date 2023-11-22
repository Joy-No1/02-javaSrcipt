/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */

const queryObj = {
    status: '',
    channel_id: '',
    page: 1,
    per_page: 2,
}
let totalCount = 0;  //保存文章总条数

async function setArticalList() {
    const res = await axios({
        url: '/v1_0/mp/articles',
        params: queryObj
    });
    console.log(res);
    const htmlStr = res.data.results.map(item => `
        <td>
        <img
        src="${item.cover.type === 0 ? `https://img2.baidu.com/it/u=2640406343,1419332367&fm=253&fmt=auto&app=138&f=JPEG?w=708&h=500` : item.cover.images[0]}"
        alt="">
            </td>
            <td>${item.title}</td>
            <td>
            ${item.status === 1 ? `<span class="badge text-bg-primary">待审核</span>` : `<span class="badge text-bg-success">审核通过</span>`}  
            </td>
            <td>
                <span>${item.pubdate}</span>
            </td>
            <td>
                <span>${item.read_count}</span>
            </td>
            <td>
                <span>${item.comment_count}</span>
            </td>
            <td>
                <span>${item.like_count}</span>
            </td>
            <td>
                <i class="bi bi-pencil-square edit"></i>
                <i class="bi bi-trash3 del"></i>
            </td>
    `).join('');
    document.querySelector('.art-list').innerHTML = htmlStr;
    totalCount = res.data.total_count;
    document.querySelector('.total-count').innerHTML = `共${totalCount}条`
}

setArticalList();
/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */
document.querySelectorAll('.form-check-input').forEach(radio => {
    radio.addEventListener('change', e => {
        queryObj.status = e.target.value;
    })
})


document.querySelector('.form-select').addEventListener('change', e => {
    queryObj.channel_id = e.target.value;
})


document.querySelector('.sel-btn').addEventListener('click', () => {
    setArticalList();
})

document.querySelector('.next').addEventListener('click', e => {
    if (queryObj.page < Math.ceil(totalCount / queryObj.per_page)) {
        queryObj.page++;
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`;
        setArticalList();
    }
})


document.querySelector('.last').addEventListener('click', e => {
    if (queryObj.page > 1) {
        queryObj.page--;
        document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`;
        setArticalList();
    }
})

document.querySelector('.art-list').addEventListener('click', async e => {
    if (e.target.classList.contains('del')) {
        const delId = e.target.parentNode.dataset.id;
        const res = await axios({
            url: `/v1_0/mp/articles/${delId}`,
            method: 'DELETE'
        });
        const children = document.querySelector('.art-list').children;
        if (children.length === 1 && queryObj.page !== 1) {
            queryObj.page--;
            document.querySelector('.page-now').innerHTML = `第${queryObj.page}页`
        }
        setArticalList();
    }
})

document.querySelector('.art-list').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        const artId = e.target.parentNode.dataset.id;
        // console.log(artId);
        location.href = `../publish/index.html?id = ${artId}`;
    }
})

