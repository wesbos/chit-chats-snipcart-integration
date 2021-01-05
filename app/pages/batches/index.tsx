import Link from 'next/link';
import { useMutation, useQuery } from 'react-query'
import Layout from '../../components/Layout'
import { formatDistanceToNow } from 'date-fns'

export default function OrdersPage() {
  const { isLoading, error, data: batches = [], refetch } = useQuery('batches', () =>
    fetch('/api/batches').then(res =>
      res.json()
    )
  );
  const createBatchMutation = useMutation(() => fetch(`/api/batches`, {
    method: 'POST'
  }));

  console.log(batches);

  return <Layout title="Orders">
    {/* <Scanner/> */}
    <header>
      <h1>Batches {batches?.length}</h1>

    </header>
    {isLoading && <p>Loading...</p>}

    <button disabled={createBatchMutation.isLoading} type="button" onClick={async (e) => {
      await createBatchMutation.mutateAsync();
      await refetch();
    }

    }>Create Batch</button>
     <ul>
      {batches.map(batch => <li key={batch.id}>
        <Link href={`/batches/${batch.id}`}>
          <a>{batch.id} - {batch.status} - Created {formatDistanceToNow(new Date(batch.created_at), {
            addSuffix: true
          })}</a>
        </Link>
      </li>)}
      </ul>
  </Layout>

}


