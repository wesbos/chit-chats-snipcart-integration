import QRCode from 'qrcode.react';
import { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { MetaData, SnipCartOrder } from '../interfaces/snipcart';
import { OrderVariations } from './OrderVariations';

type OrdersProps = {
  orders: SnipCartOrder[];
};

interface SnipCartMarkOrderArgs {
  token: string;
}

function generateSnipCartUrl(order: SnipCartOrder) {
  return `https://app.snipcart.com/dashboard/orders/${order.token}`;
}
function generateChitChatUrl(order: SnipCartOrder) {
  return `https://chitchats.com/clients/408432/shipments/search?q=${
    order.metadata?.chitChatId as string
  }`;
}

function useFilters(initialData: MetaData) {
  const [filters, setFilters] = useState<Record<string, boolean>>(initialData);
  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setFilters({
      ...filters,
      [e.currentTarget.name]: e.currentTarget.checked,
    });
  }
  return {
    handleFilterChange,
    filters,
  };
}

function OrderRow({ order }: { order: SnipCartOrder }) {
  const mutation = useMutation<SnipCartOrder, any, SnipCartMarkOrderArgs>(
    ({ token }) =>
      fetch(`/api/orders/${token}`, {
        method: 'POST',
      }).then((x) => x.json() as Promise<SnipCartOrder>)
  );

  const refetchMetaData = useMutation<
    SnipCartOrder,
    any,
    SnipCartMarkOrderArgs
  >(({ token }) =>
    fetch(`/api/orders/refetch-metadata?token=${token}`, {
      method: 'POST',
    }).then((x) => x.json() as Promise<SnipCartOrder>)
  );

  const sendTrackingInfo = useMutation<
    SnipCartOrder,
    any,
    SnipCartMarkOrderArgs
  >(({ token }) =>
    fetch(`/api/snipcart/orders/${token}/notifications`, {
      method: 'POST',
      body: JSON.stringify({
        type: 'TrackingNumber',
        message: 'Test Message',
        deliveryMethod: 'Email',
      }),
    }).then((x) => x.json() as Promise<SnipCartOrder>)
  );

  return (
    <tr key={order.token}>
      <td>
        <img width="40" src={order.user.gravatarUrl} alt="" />
        <p>
          {order.user.billingAddressName}
          <br />
          <span className="blur">{order.email}</span>
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
          href={generateChitChatUrl(order)}
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
      <td>{order.trackingNumber}</td>
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
          Refetch Meta
        </button>
        <button
          type="button"
          disabled={sendTrackingInfo.isLoading}
          onClick={async () => {
            await sendTrackingInfo.mutateAsync({ token: order.token });
          }}
        >
          Send Tracking
        </button>
      </td>
    </tr>
  );
}

export function OrderTable({ orders }: OrdersProps) {
  const { filters, handleFilterChange } = useFilters({ noLabel: false });
  const ordersToShow =
    orders && filters.noLabel
      ? orders.filter((order) => !order.metadata?.label)
      : orders;

  if (!ordersToShow) return <p>No orders to show</p>;

  return (
    <div>
      <OrderVariations orders={orders} />
      <label htmlFor="noLabel">
        <input
          type="checkbox"
          id="noLabel"
          name="noLabel"
          checked={filters.noLabel}
          onChange={handleFilterChange}
        />
        Filter For Missing Label
      </label>
      <p>
        Showing {ordersToShow.length} of {orders.length}
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Snipcart</th>
            <th>ChitChat ID</th>
            <th>Label</th>
            <th>Track</th>
            <th>Token</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersToShow.map((order) => (
            <OrderRow order={order} key={order.token} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
