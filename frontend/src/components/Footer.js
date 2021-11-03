import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3' style={{fontSize: '20px', color: '#D2691E'}}>Created By Ankireddy SaiTejaReddy</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
