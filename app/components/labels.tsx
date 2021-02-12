import QRCode from 'qrcode.react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { SnipCartOrder } from '../interfaces/snipcart';

type OrdersProps = {
  orders: SnipCartOrder[];
};

const LabelStyles = styled.div`
  width: 4in;
  height: 6in;
  margin: 20px 0;
  @media print {
    width: 100%;
    height: 100vh;
    margin: 0;
    border: 0;
  }
  font-family: 'Operator Mono';
  border: 4px solid black;
  img {
    width: 100%;
    height: 100%;
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
    text-align: left;
    background: black;
    color: white;
    font-style: italic;
    font-size: 15px;
    padding-left: 20px;
    canvas {
      width: 100%;
      border: 2px solid white;
    }
    h2 {
      margin: 0;
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
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    canvas {
      border: 2px solid white;
    }
  }
`;

const LabelsGrid = styled.div`
  & > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media print {
      display: block;
    }
  }
`;

function PackingList({ order }: { order: SnipCartOrder }) {
  const { items } = order;
  return (
    <LabelStyles className="label4x6 packing">
      <div className="label-header">
        <h2>
          Order {order.invoiceNumber}
          <br />
          Shipment {order?.metadata?.chitChatId}
        </h2>
        <QRCode value={order.token} size={65} />
      </div>
      <ol>
        {items?.map((item, i) => (
          <li key={`item${i}`}>
            <h3>{item.name}</h3>
            <span className="meta">
              <p>
                <strong>Qty</strong>: {item.quantity}
              </p>
              <p>
                {item.customFields?.map((field) => (
                  <Fragment key={`field-item-${i}-${field.name}`}>
                    <strong>{field.name}:</strong>{' '}
                    <span>{field.displayValue}</span>
                  </Fragment>
                ))}
              </p>
              <p>
                <strong>ID</strong>: {item.id}
              </p>
            </span>
          </li>
        ))}
        <h3>
          {order.numberOfItemsInOrder} Item
          {order.numberOfItemsInOrder === 1 ? '' : 's'} Total
        </h3>
      </ol>
      <div className="label-footer">
        <p>Thank You &times; You are a good dev &times; Wes Bos</p>
      </div>
    </LabelStyles>
  );
}

function ShippingLabel({ order }: { order: SnipCartOrder }) {
  return (
    <LabelStyles className="label4x6 shipping">
      <QRCode size={50} value={order.token} />
      <img src={order?.metadata?.label} alt="" />
    </LabelStyles>
  );
}

export function Labels({ orders }: OrdersProps) {
  if (!orders) return <p>No orders to show</p>;
  return (
    <LabelsGrid>
      {orders.map((order) => (
        <div key={order.token}>
          <PackingList order={order} />
          <ShippingLabel order={order} />
        </div>
      ))}
    </LabelsGrid>
  );
}

export { LabelStyles };
