import { useRouter } from 'next/dist/client/router';
import nProgress from 'nprogress';
import { ChangeEvent, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import wait from 'waait';
import { useAddToBatch } from '../hooks/useBatch';
import { useFocus } from '../hooks/useFocus';

const ScannerStyles = styled.div`
  width: 100%;
  top: 0;
  width: 100%;
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
  input[type='radio'] {
    margin: 0 10px;
    background: black;
    border: 2px solid black;
  }
`;

export function Scanner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useFocus(inputRef);
  const router = useRouter();
  const [action, setAction] = useState('goto');
  const batchMutation = useAddToBatch();
  const queryClient = useQueryClient();

  async function handleScan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    nProgress.start();
    const form = e.currentTarget;
    const element = e.currentTarget.barcodeValue as HTMLInputElement;
    const { value } = element;
    if (value.startsWith('batch:')) {
      const [, id] = value.split(':');
      router.push(`/batches/${id}`);
    } else if (/* action === 'ship' &&  */ router.query.batchId) {
      const batchId = Array.isArray(router.query.batchId)
        ? router.query.batchId[0]
        : router.query.batchId;
      if (!batchId) {
        throw new Error('No Batch ID Present');
      }
      console.log('GOTTA SHIP IT', { value, batchId });

      // 1. Get shipment from Snipcart
      const order = await fetch(`/api/orders/${value}`).then((res) =>
        res.json()
      );
      // from the Snipcart order we get the Chit Chat ID
      const { chitChatId } = order.metadata;
      console.log('Got the Chit Chat ID: ', chitChatId);
      // 2. Add to Chit Chat batch
      await batchMutation
        .mutateAsync({
          batch_id: batchId,
          shipment_ids: [chitChatId],
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err);
          console.log('That one didnt work');
        });
      // 3. Refresh the orders in this batch
      console.log('Refreshing the batch', batchId);
      await queryClient.refetchQueries(['shipments-in-batch', batchId]);
      console.log('DONE!');
      // 4. Mark it as shipped in Snipcart
      console.log('Marking as shipped in Snipcart');
      const updatedOrder = await fetch(`/api/orders/${value}`, {
        method: 'POST',
      }).then((res) => res.json());
      console.log(updatedOrder);
      // play a beep
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      nProgress.done();
    }
    await wait(100);
    form.reset();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
          <input
            type="radio"
            onChange={handleChange}
            checked={action === 'goto'}
            name="action"
            value="goto"
            id="goto"
          />
          Go to
        </label>
        <label htmlFor="ship">
          <input
            type="radio"
            onChange={handleChange}
            checked={action === 'ship'}
            name="action"
            value="ship"
            id="ship"
          />
          Batch + Ship
        </label>
      </div>
    </ScannerStyles>
  );
}
