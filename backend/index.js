//we bring database here
const connectToMongo = require('./db')
//To run bacend API on front end
var cors = require('cors')

//We bring express here
const express = require('express')
const app = express()
const port = 5000

connectToMongo();

//To run backend
app.use(cors())
app.use(express.json())


//You cannot used directly req.body to use this we need middleware that is aap.use in index.js
app.use(express.json());

// Create routes that are in tha folder we use router inside the folder
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost: ${port}`)
})


