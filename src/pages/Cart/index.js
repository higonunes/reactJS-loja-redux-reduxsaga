import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((t, p) => {
        return t + p.price * p.amount;
      }, 0)
    )
  );

  const cart = useSelector((state) =>
    state.cart.map((p) => ({
      ...p,
      subtotal: formatPrice(p.price * p.amount),
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.title} />
              </td>
              <td>
                <strong>{p.title}</strong>
                <span>{p.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(p)}>
                    <MdRemoveCircleOutline size={20} color="#0353a4" />
                  </button>
                  <input type="number" readOnly value={p.amount} />
                  <button type="button" onClick={() => increment(p)}>
                    <MdAddCircleOutline size={20} color="#0353a4" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{p.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(CartActions.removeFromCart(p.id))}
                >
                  <MdDelete size={20} color="#0353a4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
