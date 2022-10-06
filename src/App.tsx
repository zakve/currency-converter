import React, { useEffect, useState } from 'react';

const exchangeRateUrl = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt"

function App() {
  const [exchangeRate, setExchangeRate] = useState(undefined)

  useEffect(() => {
    const fetchExchangeData = async () => {
      const response = await fetch(exchangeRateUrl, {
        method: 'GET',
        // mode: 'no-cors',
        // credentials: 'same-origin',
        // headers: {
        //   'Content-Type': 'text/plain;charset=UTF-8'
        // },
        // referrerPolicy: 'origin-when-cross-origin',
        // redirect: 'follow'
      })
      console.log(response)
      const dataText = await response.text()
      console.log(dataText)
    }

    fetchExchangeData()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        Currency Converter
      </header>
      <main>
        <div className='Convert-box'>
        </div>
        <div className='Exchange-rate-table'>

        </div>
      </main>
    </div>
  );
}

export default App;
