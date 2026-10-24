const express = require("express");

const app = express();

app.use(express.json()) //imp middleware to parse/read the json requests 

let notes = [];

app.get("/about", (req, res) => {
    res.status(200).send("<h1>Hello there...</h1>")
})


//get endpoints to fetch all the notes

app.get("/notes", (req, res) => {
    res.status(200).json({
        success: true,
        notes: notes,
        message: "Notes fetched successfully",
        data: null
    })
})


//post
app.post("/notes", (req, res) => {
    const {title, description} = req.body;
    let newNote = {title, description};

    notes.push(newNote);

    res.status(201).json({
        success: true,
        message: "Notes Created",
        data: newNote
    })
})

//query search filtering

app.get("/notes/search", (req, res) => {
    const title = req.query.title;

    if(typeof title !== "string") {
        return res.status(404).json({
            success: false,
            message: "Provide a valid title."
        })
    }

    const filteredNotes = notes.filter( (note) => 
        typeof note.title === "string" && note.title.toLowerCase().includes(title.toLowerCase())
    )

    res.status(200).json({
        success: true,
        message: "Successfully found note.",
        notes: filteredNotes
    })
})


app.get("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<0 || id >= notes.length) {
        return res.status(404).json({
            success: false,
            message: "Invalid id, no notes found"
        })
    }

    return res.status(200).json({
        note: notes[id],
        success: true,
        message: "Note Found"
    })
})


app.put("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 0 || id >= notes.length) {
        return res.status(404).json({
            success: false,
            message: "Invalid id, no notes found"
        })
    }

    const {title, description} = req.body;
    notes[id] = {title, description};

    return res.status(200).json({
        success: true,
        message: "Note updated successfully.",
        updatedNote: notes[id]
    })

})


app.patch("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 0 || id >= notes.length) {
        return res.status(404).json({
            success: false,
            message: "Invalid id, no notes found"
        })
    }

    const {title, description} = req.body;

    if (title !== undefined && description !== undefined) {
        return res.status(400).json({
            Success: false,
            Message: "Not allowed. You can only update one field."
        })
    }
    
    if (title === undefined && description === undefined) {
        return res.status(400).json({
            Success: false,
            Message: "Not allowed. Give only one field to update. otherwise use put method"
        })
    }

    if (title !== undefined) {
        notes[id].title = title;
    } else if (description !== undefined) {
        notes[id].description = description;
    }

    return res.status(200).json({
        success: true,
        message: "Title updated successfully.",
        data: notes[id]
    })
})


app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<0 || id >= notes.length){
        return res.status(404).json({
            success: false,
            message: "It does not exist."
        })
    }
    const deletedNote = notes.splice(id, 1);
    console.log(deletedNote);

    return res.status(201).json({
        success: true,
        message: `The note: ${deletedNote[0].title} is deleted.`,
        deletedNote
    })

})





app.listen(3000, () => {
    console.log(`Running on http://localhost:3000`);
    
})