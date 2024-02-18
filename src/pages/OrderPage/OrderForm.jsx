import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from './validationSchema';
import CustomTextField from './CustomTextField';
import { togglePriority } from '../../redux/slices/CartSlice';
import moment from 'moment';
import './OrderForm.scss';

const OrderForm = () => {
  const userName = useSelector((state) => state.user.name);
  const { totalPrice, priority, items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: userName,
      email: '',
      phone: '',
      address: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    try {
      const orderData = {
        customer: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        priority: priority,
        position: '',
        cart: items.map(item => ({
          name: item.name,
          pizzaId: item.id,
          quantity: item.qty,
          unitPrice: item.unitPrice,
          totalPrice: totalPrice,
          ingredients: item.ingredients,
        })),

        estimatedDelivery: moment().toISOString()
      };

      const response = await fetch('https://react-fast-pizza-api.onrender.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      const responseData = await response.json();

      if (response.ok) {
        const { data, status } = responseData;
        if (status === "success") {
          const { id } = data; // pull if from data
          navigate(`/order/${id}`, { state: { orderData: responseData.data } });
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert("Something went wrong");
    }

    reset();
  };

  const handlePriorityChange = useCallback(() => {
    dispatch(togglePriority());
  }, [dispatch]);

  return (
    <div className='order-form_wrapper'>
      <h2>Ready to order? Let's go!</h2>
      <form className='order-form' onSubmit={handleSubmit(onSubmit)}>
        <CustomTextField control={control} name="name" label="Name" errors={errors} />
        <CustomTextField control={control} name="email" label="Email" errors={errors} />
        <CustomTextField control={control} name="phone" label="Phone" errors={errors} />
        <CustomTextField control={control} name="address" label="Address" errors={errors} />

        <div className='order-form_checkbox-wrapper'>
          <input type="checkbox" id="priority" checked={priority} onChange={handlePriorityChange} />
          <label htmlFor='priority' className='order-form_label'>Make my order priority</label>
        </div>

        <div className='order-form_btn-wrapper'>
          <button className='cart-btn order_btn' type="submit">ORDER NOW for <span className='order-form_total-price'>{totalPrice}$</span></button>
        </div>
      </form>
    </div>
  )
}

export default OrderForm;