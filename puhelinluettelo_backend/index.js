require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const { request, response } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

app.get('/', (req, res) => {
    res.send('<h2>Phonebook</h2>')
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.write(`<p>Phonebook has info for ${contacts.length} people</p>`)
    res.write(`${date}`)
    res.end()
})

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    })
})

const generateId = () => {
    const id = Math.floor(Math.random() * 500)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Add both name and number!'
        })
    }

    // Check to see if the name already exists
    /*const isDuplicate = contacts.find(contact => contact.name === body.name)
    if (isDuplicate) {
        return response.status(400).json({
            error: 'Name already added'
        })
    }*/

    const contact = new Contact({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
