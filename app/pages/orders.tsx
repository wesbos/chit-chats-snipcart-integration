import { useQuery } from 'react-query'
import Layout from '../components/Layout'
import { Labels } from '../components/Labels';

export default function OrdersPage() {
  const { isLoading, error, data: orders, refetch } = useQuery('orders', () =>
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


