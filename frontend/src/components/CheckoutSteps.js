import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login' style={{fontSize: '20px'}}>
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{fontSize: '15px'}}>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping' style={{fontSize: '20px'}}>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{fontSize: '15px'}}>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment' style={{fontSize: '20px'}}>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{fontSize: '15px'}}>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder' style={{fontSize: '20px'}}>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled style={{fontSize: '15px'}}>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
