const container = document.querySelector('.articles');
fetch('https://ag-dragon.github.io/postdata.json')
    .then((res) => res.json())
    .then((data) => {
        data.data.forEach(post => {
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
            postLink.href = `./posts/${post.title.replace(/\s+/g, '-').toLowerCase()}.html`;
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
    })
    .catch((err) => {
        console.error(err);
    });
