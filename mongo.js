const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = 'mongodb+srv://2privileged:' + password + '@phonebook.qypsmci.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url).then(console.log('connected'))

const noteSchema = mongoose.Schema({
  name: String,
  number: String
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 3) {
  Note.find({}).then(Notes => {
    console.log('phonebook:')
    Notes.forEach(Note => console.log(Note.name + ' ' + Note.number))
    mongoose.connection.close()
  })
    .catch((err) => console.log(err))
} else {
  const Note = new Note({
    name: name,
    number: number
  })
  Note.save().then(() => {
    console.log('Note saved!')
    mongoose.connection.close()
  })
    .catch((err) => console.log(err))
}

