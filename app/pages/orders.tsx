import Link from 'next/link'
import { useMutation, useQuery } from 'react-query'
import Layout from '../components/Layout'
import { SnipCartOrderItem } from '../interfaces/snipcart'

import { Scanner } from '../components/Scanner';
import { OrderTable } from '../components/OrderTable';
import { Labels } from '../components/Labels';

export default function OrdersPage() {
  const { isLoading, error, data: orders, refetch } = useQuery('repoData', () =>
    fetch('/api/orders?limit=100&status=Processed').then(res =>
      res.json()
    )
  );


  return <Layout title="Orders">
    {/* <Scanner/> */}
    <header>
      <h1>Orders {orders?.length}</h1>
      <p>Viewing a listing of orders</p>

    </header>
    { isLoading && <p>Loading...</p>}
    <Labels orders={orders}/>
    {/* <OrderTable orders={orders}/> */}
  </Layout>

}


