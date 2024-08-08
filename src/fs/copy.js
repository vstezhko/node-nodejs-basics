import { access, constants } from 'node:fs/promises';
import { readdir, mkdir, appendFile, readFile } from 'node:fs/promises';


const pathToCopy = `src/fs/files`;
const pathToCreate = `src/fs/files_copy`;

const copy = async () => {

    try {

        await access(pathToCopy, constants.R_OK | constants.W_OK);

        try {
            await access(pathToCreate, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
        }

        await mkdir(pathToCreate);
        const files = await readdir(pathToCopy);
        files.forEach( async(file) => {
            const contents = await readFile(`${pathToCopy}/${file}`, { encoding: 'utf8' });
            await appendFile(`${pathToCreate}/${file}`, contents);
        })
        console.log('Files copied successfully');

    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();
