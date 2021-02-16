import QRCode from 'qrcode.react';
import { useMutation } from 'react-query';
import { SnipCartOrder } from '../interfaces/snipcart';

type OrdersProps = {
  orders: SnipCartOrder[];
};

interface SnipCartMarkOrderArgs {
  token: string;
}

function generateSnipCartUrl(order: SnipCartOrder) {
  return `https://app.snipcart.com/dashboard/orders/${order.token}`;
}

export function OrderTable({ orders }: OrdersProps) {
  const mutation = useMutation<SnipCartOrder, any, SnipCartMarkOrderArgs>(
    ({ token }) =>
      fetch(`/api/orders/${token}`, {
        method: 'POST',
      }).then((x) => x.json())
  );
  const refetchMetaData = useMutation<
  SnipCartOrder,
  any,
  SnipCartMarkOrderArgs
  >(({ token }) =>
    fetch(`/api/orders/refetch-metadata?token=${token}`, {
      method: 'POST',
    }).then((x) => x.json())
  );

  if (!orders) return <p>No orders to show</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Snipcart</th>
          <th>ChitChat ID</th>
          <th>Has Label?</th>
          <th>Token</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.token}>
            <td>
              <img width="40" src={order.user.gravatarUrl} alt="" />
              <p>
                {order.user.billingAddressName} -<br />
                {order.email}
              </p>
            </td>
            <td>${order.finalGrandTotal}</td>
            <td>{order.status}</td>
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={generateSnipCartUrl(order)}
              >
                SNIP
              </a>
            </td>
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={generateSnipCartUrl(order)}
              >
                {order.metadata?.chitChatId}
              </a>
            </td>
            <td>
              {order.metadata?.label ? (
                'YES'
              ) : (
                <span style={{ color: 'red' }}>NO</span>
              )}
            </td>
            <td>
              <QRCode value={order.token} size={40} />
            </td>
            <td>
              <button
                type="button"
                disabled={mutation.isLoading}
                onClick={async () => {
                  console.log('Marking as shipped');
                  await mutation.mutateAsync({ token: order.token });
                }}
              >
                Mark{mutation.isLoading && 'ing'} as Shipped
              </button>

              <button
                type="button"
                disabled={refetchMetaData.isLoading}
                onClick={async () => {
                  await refetchMetaData.mutateAsync({ token: order.token });
                }}
              >
                Refetch{refetchMetaData.isLoading && 'ing'} Labels
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
