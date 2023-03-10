import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import StyledCard from '../styled_components/Card.style'
import Button from '../styled_components/Button.style'
import SubmitForm from '../styled_components/PortfolioSubmitForm.sty'
import CardInput from '../styled_components/CardInput.style'

const PortfolioStockCard = ({stockName, singlePortfolio}) => {
  const {
    investor, 
    setInvestor
    } = useContext(UserContext)

  const [portfolioStockPatchOnchange, setPortfolioStockPatchOnchange] = useState({
      id: stockName.id,
      quantity:stockName.quantity
  })

  const destroyPortfolioStockRequest = p => {
    fetch(`/portfolio_stocks/${p.id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.status === 204) {
        const updatedPortfolio = {...singlePortfolio, stock_name: singlePortfolio.stock_name.filter(stock => stock.id !== p.id)}
        const updatedPortfolios = investor.portfolios.map(individualPortfolio => individualPortfolio.id !== singlePortfolio.id ? individualPortfolio : updatedPortfolio)

        const updatedInvestor = {
          ...investor,
          portfolios: updatedPortfolios
        }
        setInvestor(updatedInvestor)
      } else {
        console.log('hitting the error')
      }
    })
  }

  const patchOnchange = (e) => {
    const {name, value} = e.target;
    setPortfolioStockPatchOnchange((oldValues) => ({ ...oldValues, [name]: value }))
    // setPortfolioStockPatchOnchange((oldValues) => ({ ...oldValues, [name]: value }))
    // console.log(e.target.value)
  }
  const quantityPatch = p => {
    p.preventDefault()
    fetch(`/portfolio_stocks/${stockName.id}`, {
      method:"PATCH", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(portfolioStockPatchOnchange)
    })
    .then(res => {
      if (res.status === 202) {
        res.json()
        .then(data => {
          const updatedQuantity = {
            ...investor, 
            data
          }
          setInvestor(updatedQuantity
            // current => current.portfolio_stocks.map(ps => ps.quantity )
            )
        })
      } else {
        console.log('Quantity did not update')
      }
    })
  }    
  
  return (

    <StyledCard
      key={stockName.id}
      >
        {stockName.name} <br/>
        {stockName.price}<br/>
        {stockName.quantity}

   <SubmitForm 
      onSubmit={(p) => quantityPatch(p)} >
        <CardInput 
          onChange={patchOnchange}
          name='quantity'
          value = {portfolioStockPatchOnchange.quantity}
          />
        <Button type="submit">Update Quantity</Button>
        </SubmitForm>

        <Button onClick={()=>destroyPortfolioStockRequest(stockName)}>Remove </Button>
    </StyledCard>      
  )
}
export default PortfolioStockCard