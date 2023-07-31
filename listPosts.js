function add_articles(posts) {
    posts.forEach(post => {
        const article = document.createElement('div');
        article.classList.toggle('article');

            const postDate = document.createElement('div');
            postDate.classList.toggle('date');
            postDate.textContent = new Date(Date.parse(post.date)).toDateString();
            article.appendChild(postDate);

            const postInfo = document.createElement('div');
                const postTitle = document.createElement('div');
                postTitle.classList.toggle('title');
                    const postLink = document.createElement('a');
                    postLink.href = `./posts/${post.title.replace(/\s+/g, '-')
                            .toLowerCase()}.html`;
                    postLink.textContent = post.title;
                    postTitle.appendChild(postLink);
                postInfo.appendChild(postTitle);
                const postDesc = document.createElement('div');
                postDesc.classList.toggle('desc');
                postDesc.textContent = post.description;
                postInfo.appendChild(postDesc);
                const tagList = document.createElement('ul');
                    post.tags.forEach(tag => {
                        const tagli = document.createElement('li');
                        tagli.textContent = tag;
                        tagList.appendChild(tagli);
                    });
                postInfo.appendChild(tagList);
            article.appendChild(postInfo);

        container.appendChild(article);
                    console.log(post);
                });
}

function remove_articles() {
    const articles = document.querySelector('.articles');
    articles.innerHTML = '';
}

function paginate(data, page, pageSize) {
    return data.slice(
        (page-1)*pageSize,
        page*pageSize
    );
}

let pList;
let page = 1;
const pageSize = 10;
let pageMax;
const prevBtn = document.querySelector('#previous');
prevBtn.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        remove_articles();
        add_articles(paginate(pList, page, pageSize));
    }
});
const nextBtn = document.querySelector('#next');
nextBtn.addEventListener('click', () => {
    if (page < pageMax) {
        page += 1;
        remove_articles();
        add_articles(paginate(pList, page, pageSize));
    }
});

const container = document.querySelector('.articles');
fetch('https://ag-dragon.github.io/postdata.json')
    .then((res) => res.json())
    .then((data) => {
        pList = data.data;
        pageMax = Math.ceil(pList.length / pageSize);
        add_articles(pList);
    })
    .catch((err) => {
        console.error(err);
    });
