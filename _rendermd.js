import fs from 'fs';
import parseMD from 'parse-md';
import * as markdown from 'markdown-wasm';

const filenames = fs.readdirSync('./_posts');
console.log(filenames);

filenames.forEach(file => {
    let data;
    try {
        data = fs.readFileSync(`./_posts/${file}`, 'utf8');
    } catch (err) {
        console.error(err);
    }

    const { metadata, content } = parseMD(data);
    console.log(metadata);
    console.log(metadata.date.getFullYear());
    console.log(metadata.date.getMonth());
    console.log(metadata.date.getDate());

    const htmlContent = markdown.parse(content);

    const output =
`<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Personal Site</title>
        <link rel="stylesheet" href="../style.css" />
    </head>
    <body>
        <div class="header">
            <div class="logo">Title</div>
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../projects.html">Projects</a></li>
            </ul>
        </div>

        ${htmlContent}
    </body>
</html>`;

    fs.writeFile(`./posts/${metadata.title.replace(/\s+/g, '-').toLowerCase()}.html`,
        output, (err) => { console.error(err) });
});
