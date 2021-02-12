import { useMutation, useQuery } from 'react-query';
import {
  ChitChatBatch,
  ChitChatAddShipmentToBatchInput,
} from '../utils/chitchats';

export default function useBatch(batchId: string | string[] | undefined) {
  const { data = [], refetch } = useQuery(['shipments-in-batch', batchId], () =>
    fetch(`/api/shipments?batch_id=${batchId}`).then((res) => res.json())
  );
  return {
    shipments: data,
    refetchBatches: refetch,
  };
}

export function useAddToBatch() {
  const mutation = useMutation<
    ChitChatBatch,
    any,
    ChitChatAddShipmentToBatchInput
  >((body) =>
    fetch(`/api/shipments/add_to_batch`, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((x) => x.json())
  );
  return mutation;
}
