import { useMutation, useQuery } from 'react-query'
import QRCode from 'qrcode.react';
import { SnipCartOrderItem } from "../interfaces/snipcart";

type OrdersProps = {
  orders: SnipCartOrderItem[]
}

export function OrderTable({ orders }: OrdersProps) {
  const mutation = useMutation(({ token }) => fetch(`/api/orders/${token}`, {
    method: 'POST'
  }).then(x => x.json()))

  if(!orders) return <p>No orders to show</p>

  return <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Status</th>
        <th>ChitChat ID</th>
        <th>Token</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.token}>
          <td>
            <img width="40" src={order.user.gravatarUrl} alt="" />
            <p>{order.user.billingAddressName} -<br />{order.email}</p>
          </td>
          <td>${order.finalGrandTotal}</td>
          <td>{order.status}</td>
          <td>{order.metadata?.chitChatId}</td>
          <td>
            <QRCode value={order.token} />
                </td>
          <td>
            <button disabled={mutation.isLoading} onClick={async () => {
              console.log('Marking as shipped');
              await mutation.mutateAsync({ token: order.token });
              console.log('refecthing');
              await refetch();
              console.log('done');
            }}>Mark{mutation.isLoading && 'ing'} as Shipped</button>
          </td>
        </tr>
      ))}
    </tbody>
    <style jsx>
      {`
              table {
                width: 100%;
                border: 1px solid black;
                font-family: sans-serif;
              }
              img {
                float: left;
                border-radius: 50%;
                margin-right: 10px;
              }
              tr:nth-child(even) {
                background: #efefef;
              }
            `}
    </style>
  </table>
}
