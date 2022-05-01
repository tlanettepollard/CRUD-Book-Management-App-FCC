import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
    const [book, setBook] = useState(() => {
        return {
            // Checking if book prop is passed or not
            // If pass, set to passed value otherwise an empty string
            bookname: props.book ? props.book.bookname : '',
            author: props.book ? props.book.author : '',
            quantity: props.book ? props.book.quantity : '',
            price: props.book ? props.book.price : '',
            date: props.book ? props.book.date : ''
        
        };

    });

    const [errorMsg, setErrorMsg] = useState('');
    const { bookname, author, price, quantity } = book;

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const values = [bookname, author, price, quantity];
        let errorMsg = '';

        // Checking to see if user has entered all details
        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if (allFieldsFilled) {
            const book = {
                id: uuidv4(),
                bookname,
                author,
                price,
                quantity,
                date: new Date()
            };
            props.handleOnSubmit(book);
        } else {
            errorMsg = 'Please fill out all the fields.';
        }
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Change value of state based on which input field is changed
        switch (name) {
            case 'quantity':
                // Check to see if entered value is integer without decimal point
                if (value === '' || parseInt(value) === +value) {
                    setBook((prevState) => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            case 'price':
                // Checking for decimal number with only two digits after decimal point, used regexp 
                if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
                    setBook((prevState) => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            default:
                setBook((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
        }
    };

    return (
        <div className='main-form'>
            {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='text'
                        name='bookname'
                        value={bookname}
                        placeholder='Enter name of book'
                        onchange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId='author'>
                    <Form.Label>Book Author</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='text'
                        name='author'
                        value={author}
                        placeholder='Enter name of author'
                        onchange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId='quantity'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='number'
                        name='quantity'
                        value={quantity}
                        placeholder='Enter available quantity'
                        onchange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control
                        className='input-control'
                        type='text'
                        name='price'
                        value={price}
                        placeholder='Enter price of book'
                        onchange={handleInputChange}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' className='submit-btn'>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default BookForm;