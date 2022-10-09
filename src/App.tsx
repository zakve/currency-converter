import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Button from './components/Button/Button';

const exchangeRateUrl = "http://localhost:3001/exchange-rate"

const Container = styled.div`
  `

const ConvertBox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
  `

const ExchangeRateTable = styled.div`
  `

interface ICurrency {
  country: string,
  currency: string,
  amount: string,
  code: string,
  rate: string
}

interface IDataObject {
  lastUpdate: string,
  tableHeader: [string],
  data: [{ currency: ICurrency }]
}

function App() {
  const [data, setData] = useState<IDataObject | undefined>(undefined)
  const [amount, setAmount] = useState<string | undefined>(undefined)
  const [currencySelect, setCurrencySelect] = useState<string | undefined>(undefined)
  const [calculated, setCalculated] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchExchangeData = async () => {
      try {
        const response = await fetch(exchangeRateUrl)
        if (response.ok) {
          const dataText = await response.json()
          setData(dataText)
        } else {
          alert(`Error: statusCode ${response.status}`)
        }
      } catch (error) {
        alert(`Error: ${error}`)
      }
    }

    fetchExchangeData()
  }, [])

  const handleSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalculated(undefined)
    setAmount(event.target.value)
  }

  const handleSetCurrencySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencySelect(event.target.value)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // validation
    if (!amount || isNaN(Number(amount)) || !currencySelect)
      return alert('You must fill in the amount and currency')

    // get currency data
    const selectedCurrency = data?.data.find(line => Object.keys(line)[0] === currencySelect)

    // calculate
    if (selectedCurrency && currencySelect) {
      const rate = Number(Object.values(selectedCurrency)[0].rate)
      const currencyAmount = Number(Object.values(selectedCurrency)[0].amount)

      setCalculated((Number(amount) / Number(rate) * Number(currencyAmount)).toString())
    }
  }

  return (
    <Container>
      <main>
        <h1>Currency Converter</h1>
        <ConvertBox>
          <form
            onSubmit={handleSubmit}
          >

            <label htmlFor="amount">Amount</label>
            &nbsp;
            <input
              id="amount"
              type="text"
              name="amount"
              value={amount || ''}
              onChange={handleSetAmount}
            />
            &nbsp;
            CZK
            &nbsp;
            to
            &nbsp;
            <select
              id="convertTo"
              name="convertTo"
              value={currencySelect}
              onChange={handleSetCurrencySelect}
            >
              <option value=''></option>
              {
                data?.data.map((currency, i: number) => {
                  return (
                    <option
                      key={i}
                      value={Object.keys(currency)}
                    >
                      {Object.keys(currency)}
                    </option>
                  )
                })
              }
            </select>
            <Button
              primary
              type="submit" value="Submit"
            >
              Convert
            </Button>
          </form>
        </ConvertBox>
        {
          calculated &&
          <>
            {`${amount} CZK = ${calculated} ${currencySelect}`}
          </>
        }

        <h2>Central bank exchange rate fixing</h2>
        Last update: {data?.lastUpdate}
        <ExchangeRateTable>
          <table>
            <thead>
              <tr>
                {
                  data?.tableHeader.map((col: string, i: number) => {
                    return <th key={i}>{col}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                data?.data.map((currency, i: number) => {
                  return (<tr key={i}>
                    {
                      Object.entries(currency).map((cur, i) => {
                        return <React.Fragment key={i}>
                          <td>{cur[1].country}</td>
                          <td>{cur[1].currency}</td>
                          <td>{cur[1].amount}</td>
                          <td>{cur[1].code}</td>
                          <td>{cur[1].rate}</td>
                        </React.Fragment>
                      })
                    }
                  </tr>)
                })
              }
            </tbody>
          </table>
        </ExchangeRateTable>
      </main>
    </Container>
  );
}

export default App;
