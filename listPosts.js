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
                        const tagButton = document.createElement('button');
                        tagButton.textContent = tag;
                        tagButton.classList.toggle('tag');
                        tagButton.addEventListener('click', () => {
                            selectTag(tag);
                        });
                        tagli.appendChild(tagButton);
                        tagList.appendChild(tagli);
                    });
                postInfo.appendChild(tagList);
            article.appendChild(postInfo);

        container.appendChild(article);
                });
}

function removeArticles() {
    const articles = document.querySelector('.articles');
    articles.innerHTML = '';
}

function paginate(data, page, pageSize) {
    return data.slice(
        (page-1)*pageSize,
        page*pageSize
    );
}

function selectTag(tag) {
    pList = allPosts.filter((post) => {
        return post.tags.includes(tag);
    });
    page = 1;
    pageMax = Math.ceil(pList.length / pageSize);
    removeArticles();
    add_articles(paginate(pList, page, pageSize));
}

let allPosts;
let pList;
let page = 1;
const pageSize = 10;
let pageMax;
const prevBtn = document.querySelector('#previous');
prevBtn.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        removeArticles();
        add_articles(paginate(pList, page, pageSize));
    }
});
const nextBtn = document.querySelector('#next');
nextBtn.addEventListener('click', () => {
    if (page < pageMax) {
        page += 1;
        removeArticles();
        add_articles(paginate(pList, page, pageSize));
    }
});
const postsBtn = document.querySelector('#postsBtn');
postsBtn.addEventListener('click', () => {
    pList = allPosts;
    page = 1;
    pageMax = Math.ceil(pList.length / pageSize);
    removeArticles();
    add_articles(paginate(pList, page, pageSize));
});

const container = document.querySelector('.articles');
fetch('https://ag-dragon.github.io/postdata.json')
    .then((res) => res.json())
    .then((data) => {
        allPosts = data.data;
        pList = allPosts;
        pageMax = Math.ceil(pList.length / pageSize);
        add_articles(pList);
    })
    .catch((err) => {
        console.error(err);
    });
