const mongoose = require('mongoose')



if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = 'mongodb+srv://2privileged:' + password + '@phonebook.qypsmci.mongodb.net/?retryWrites=true&w=majority'

const name = process.argv.length > 5 ? process.argv[3] + ' ' + process.argv[4] : process.argv[3]
const number = process.argv[process.argv.length - 1]

const noteSchema = mongoose.Schema({
    name: String,
    number: String
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 3) {
    Note.find({}).then(person => {
        person.forEach(p => console.log(p.name))
        mongoose.connection.close()
        return
    })
} else {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            const note = Note({
                name: name,
                number: number
            })

            return note.save()
        })
        .then(() => {
            console.log('note saved!')
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}

