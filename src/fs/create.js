import { access, constants } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';

const fileName = 'fresh.txt'
const pathToCheck = `src/fs/files/${fileName}`;
const data = 'I am fresh and young'

const create = async () => {
    try {
        await access(pathToCheck, constants.R_OK | constants.W_OK);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await writeFile(pathToCheck, data);
            console.log('File created successfully');
        } else {
            throw err;
        }
    }
};

await create();
