/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */


const creator = 'lmx';

function getBooksList() {

    //获取数据
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            creator
        }
    }).then(result => {
        console.log(result);
        const bookList = result.data.data;
        console.log(bookList);
        // 渲染数据
        const htmlStr = bookList.map((item, index) => {
            return `
            <tr>
            <td>${index + 1}</td>
            <td>${item.bookname}</td>
            <td>${item.author}</td>
            <td>${item.publisher}</td>
            <td data-id=${item.id}>
              <span class="del">删除</span>
              <span class="edit">编辑</span>
            </td>
          </tr>`;

        }).join('');
        console.log(htmlStr);
        document.querySelector('.list').innerHTML = htmlStr;
    })
}

// 网页加载运行 渲染
getBooksList();

// 创建弹框对象
const addModalDom = document.querySelector('.add-modal');
const addModal = new bootstrap.Modal(addModalDom);

// 保存按钮添加点击事件
document.querySelector('.add-btn').addEventListener('click', () => {

    const addForm = document.querySelector('.add-form');
    const bookObj = serialize(addForm, { hash: true, empty: true });
    console.log(bookObj);

    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'POST',
        data: {
            ...bookObj,
            creator: creator
        }
    }).then(result => {
        console.log(result);
        // 重新渲染
        getBooksList();
        // 重置表单
        addForm.reset();
        addModal.hide();

    })
})

// 删除图书

document.querySelector('.list').addEventListener('click', e => {
    //获取触发事件的目标元素
    if (e.target.classList.contains('del')) {
        // console.log('删除');
        const theId = e.target.parentNode.dataset.id;
        console.log(theId);
        //删除
        axios({
            url: `http://hmajax.itheima.net/api/books/${theId}`,
            method: 'DELETE'
        }).then(() => getBooksList());
    }
})

// 编辑图书

const editDom = document.querySelector('.edit-modal');
const editModal = new bootstrap.Modal(editDom);

// 编辑元素绑定点击事件
document.querySelector('.list').addEventListener('click', e => {

    //判断点击的是否为编辑
    if (e.target.classList.contains('edit')) {
        const theId = e.target.parentNode.dataset.id;
        // console.log(theId);
        axios({
            url: `http://hmajax.itheima.net/api/books/${theId}`,
        }).then(result => {
            // console.log(result);
            const bookObj = result.data.data;
            // document.querySelector('.edit-form .bookname').value = bookObj.bookname;
            // document.querySelector('.edit-form .author').value = bookObj.author;

            //遍历对象
            const keys = Object.keys(bookObj);
            // console.log(keys);
            keys.forEach(key => {
                document.querySelector(`.edit-form .${key}`).value = bookObj[key]
            })
        })
        editModal.show();
    }

})


// 修改按钮
document.querySelector('.edit-btn').addEventListener('click', () => {
    const editForm = document.querySelector(`.edit-form`);
    const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true });
    // console.log(bookObj);
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'PUT',
        data: {
            bookname,
            author,
            publisher,
            creator
        }
    }).then(() => {
        getBooksList();
        editModal.hide();
    });
});