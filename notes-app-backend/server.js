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
    //let add a little safety checks
    const {title, description} = req.body || {};
    
    if (typeof title !== "string" || typeof description !== "string"){
        return res.status(400).json({
            success: false,
            message: "No title and description received",
            data: null
        })
    }
    let newNote = {id: Number(Date.now()), title, description};

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
        data: filteredNotes
    })
})


app.get("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<0) {
        return res.status(404).json({
            success: false,
            message: "Invalid id, no notes found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Note Found",
        data: notes.filter(n => n.id == id)[0]
    })
})


app.put("/notes/:id", (req, res) => {
    //put replaces the whole data, even if the client only sends one field put will wipe out the whole field and replace the new data field
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 0 || id >= notes.length) {
        return res.status(404).json({
            success: false,
            message: "Invalid id, no notes found",
            data: null
        })
    }

    const {title, description} = req.body;
    
    //have to find the index ig
    const index = notes.findIndex(n => n.id == id)
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Id Doesn't exist",
            data: null
        })
    }
    // const index = notes.indexOf(notes.filter(n=>n.id == id)[0])
    notes[index] = {title, description, id: Date.now()};

    return res.status(200).json({
        success: true,
        message: "Note updated successfully.",
        data: `Updated note: ${notes[id]}`
    })

})


app.patch("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 0) {
        return res.status(404).json({
            success: false,
            message: "Invalid id, no notes found"
        })
    }

    const {title, description} = req.body;
    let toUpdate = null;
    
    if (title === undefined && description === undefined) {
        return res.status(400).json({
            success: false,
            message: "Bad req. Nothing received. Nothing Updated"
        })
    }
    const index = notes.findIndex(n => n.id == id)
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Id Doesn't exist",
            data: null
        })
    }
    if (title !== undefined) {
        notes[index].title = title;
        toUpdate = "Title"
    } if (description !== undefined) {
        toUpdate = "Description"
        notes[index].description = description;
    }

    return res.status(200).json({
        success: true,
        message: `${toUpdate} updated successfully.`,
        data: notes[id]
    })
})


app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<0 ){
        return res.status(404).json({
            success: false,
            message: "It does not exist."
        })
    }
    // let targetElem = notes.filter(n => n.id == id) //filter returns a new array
    // const index = notes.indexOf(targetElem[0])   //This fails when the filtered array is empty, meaning the ID does not exist.

    //so we have findIndex
    const index = notes.findIndex(n => n.id == id)
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Id Doesn't exist",
            data: null
        })
    }
    const deletedNote = notes.splice(index, 1);
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