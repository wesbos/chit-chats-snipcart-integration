import { useRouter } from 'next/dist/client/router';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import { useQuery } from 'react-query'
import { LabelStyles } from '../../components/Labels';
import Layout from '../../components/Layout'

export default function OrdersPage() {
  const { query } = useRouter();

  const { isLoading, error, data = {}, refetch } = useQuery(['batch', query.id], () =>
    fetch(`/api/batches/${query.id}`).then(res =>
      res.json()
    )
  );
  const { batch = {} } = data;
  const [labelShow, setLabelShow] = useState('batch-scanner');
  return <Layout title="Orders">
    <header>
      <h1>Batch {query.id} {labelShow}</h1>
      <label>
        <input type="radio" name="batch" value="batch-scanner" onChange={e => setLabelShow(e.target.value)}/>
        Batch Scanner Label
      </label>
      <label>
        <input type="radio" name="batch" value="batch-finished" onChange={e => setLabelShow(e.target.value)} />
        Batch Finished Label
      </label>
    </header>
    {isLoading && <p>Loading...</p>}
    {labelShow === 'batch-scanner' && (
      <LabelStyles>
        <QRCode size={150} value={`batch:${query.id}`} />
        <p>Chit Chats Client Batch:{query.id}</p>
      </LabelStyles>
    )}
    {labelShow === 'batch-finished' && (
      <LabelStyles>
        {batch.label_png_url ? <img src={batch.label_png_url} alt={`Label for Batch ${query.id}`} /> : 'Label not yet created. You probably have to add items to this batch first'}

      </LabelStyles>
      )}

  </Layout>

}


