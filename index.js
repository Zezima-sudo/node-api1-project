
const port = 5000;
const express = require('express')
const server = express()
server.use(express.json())

server.listen(port, () => console.log('API running'))



let users = [
    {
        id: 1,
        name: 'Maycie',
        bio: 'Mom'
    },
    {
        id: 2,
        name: 'Eric',
        bio: 'Dad'
    },
    {
        id: 3,
        name: 'Tristan',
        bio: 'Son'
    }
]

let nextId = 4


// get
server.get('/users', (req, res) => {
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

// GET request for specific id

server.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const users = users.filter(u => u.id !== id)
    const found = users.find(u => u.id === id)

    if (found) {
        if(!found) {
            res.status(500).json({
                errorMessage: "The user information could not be retrieved."
            })
        } else {
            res.status(200).json(found)
        } 
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
})




//POST
server.post('/api/user', (req, res) => {
    const data = req.body;

    if(!data.name || !data.bio) {
        res.status(400).json({
            error: 'errpr status 400'
        })
    } else {
        database.push({id: nextID++, ...data}) ? res.status(201).json({data, database}) : res.status(500).json({
            error: 'YOU DONE GOOFED'
        })
        
    }
})

//put

server.put('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const changes = req.body
    const found = users.find(u => u.id === id)

    if (!changes.name || !changes.bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        })
    } else if (found) {
        if (found) {
            Object.assign(found, changes)
            res.status(200).json({ data: users })
        } else {
            res.status(500).json({
                errorMessage: "The user information could not be modified."
            })
        } 
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    users = users.filter(u => u.id !== id)
    res.json(found)
})

// DELETE

server.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = users.find(u => u.id === id)
    users = users.filter(u => u.id !== id)

    if (!found) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else {
        if(found) {
            res.status(200).json({ data: users })
        } else {
            res.status(500).json({
                errorMessage: "The user could not be removed."
            })
        }
    }
})