function articleSearch() {
    input = document.getElementById('articleSearch');
    search = input.value.toLowerCase();
    pList = allPosts.filter((post) => {
        console.log(post.tags.filter(str => str.includes(search)));
        return post.title.toLowerCase().includes(search) ||
            post.description.toLowerCase().includes(search) ||
            post.tags.filter(str => str.includes(search)).length > 0;
    });
    page = 1;
    pageMax = Math.ceil(pList.length / pageSize);
    removeArticles();
    addArticles(paginate(pList, page, pageSize));
}

function addArticles(posts) {
    const pageCount = document.getElementById('pageCount');
    pageCount.textContent = `${page} of ${pageMax}`;
    posts.forEach(post => {
        const article = document.createElement('div');
        article.classList.toggle('article');

            const postTitle = document.createElement('div');
            postTitle.classList.toggle('title');
                const postLink = document.createElement('a');
                postLink.href = `./posts/${post.title.replace(/\s+/g, '-')
                        .toLowerCase()}.html`;
                postLink.textContent = post.title;
                postTitle.appendChild(postLink);
            article.appendChild(postTitle);
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
            article.appendChild(tagList);
            const postDesc = document.createElement('div');
            postDesc.classList.toggle('desc');
            postDesc.textContent = post.description;
            article.appendChild(postDesc);
            const postDate = document.createElement('div');
            postDate.classList.toggle('date');
            postDate.textContent = new Date(Date.parse(post.date)).toDateString();
            article.appendChild(postDate);

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
    const postTitle = document.querySelector('.search div');
    postTitle.textContent = `${tag}`;
    pList = allPosts.filter((post) => {
        return post.tags.includes(tag);
    });
    page = 1;
    pageMax = Math.ceil(pList.length / pageSize);
    prevBtn.disabled = true;
    nextBtn.disabled = !(pageMax > 1);
    removeArticles();
    addArticles(paginate(pList, page, pageSize));
}

let allPosts;
let pList;
let page = 1;
const pageSize = 10;
let pageMax;
const prevBtn = document.querySelector('#previous');
prevBtn.disabled = true;
prevBtn.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        removeArticles();
        addArticles(paginate(pList, page, pageSize));
        if (page == 1) {
            prevBtn.disabled = true;
        }
        nextBtn.disabled = false;
    }
});
const nextBtn = document.querySelector('#next');
nextBtn.addEventListener('click', () => {
    if (page < pageMax) {
        page += 1;
        removeArticles();
        addArticles(paginate(pList, page, pageSize));
        if (page == pageMax) {
            nextBtn.disabled = true;
        }
        prevBtn.disabled = false;
    }
});
const postsBtn = document.querySelector('#postsBtn');
postsBtn.addEventListener('click', () => {
    pList = allPosts;
    page = 1;
    pageMax = Math.ceil(pList.length / pageSize);
    prevBtn.disabled = true;
    nextBtn.disabled = false;
    const postTitle = document.querySelector('.search div');
    postTitle.textContent = 'Posts';
    removeArticles();
    addArticles(paginate(pList, page, pageSize));
});

const container = document.querySelector('.articles');
fetch('https://ag-dragon.github.io/postdata.json')
    .then((res) => res.json())
    .then((data) => {
        allPosts = data.data;
        pList = allPosts;
        pageMax = Math.ceil(pList.length / pageSize);
        addArticles(pList);
    })
    .catch((err) => {
        console.error(err);
    });
