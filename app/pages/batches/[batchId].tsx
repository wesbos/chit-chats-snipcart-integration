import { useRouter } from 'next/dist/client/router';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import GenericTable from '../../components/GenericTable';
import { LabelStyles } from '../../components/Labels';
import Layout from '../../components/Layout';
import { Scanner } from '../../components/Scanner';
import useBatch from '../../hooks/useBatch';

export default function OrdersPage() {
  const { query } = useRouter();
  const [batchIdTemp, setBatchIdTemp] = useState();
  const { isLoading, error, data = {}, refetch } = useQuery(
    ['batch', batchIdTemp],
    () => {
      if (!batchIdTemp) return; // wait for router..
      return fetch(`/api/batches/${batchIdTemp}`).then((res) => res.json());
    },
    {
      // refetchInterval: 1000,
    }
  );
  console.log(query.batchId);
  // const { data: batches = [], refetch: refetchBatches } = useQuery(
  //   ['shipments-in-batch', query.batchId],
  //   () => fetch(`/api/shipments?batch_id=${query.batchId}`).then((res) => res.json())
  // );
  const { shipments, refetchBatches } = useBatch(batchIdTemp);
  const { batch = {} } = data;
  const [labelShow, setLabelShow] = useState('batch-scanner');
  return (
    <Layout title="Orders">
      <header>
        ˜
        <h1>
          Batch {query.batchId} {labelShow}
          temp: {batchIdTemp}
        </h1>
        <input
          type="text"
          value={batchIdTemp}
          onChange={(e) => setBatchIdTemp(e.target.value)}
        />
        <div className="no-print">
          <h2>
            {shipments.length} Package{shipments.length !== 1 && 's'} in this
            Batch:
          </h2>
          <GenericTable
            data={shipments}
            columns={['id', 'status', 'to_name', 'to_city', 'to_country_code']}
          />
        </div>
        <label>
          <input
            type="radio"
            name="batch"
            value="batch-scanner"
            onChange={(e) => setLabelShow(e.target.value)}
          />
          Batch Scanner Label
        </label>
        <label>
          <input
            type="radio"
            name="batch"
            value="batch-finished"
            onChange={(e) => setLabelShow(e.target.value)}
          />
          Batch Finished Label
        </label>
      </header>
      {isLoading && <p>Loading...</p>}
      {labelShow === 'batch-scanner' && (
        <LabelStyles>
          <QRCode size={150} value={`batch:${query.batchId}`} />
          <p>Chit Chats Client Batch:{query.batchId}</p>
        </LabelStyles>
      )}
      {labelShow === 'batch-finished' && (
        <LabelStyles>
          {batch.label_png_url ? (
            <img
              src={batch.label_png_url}
              alt={`Label for Batch ${query.batchId}`}
            />
          ) : (
            'Label not yet created. You probably have to add items to this batch first'
          )}
        </LabelStyles>
      )}
    </Layout>
  );
}
