import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from './styles';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector((state) =>
    state.cart.reduce((a, p) => {
      a[p.id] = p.amount;
      return a;
    }, {})
  );

  const dispatch = useDispatch();

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }
  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products`);

      const data = response.data.map((p) => ({
        ...p,
        priceFormatted: formatPrice(p.price),
      }));

      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <ProductList>
      {products.map((p) => (
        <li key={p.id}>
          <img src={p.image} alt={p.title} />
          <strong>{p.title}</strong>
          <span>{p.priceFormatted}</span>
          <button type="button" onClick={() => handleAddProduct(p.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> {amount[p.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
