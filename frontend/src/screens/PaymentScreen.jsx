import { useEffect, useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../slices/cartSlice"
import CheckoutSteps from "../components/CheckoutSteps"
import { useNavigate } from "react-router-dom"


const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate]) 

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                type='radio'
                className="my-2"
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
            Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen