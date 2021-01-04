import { useMutation, useQuery } from 'react-query'
import QRCode from 'qrcode.react';
import { SnipCartOrderItem } from "../interfaces/snipcart";
import  styled from 'styled-components';

type OrdersProps = {
  orders: SnipCartOrderItem[]
}

const LabelStyles = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;
  font-family: 'Operator Mono';
  img {
    width: 4in;
    height: calc(100vh - 70px);
    /* height: calc(6in - 55px); */
  }
`;

function PackingList({order}: {order: SnipCartOrderItem}) {
  return <LabelStyles className="label4x6">
    <h2>Ordered Item</h2>
    <ol>
      {order.items.map(item => <li>
        <h3>
          {item.name} - ({item.quantity})
        </h3>
        <p>{item.id}</p>
      </li>)}
    </ol>
    <QRCode value={order.token} />
  </LabelStyles>
}

function ShippingLabel({order}: {order: SnipCartOrderItem}) {
  return <LabelStyles className="label4x6">
    <QRCode size={50} value={order.token} />
    <img src="https://staging.chitchats.com/labels/shipments/s2z96i1s18.png" alt=""/>
  </LabelStyles>
}

export function Labels({ orders }: OrdersProps) {
  const mutation = useMutation(({ token }) => fetch(`/api/orders/${token}`, {
    method: 'POST'
  }).then(x => x.json()))

  if(!orders) return <p>No orders to show</p>

  return <div className="labels-wrap">
      {orders.map((order) => (
        <>
          <PackingList order={order}></PackingList>
          <ShippingLabel order={order}></ShippingLabel>
        </>
      ))}
  </div>
}
