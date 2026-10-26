const express = require('express')
//console.log(typeof express);
const { z, success } = require("zod")
const fs = require("fs")
const mongoose = require("mongoose");


const app = express();

const createTodoSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(1)
        .max(30),
    desc: z
        .string({ required_error: "Description is required" })
        .min(1)
        .max(100)
})

app.use(express.json())
let todos = [
    {
        "title" : "Task 1",
        "desc" : "Do by EOD"
    }
];

app.post("/todos", (req, res) => { //create an entry in server
    
    try {
        // const {data, success} = createTodoSchema.safeParse(req.body)
        const parsed = createTodoSchema.safeParse(req.body);
        if(!parsed.success) {
            const formattedError = parsed.error.issues.map((issues) => ({
                field: issues.path.join("."),
                message: issues.message
            }));

            return res.status(400).json({
                success: false,
                message: "Invalid error",
                errors: parsed.error.flatten().fieldErrors
                // errors: parsed.error.issues
                // errors: formattedError
            })
        }
        let content = parsed.data;
        todos.push(content);

        return res.status(201).json({
            success: true,
            message: "todo created successfully",
            data: []
        })

    } catch(error) {
        res.status(500).json({
            message: `Internal server error ${error}`
        })
    }


    
})
//conventional structure of res
app.get("/todos", (req, res) => {   //fetch data from server
    res.send(todos)
    res.status(200).json({
        success: true,
        message: "fetched successfully",
        data: todos
    })
});

// app.put("/todos/:id/:id2", (req,res) => {
//     const id1 = req.params.id
//     const id2 = req.params.id2

//     todos[id1] = req.body
//     res.status(200).json({
//         success: true,
//         message: "todo updated successfully",
//         data: []
//     })
// })

fs.readFile("db.txt", 'utf-8', () => {})

app.listen(3000, () => {
    console.log(`Server is running on localhost:3000`);
    
});
