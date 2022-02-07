import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../store/actions/authActions"

export default function Signup({ location, history }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirn, setPasswordConfirn] = useState("")
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const [errorInside, setErrorInside] = useState("")
  const redirect = "/tables"
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  async function handleSubmit(e) {
    if (password !== passwordConfirn) {
      return setErrorInside("Passwords do not match")
    }
    setErrorInside("")
    e.preventDefault()
    dispatch(register(email, password))
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {errorInside && <Alert variant='danger'>{errorInside}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                value={passwordConfirn}
                onChange={(e) => setPasswordConfirn(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
}
