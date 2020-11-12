/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Forgot password!')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@puhelinluettelo.iieai.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

const empty = process.argv[3]

if (!empty) {
  console.log('Phonebook:')

  Contact
    .find({})
    .then(result => {
      result.forEach(contact => {
        console.log(contact.name, contact.number)
        mongoose.connection.close()
      })
    })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const contact = new Contact({
    'name': name,
    'number': number,
  })

  contact.save().then(result => {
    console.log('Added', name, 'number', number, 'to the phonebook')
    mongoose.connection.close()
  })
}
