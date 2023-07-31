import fs from 'fs';
import parseMD from 'parse-md';
import * as markdown from 'markdown-wasm';

const filenames = fs.readdirSync('./_posts');
let postData = { data: [] }

filenames.forEach(file => {
    let data;
    try {
        data = fs.readFileSync(`./_posts/${file}`, 'utf8');
    } catch (err) {
        console.error(err);
    }

    const { metadata, content } = parseMD(data);
    postData.data.push(metadata);

    const htmlContent = markdown.parse(content);

    let template;
    try {
        template = fs.readFileSync('./_template.html', 'utf8');
    } catch (err) {
        console.error(err);
    }
    const output = template.replace(/{markdown}/, htmlContent);

    fs.writeFile(`./posts/${metadata.title.replace(/\s+/g, '-').toLowerCase()}.html`,
        output, (err) => {
            if (err) {
                console.error(err);
            }
    });
});

let pdata = postData['data'];
pdata.sort((a, b) => {
    if (a.date < b.date) {
        return 1;
    } else if (a.date > b.date) {
        return -1;
    } else {
        return 0;
    }
});
postData.data = pdata;
fs.writeFile('./postdata.json', JSON.stringify(postData), (err) => {
    if (err) {
        console.error(err);
    }
});
