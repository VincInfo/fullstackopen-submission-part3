const { response, json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
// app.use(morgan('tiny'))

morgan.token('content', function getId (req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))



let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const myDate = new Date()
    response.send('<p>Phonebook has info for 2 people <br></br>' + myDate + '</p>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const maxId = Math.max(...persons.map(p => p.id))
    if (id <= maxId) {
        const person = persons.find(p => p.id == id)
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id != id)
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 100)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    // console.log(body);
    const duplicate = persons.find(p => p.name === body.name)
    if(duplicate){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    const person = {
      id: generateId(),
    //   id: body.id,
      name: body.name,
      number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
  })


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})