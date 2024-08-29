import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { emptyCart, removeFromCart } from '../redux/cartSlice';

function Cart() {
  const cartArray = useSelector((state) => state.cartReducer)
  console.log('==wishlist item in wishlist page===');
  console.log(cartArray);

  const dispatch = useDispatch();
  //hook used to navigate a particular path or page
  const navigate =useNavigate()
  const [total, setTotal] = useState(0)
  const getTotal = () => {
    let sum = 0;
    cartArray.forEach(item => {
      sum = sum + item.price;
    })
    setTotal(sum)
  }

  useEffect(() => {
    getTotal();
  }, [cartArray])

  const handileCart=()=>{
    alert("Thank you .........your order placed successfully ")
    dispatch(emptyCart())
    navigate('/')
  }


  return (
    <>
      <button className='btn btn-success mt-4 ms-4'>
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <i class="fa-solid fa-arrow-left"></i>
          Back to home</Link>
      </button>
      <div style={{ marginTop: '50px' }}>

        {
          cartArray?.length > 0 ?
            <div className='row w-100'>
              <div className='col-lg-6 ms-5 mt-2'>
                <table className='table shadow border table-hover '>
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Product title</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartArray.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.title.slice(0, 20)}</td>
                          <td><img src={item.image} height='75px' width='75px' /></td>
                          <td>₹{item.price}</td>
                          <td><Button variant='outline-danger' onClick={() => dispatch(removeFromCart(item.id))}><i class="fa-solid fa-trash"></i></Button></td>
                        </tr>

                      ))
                    }

                  </tbody>
                </table>
              </div>

              <div className='col-lg-4'>
                <div className='border shadow p-5'>
                  <h3 className='text-primary'>Cart summery</h3>
                  <h5>Total no of products:<span className='text-warning fw-bolder'>{cartArray?.length}</span></h5>
                  <h5>Total price:<span className='text-warning fw-bolder'>₹ {total}</span></h5>
                  <button className='btn btn-success rounded w-100'onClick={handileCart}>Checkout</button>
                </div>
              </div>
            </div>
            :
            <div style={{ height: '100vh' }} className='d-flex justify-content=center align-items-center flex-column'>
              <img src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png" height='300px' alt="" />
              <h3 className='text-danger'>Your cart is empty</h3>
            </div>
        }





      </div>
    </>
  )
}

export default Cart