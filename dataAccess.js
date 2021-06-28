const fs = require('fs');
const path = require('path');

module.exports = (currentPath) => {
    const processFile = fs.readFileSync(path.resolve() + `${currentPath}`, 'utf-8');

    return JSON.parse(processFile);
}