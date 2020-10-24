const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let contacts = [
    {
        "name": "Ada Lovelace",
        "number": "040-1234567",
        "id": 1
    },
    {
        "name": "Margaret Hamilton",
        "number": "040-9876543",
        "id": 2
    },
    {
        "name": "Grace Hopper",
        "number": "050-1234567",
        "id": 3
    },
    {
        "name": "Joan Clarke",
        "number": "050-9876543",
        "id": 4
    },
    {
        "name": "Mary Sue",
        "number": "050-5559876",
        "id": 5
    },
    {
        "name": "Jasmin Lehtinen",
        "number": "040-5559876",
        "id": 6
    }
]

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
    res.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
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

    const isDuplicate = contacts.find(contact => contact.name === body.name)

    if (isDuplicate) {
        return response.status(400).json({
            error: 'Name already added'
        })
    }

    const contact = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    contacts = contacts.concat(contact)

    response.json(contact)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)