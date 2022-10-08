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
  const [amount, setAmount] = useState<string>('')

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

  const calculateHandler = () => {
    console.log(amount)
  }

  return (
    <Container>
      <main>
        <h1>Currency Converter</h1>
        <h2>Central bank exchange rate fixing</h2>
        Last update: {data?.lastUpdate}
        <ConvertBox>
          <label htmlFor="amount">Amount</label>
          &nbsp;
          <input
            id="amount"
            type="text"
            name="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          &nbsp;
          CZK

          <Button
            primary
            onClick={calculateHandler}
          >
            Convert
          </Button>
        </ConvertBox>
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
