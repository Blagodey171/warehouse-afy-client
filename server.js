const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8080

async function start() {
    try {
        app.listen(PORT, () => {
            console.log('client starting')
        })
    } catch (e) {
        console.log(e)
    }
}
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


start()