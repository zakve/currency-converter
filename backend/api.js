const request = require('postman-request')
const express = require("express")
const app = express()
const cors = require('cors')

app.use(cors())

const port = 3001
const exchangeRateUrl = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt"

app.get("/exchange-rate", (req, res) => {
    request(exchangeRateUrl, (error, response, body) => {
        if (response.statusCode === 200) {
            return res.send(body)
        }

        res.status(500).send('Unable to connect to National Bank service!')
    });
})

app.get('*', (req, res) => {
    res.status(404).send('404 page')
})

app.listen(port, () => {
    console.log('Server is up on port 3001')
})