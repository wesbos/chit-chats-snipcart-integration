import { useMutation, useQuery } from 'react-query';

export default function useBatch(batchId: string) {
  const { data = [], refetch } = useQuery(['shipments-in-batch', batchId], () =>
    fetch(`/api/shipments?batch_id=${batchId}`).then((res) => res.json())
  );
  return {
    shipments: data,
    refetchBatches: refetch,
  };
}

export function useAddToBatch() {
  const mutation = useMutation((body) =>
    fetch(`/api/shipments/add_to_batch`, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((x) => x.json())
  );
  return mutation;
}
