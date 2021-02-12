import { useQuery } from 'react-query';

export function useShipment(shipmentId: string) {
  const { data = [], refetch } = useQuery(['shipment', shipmentId], () =>
    fetch(`/api/shipment/${shipmentId}`).then((res) => res.json())
  );
  return {
    shipment: data,
    refetchBatches: refetch,
  };
}
