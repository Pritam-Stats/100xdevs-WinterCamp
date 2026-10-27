const fs = require("fs")

//making an async fn
function readFromAWriteToB(input, output, cb) {
    fs.readFile()
}



function readTimer(n, m, path, cb){
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            cb("error while reading file")
        }
        else {
            setTimeout(() => {
                fs.writeFile(path, data.toUpperCase(), (err, data) => {
                    if (err) {
                        cb("error while write to file")
                    } else {
                        setTimeout(() => {
                            cb(null, "");
                        }, m)
                    }
                })
            }, n);
            cb(null, "")
        }

    })
}

readTimer(1000, 2000, 'a.txt', (err, data) =>{
    if (err) console.log(err);
    else console.log("success");
    
})