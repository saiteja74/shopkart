import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 style={{color: '#006400'}}>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label style={{fontSize: '20px', color: '#0000CD'}}>Address</Form.Label>
          <Form.Control
            type='text'
            style={{fontSize: '20px', color: '#800000'}}
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label style={{fontSize: '20px', color: '#DC143C'}}>City</Form.Label>
          <Form.Control
            type='text'
            style={{fontSize: '20px', color: '#0000FF'}}
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label style={{fontSize: '20px', color: '#FF1493'}}>Postal Code</Form.Label>
          <Form.Control
            type='text'
            style={{fontSize: '20px'}}
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label style={{fontSize: '20px', color: '#D2691E'}}>Country</Form.Label>
          <Form.Control
            type='text'
            style={{fontSize: '20px'}}
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' style={{fontSize: '20px', backgroundColor: '#5F9EA0'}}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
