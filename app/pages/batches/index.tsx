import Link from 'next/link';
import { useMutation, useQuery } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import Layout from '../../components/Layout';

export default function OrdersPage() {
  const { isLoading, error, data: batches = [], refetch } = useQuery(
    'batches',
    () => fetch('/api/batches').then((res) => res.json())
  );
  return (
    <Layout title="Orders">
      {/* <Scanner/> */}
      <header>
        <h1>Batches {batches?.length}</h1>
      </header>
      {isLoading && <p>Loading...</p>}

      <ul>
        {batches.map((batch) => (
          <li key={batch.id}>
            <Link href={`/batches/${batch.id}`}>
              <a>{batch.id}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
