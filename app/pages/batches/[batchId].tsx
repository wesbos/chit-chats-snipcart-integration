import { useRouter } from 'next/dist/client/router';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import GenericTable from '../../components/GenericTable';
// import { LabelStyles } from '../../components/Labels';
import Layout from '../../components/Layout';
import useBatch from '../../hooks/useBatch';

const LabelStyles = styled.div`
  border: 1px solid red;
`;

export default function OrdersPage() {
  const { query } = useRouter();
  const { batchId } = query;
  const { isLoading, data = {} } = useQuery(['batch', batchId], () => {
    if (!batchId) return; // wait for router..
    return fetch(`/api/batches/${batchId}`).then((res) => res.json());
  });
  const { shipments } = useBatch(batchId);
  const { batch = {} } = data;
  const [labelShow, setLabelShow] = useState('batch-scanner');
  return (
    <Layout title="Orders">
      <header>
        ˜
        <h1>
          Batch {batchId} {labelShow}
        </h1>
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
        <label htmlFor="batch-scanner">
          <input
            type="radio"
            name="batch"
            value="batch-scanner"
            id="batch-scanner"
            onChange={(e) => setLabelShow(e.target.value)}
          />
          Batch Scanner Label
        </label>
        <label htmlFor="batch-finished">
          <input
            type="radio"
            name="batch"
            value="batch-finished"
            id="batch-finished"
            onChange={(e) => setLabelShow(e.target.value)}
          />
          Batch Finished Label
        </label>
      </header>
      {isLoading && <p>Loading...</p>}
      {labelShow === 'batch-scanner' && (
        <LabelStyles>
          <QRCode size={150} value={`batch:${batchId}`} />
          <p>Chit Chats Client Batch:{batchId}</p>
        </LabelStyles>
      )}
      {labelShow === 'batch-finished' && (
        <LabelStyles>
          {batch.label_png_url ? (
            <img src={batch.label_png_url} alt={`Label for Batch ${batchId}`} />
          ) : (
            'Label not yet created. You probably have to add items to this batch first'
          )}
        </LabelStyles>
      )}
    </Layout>
  );
}
