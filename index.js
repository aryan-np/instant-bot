
const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git')();
const FILE_PATH = './data.json';

const makeCommit = (n) => {
    const DATE = moment().format('YYYY-MM-DD HH:mm:ss'); // Get the current date and time
    const data = { date: DATE };
    console.log(`Committing for date: ${DATE}`);

    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit.add([FILE_PATH]).commit(`commit ${n}`, {
            '--date': DATE,  // Specify the commit date
        }, (err) => {
            if (err) {
                console.error(`Error committing for date ${DATE}: ${err}`);
                return;
            }
            console.log(`Committed successfully for date: ${DATE}`);
            
            // If n > 1, recursively make more commits
            if (n > 1) {
                makeCommit(n - 1);
            } else {
                console.log("All commits completed.");
            }
        });
    });
};

// Make 3 commits (adjust the number as needed)
makeCommit(3);
