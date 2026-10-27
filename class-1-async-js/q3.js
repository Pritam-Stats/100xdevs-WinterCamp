const fs = require("fs")

function createCode(input, cb) {
    fs.readFile(input, 'utf-8', (err, data) => {
        const parsedData = JSON.parse(data); //array of objs
        console.log(parsedData);
        let arrayLen = parsedData.length;
        let counter = 0;
        parsedData.forEach(element => {
            fs.writeFile(element.path, element.contents, () => {
                counter++;
                if (counter === arrayLen) {
                    cb();
                }
            })
        });
    })
}

createCode('d.txt', (err, data) => {
    if (err) console.log("oops");
    else {console.log("success : all files have been written");
    }
})