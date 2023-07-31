import fs from 'fs';
import parseMD from 'parse-md';
import * as markdown from 'markdown-wasm';

const filenames = fs.readdirSync('./_posts');

filenames.forEach(file => {
    let data;
    try {
        data = fs.readFileSync(`./_posts/${file}`, 'utf8');
    } catch (err) {
        console.error(err);
    }

    const { metadata, content } = parseMD(data);

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
                console.error(err)
            }
    });
});
