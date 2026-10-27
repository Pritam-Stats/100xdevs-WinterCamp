// using callbacks


const fs = require("fs");
fs.readFile("a.txt", 'utf-8', (err, data) => {
    if (err) {
        console.log("oops", err);
        return
    }
    console.log(data);
})