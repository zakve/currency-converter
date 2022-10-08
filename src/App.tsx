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

interface dataObject {
  lastUpdate: string,
  tableHeader: [string],
  data: string[][]
}

function App() {
  const [data, setData] = useState<dataObject | undefined>(undefined)

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
  }

  return (
    <Container>
      <main>
        <h1>Central bank exchange rate fixing</h1>
        Last update: {data?.lastUpdate}
        <ConvertBox>
          <label htmlFor="amount">Amount</label>
          <input type="text" id="amount" name="amount" /> CZK
          <Button
            primary
            onClick={calculateHandler}
          >
            Calculate
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
                data?.data.map((currency: string[], i: number) => {
                  return (<tr key={i}>
                    {
                      currency.map((col: string, j: number) => {
                        return <td key={j}>{col}</td>
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
