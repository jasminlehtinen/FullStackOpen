const express = require('express')
const app = express()

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

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)