const fs = require('fs');
const path = require('path');

module.exports = class File {
    constructor() {
        this.dataFile = fs.readFileSync(path.resolve() + '/data/home.json', 'utf-8');
    }

    convertFileData() {
        return JSON.parse(this.dataFile);
    }
}