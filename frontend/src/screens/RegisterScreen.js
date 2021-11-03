import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1 style={{color: '#00008B'}}>Register Here</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label style={{fontSize: '20px', color: '#808000'}}>Name</Form.Label>
          <Form.Control
            type='name'
            style={{color: '#008080', fontSize: '20px'}}
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label style={{fontSize: '20px', color: '#008000'}}>Email Address</Form.Label>
          <Form.Control
            type='email'
            style={{color: '#808000', fontSize: '20px'}}
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label style={{fontSize: '20px', color: '#0000FF'}}>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            style={{color: '#DAA520', fontSize: '20px'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label style={{fontSize: '20px', color: '#800080'}}>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            style={{color: '#FF0000', fontSize: '20px'}}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' style={{backgroundColor: '#4682B4', color: '#FFFF00'}}>
          SignUp
        </Button>
      </Form>

      <Row className='py-3' style={{fontSize: '20px'}}>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            SignIn
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
