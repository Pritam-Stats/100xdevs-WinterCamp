const fs = require("fs/promises");

async function main() {
    const data = await fs.readFile("a.txt", 'utf-8')
    console.log(data);
    return 1;
}

main()
    .then(data => console.log(data))
    .catch(err => console.log(err));
console.log("hi there");
