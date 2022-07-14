const express = require('express')
const app = express()
const port = 5000
const router = require('./src/routes')
const cors = require('cors')

require('dotenv').config()

app.use(express.json())
app.use(cors());
// Add endpoint grouping and router
app.use('/api/v1/', router)
app.use("/uploads", express.static("uploads"))


app.listen(port, () => console.log(`Server running on port ${port}`))