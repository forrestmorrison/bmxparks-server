const express = require("express")
const port = process.env.PORT || 4000
const bodyParser = require("body-parser")
const app = express()
const parksRouter = require('./routers/parks');
const authRouter = require('./routers/auth');

// const cors = require("cors")


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/parks', parksRouter)
app.use('/auth', authRouter)

// app.use(cors())

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}`)
})