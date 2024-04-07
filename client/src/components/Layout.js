import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Myroute from '../Myroute';

const Layout = (props) => {
  const navigate = useNavigate();
  const products = useSelector(state => state.cartState.cartList);
  console.log(products);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  return (
    <div className='container-fluid'>
      <header>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Navbar</Link>
            <Link to="/cart" className="cart-link">
              {products.length}
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </nav>
      </header>
      <div className='row'>
        <div className='col-md-3'>
          <div className="list-group">
            <Link to='/' className="list-group-item list-group-item-action" aria-current="true">
              Home
            </Link>
            <Link to='/bill' className="list-group-item list-group-item-action"> Bills </Link>
            <Link to='/items' className="list-group-item list-group-item-action"> Items </Link>
            <Link to='/customer' className="list-group-item list-group-item-action"> Customer's</Link>
            {user ? (
              <></>
            ) : (
              <Link to='/signIn' className="list-group-item list-group-item-action"> Sign In </Link>
            )}
            {user ? (
              <button onClick={() => {
                localStorage.removeItem('user')
                navigate('/signIn')
              }} type="button" className="list-group-item list-group-item-action"> Log Out </button>
            ) : (
              <></>
            )}

          </div>
        </div>
        <div className='col-md-9'>
          <Myroute />
        </div>
      </div>
    </div>
  );
}

export default Layout;
