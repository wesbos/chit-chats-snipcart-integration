import { useRouter } from 'next/dist/client/router';
import { useQuery, useQueryClient } from 'react-query';
import GenericTable from '../../components/GenericTable';
import Layout from '../../components/Layout';
import useBatch from '../../hooks/useBatch';

export default function OrdersPage() {
  const { query } = useRouter();
  const { shipments, refetchBatches } = useBatch(query.batchId);
  const queryClient = useQueryClient();
  return (
    <Layout title="Orders">
      <header>
        <h1>Batch {query.batchId}</h1>
        <div className="no-print">
          <h2>
            {shipments.length} Package{shipments.length !== 1 && 's'} in this
            Batch:
          </h2>
          <button type="button" onClick={refetchBatches}>
            Refetch using refetch Method
          </button>
          <br />
          <button
            type="button"
            onClick={async () => {
              await queryClient.refetchQueries([
                'shipments-in-batch',
                query.batchId,
              ]);
            }}
          >
            Refetch using queryClient
          </button>

          <GenericTable
            data={shipments}
            columns={['id', 'status', 'to_name', 'to_city', 'to_country_code']}
          />
        </div>
      </header>
    </Layout>
  );
}
