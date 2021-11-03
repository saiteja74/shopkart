import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3' style={{backgroundColor: '	#9932CC', color: '#fff', fontSize: '20px'}}>
        Go Back
      </Link>
      <FormContainer>
        <h1 style={{color: '#800080'}}>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label style={{fontSize: '20px', color: '#ff4500'}}>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                style={{color: '#FF00FF', fontSize: '20px'}}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label style={{fontSize: '20px', color: '#FF1493'}}>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                style={{color: '#4B0082', fontSize: '20px'}}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label style={{fontSize: '20px', color: '#FF0000'}}>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                style={{color: '#663399', fontSize: '20px'}}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label style={{fontSize: '20px', color: '#008000'}}>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                style={{color: '#32CD32', fontSize: '20px'}}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label style={{fontSize: '20px', color: '#00008B'}}>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                style={{color: '#483D8B', fontSize: '20px'}}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label style={{fontSize: '20px', color: '#00FF00'}}>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                style={{color: '#9400D3', fontSize: '20px'}}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label style={{fontSize: '20px', color: '#00FFFF'}}>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                style={{color: '#00CED1', fontSize: '20px'}}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' style={{backgroundColor: '#9400D3', fontSize: '20px'}}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
