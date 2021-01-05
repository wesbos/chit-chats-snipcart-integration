import { useMutation, useQuery } from 'react-query'
import QRCode from 'qrcode.react';
import { SnipCartOrderItem } from "../interfaces/snipcart";
import  styled from 'styled-components';

type OrdersProps = {
  orders: SnipCartOrderItem[]
}

const LabelStyles = styled.div`
  width: 4in;
  height: 6in;
  margin: 20px;
  @media print {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
  font-family: 'Operator Mono';
  border:4px solid black;
  img {
    width: 100%;
    height: 100%;
    /* height: calc(100vh - 70px); */
    /* height: calc(6in - 55px); */
  }
  p {
    margin: 0;
    margin-bottom: 5px;
  }
  .label-header {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: black;
    color: white;
    font-style: italic;
    font-size: 15px;
    canvas {
      width: 100%;
    }
  }
  ol {
    list-style-type: decimal-leading-zero;
    margin: 0;
    li {
      border-bottom: 1px solid black;
      padding: 2px;
    }
  }
  h3 {
    margin: 0;
    margin-bottom: 5px;
  }
  .label-footer {
    background: black;
    color: white;
    text-align: center;
    text-transform: uppercase;
    p {
      margin: 2px;
    }
  }

  .meta {
    display: flex;
    font-size: 12px;
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    gap: 10px;
  }
  &.packing {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
  &.shipping {
    display: grid;
    grid-template-rows: 50px 1fr;
    img {
      height: 100%;
      min-height: 0;
    }
  }
`;

function PackingList({order}: {order: SnipCartOrderItem}) {
  const items = [...order.items, ...order.items, ...order.items, ...order.items, ...order.items, ...order.items];
  return <LabelStyles className="label4x6 packing">
    <div className="label-header">
      <h2>Order {order.invoiceNumber}</h2>
      <QRCode value={order.token} size={65} />
    </div>
    <ol>
      {items.map(item => <li>
        <h3>{item.name}</h3>
        <span className="meta">
          <p><strong>Qty</strong>: {item.quantity}</p>
          <p>{item.customFields?.map(field => <><strong>{field.name}:</strong> <span>{field.displayValue}</span></>)}</p>
          <p><strong>ID</strong>: {item.id}</p>
        </span>
      </li>)}
      <h3>{order.numberOfItemsInOrder} Item{order.numberOfItemsInOrder === 1 ? '' : 's'} Total</h3>
    </ol>
    <div className="label-footer">
      <p>Thank You &times; You are a good dev &times; Wes Bos</p>
    </div>
  </LabelStyles>
}

function ShippingLabel({order}: {order: SnipCartOrderItem}) {
  return <LabelStyles className="label4x6 shipping">
      <QRCode size={50} value={order.token} />
      <img src={order?.metadata?.label} alt=""/>
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

export { LabelStyles }
