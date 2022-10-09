const request = require('postman-request')
const express = require("express")
const app = express()
const cors = require('cors')

app.use(cors())

const port = 3001
const exchangeRateUrl = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt"

// TODO - add date select
app.get("/exchange-rate", (req, res) => {
    request(exchangeRateUrl, (error, response, body) => {
        if (response.statusCode === 200) {
            if (!body)
                return res.status(400).send('No response data!')

            // TODO - optimize to loop the data only once
            // TODO - add data validation

            const lineParse = body.split('\n')

            // DATE
            const date = lineParse[0]
            const lastUpdate = date.split(' ')[0]

            // TABLE HEADER
            const tableHeader = lineParse[1].split('|')

            // DATA
            const data = []
            for (let i = 2; i < lineParse.length; i++) {
                if (lineParse[i]) {
                    const line = lineParse[i]?.split('|')

                    const map = new Map([
                        [line[3],
                        {
                            country: line[0],
                            currency: line[1],
                            amount: line[2],
                            code: line[3],
                            rate: line[4].replace(',', '.')
                        }]
                    ]);
                    const currency = Object.fromEntries(map);

                    data.push(currency)
                }
            }

            return res.send({ lastUpdate, tableHeader, data })
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