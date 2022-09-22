const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB: ', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Please enter a name']
  },
  number: {
    type: String, 
    minLength: 8,
    required: [true, 'Please enter a number'],
    // validate: {
    //     validator: function(v) {
    //         console.log('hier bin ich ' + v.length)
    //         const numberLength = v.length
    //         if(v.includes("-")){
    //             if(v.charAt(2) === '-'){
    //                 return /\d{2}-\d{v.length - 3}/.test(v)
    //             }else if(v.charAt(3) === '-'){
    //                 return /\d{3}-\d{v.length - 4}/.test(v)
    //             }
    //             return false
    //         }else {
                    
    //             return /\d{Number(v.length)}/.test(v)
    //         }
    //     }, 
    //     message: props => `${props.value} is not a valid phone number`
    // }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)