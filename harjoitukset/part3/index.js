const express = require ('express')
const app = express()

app.use(express.json())

let notes = [
    {
        id: 1,
        content: "Sota on rauhaa",
        date: "2020-01-10T17:30:31.098Z",
        impotant: true
    },
    {
        id: 2,
        content: "Vapaus on orjuutta",
        date: "2020-01-10T18:39:34.091Z",
        impotant: false
    },
    {
        id: 3,
        content: "Tietämättömyys on voimaa",
        date: "2020-01-10T19:20:14.298Z",
        impotant: true
    }
]

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0 
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>1984</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id === id)

    response.status(204).end()
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)