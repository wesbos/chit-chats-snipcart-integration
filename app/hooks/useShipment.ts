import { useMutation, useQuery } from 'react-query';

export function useShipment() {
  const { data = [], refetch } = useQuery(
    ['shipment', shipmentId],
    (shipmentId: string) =>
      fetch(`/api/shipment/${shipmentId}`).then((res) => res.json())
  );
  return {
    shipment: data,
    refetchBatches: refetch,
  };
}
