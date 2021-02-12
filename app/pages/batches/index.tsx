import Link from 'next/link';
import { useMutation, useQuery } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import Layout from '../../components/Layout';
import { ChitChatBatch } from '../../utils/chitchats';

export default function OrdersPage() {
  const { isLoading, data: batches = [], refetch } = useQuery<ChitChatBatch[]>(
    'batches',
    () => fetch('/api/batches').then((res) => res.json())
  );
  const createBatchMutation = useMutation(() =>
    fetch(`/api/batches`, {
      method: 'POST',
    })
  );

  return (
    <Layout title="Orders">
      <header>
        <h1>Batches {batches?.length}</h1>
      </header>
      {isLoading && <p>Loading...</p>}

      <button
        disabled={createBatchMutation.isLoading}
        type="button"
        onClick={async () => {
          await createBatchMutation.mutateAsync();
          await refetch();
        }}
      >
        Create Batch
      </button>
      <ul>
        {batches.map((batch) => (
          <li key={batch.id}>
            <Link href={`/batches/${batch.id}`}>
              <a>
                {batch.id} - {batch.status} - Created{' '}
                {formatDistanceToNow(new Date(batch.created_at), {
                  addSuffix: true,
                })}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
