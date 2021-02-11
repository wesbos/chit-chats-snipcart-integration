import { useRouter } from 'next/dist/client/router';
import nProgress from 'nprogress';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import wait from 'waait';
import { useAddToBatch } from '../hooks/useBatch';



const ScannerStyles = styled.div`
  width: 100%;
  top: 0;
  width:100%;
  background: white;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  input[type='text'] {
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    border: 2px solid var(--lightGrey);
    &:focus {
      outline: none;
      border-color: var(--yellow);
    }
  }
  input[type="radio"] {
    margin: 0 10px;
    background: black;
    border: 2px solid black;
  }
`;

function useFocus(ref: React.RefObject<HTMLInputElement>) {
  useEffect(() => {
    const interval = setInterval(() => {
      if(ref?.current) {
        ref?.current?.focus();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ref]);
}

export function Scanner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useFocus(inputRef);
  const router = useRouter();
  const [action, setAction] = useState('goto');
  const batchMutation = useAddToBatch();
  const queryClient = useQueryClient();

  async function handleScan(e: React.FormEvent<HTMLFormElement>) {
    const batchId: string = router.query.batchId;
    e.preventDefault();
    nProgress.start();
    const form = e.currentTarget;
    const element = e.currentTarget.barcodeValue as HTMLInputElement;
    const value = element.value;
    if (value.startsWith('batch:')) {
      const [, id] = value.split(':');
      router.push(`/batches/${id}`);
    }
    else if (/* action === 'ship' &&  */ router.query.batchId) {

      console.log('GOTTA SHIP IT', {value, batchId})
      // 1. Get shipment from ChitChats
      const order = await fetch(`/api/orders/${value}`).then((res) => res.json())
      // from the Snipcart order we get the Chit Chat ID
      const { chitChatId } = order.metadata;
      console.log('Got the Chit Chat ID: ', chitChatId);
      // 2. Add to Chit Chat batch
      const res = await batchMutation.mutateAsync({
        batch_id: batchId,
        shipment_ids: [chitChatId]
      }).catch(err => {
        console.log('That one didnt work');
      });
      console.log(res);
      // 3. Refresh the orders in this batch
      console.log('Refreshing the batch', batchId)
      window.queryClient = queryClient;
      await queryClient.refetchQueries(['shipments-in-batch', batchId], {
        active: true,
        inactive: true,
        stale: true,
        fetching: true,
      });
      console.log('DONE!')
      nProgress.done();
    }
    await wait(1000);
    form.reset();
  }

  function handleChange(e) {
    setAction(e.target.value);
  }
  return (
    <ScannerStyles className="no-print">
      <audio ref={audioRef} src="/beep.wav" />
        <form onSubmit={handleScan}>
          <input ref={inputRef} name="barcodeValue" type="text" />
        </form>
      <div className="controls">

      <label htmlFor="goto">
        <input type="radio" onChange={handleChange} checked={action === "goto"}name="action" value="goto" id="goto" />
        Go to
      </label>
      <label htmlFor="ship">
        <input type="radio" onChange={handleChange} checked={action === "ship"}name="action" value="ship" id="ship" />
        Batch + Ship
      </label>
      </div>

    </ScannerStyles>
  );
}
