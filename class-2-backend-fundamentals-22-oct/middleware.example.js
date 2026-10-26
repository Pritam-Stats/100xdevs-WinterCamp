const express = require("express");
const app = express();

function checkAge(req, res, next){
    const age = Number(req.query.age) || 16;
    if (!Number.isFinite(age) || age < 18) {
        return res.status(403).json({
            message: "You must be at least 18y old to view the page"
        })
    }

    next();


}

app.get("/restricted", checkAge, (req, res) => {
    res.status(200).send(`<h1>Welcome to the Restricted page</h1> <br> because you are years old`)
})

app.listen(3000, () => {
    console.log(typeof checkAge);
    console.log(typeof next);
})

