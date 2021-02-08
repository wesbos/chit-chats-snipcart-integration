import { useRouter } from 'next/dist/client/router';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import wait from 'waait';

const ScannerStyles = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  input {
    width: 100%;
    padding: 20px;
  }
`

export function Scanner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
  const [lastScan, setLastScan] = useState({
    timestamp: 0,
    result: ''
  });

  // const QrReader = useScanner();
  function handleResult(result: string) {
    console.log(result);
    const [type, id] = result.split(':');
    if(type === 'batch') {
      router.push(`/batches/${id}`);
    }

  }
  async function handleScan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const element = e.currentTarget.barcodeValue as HTMLInputElement;
    const value = element.value;
    console.log(e.target)

    const [type, id] = value.split(':');
    if (type === 'batch') {
      router.push(`/batches/${id}`);
    }
    await wait(1000);
    form.reset();
  }

  return <ScannerStyles className="no-print">
    <audio ref={audioRef} src="/beep.wav"></audio>
    <form onSubmit={handleScan}>
      <input name="barcodeValue" type="text"/>

    </form>
  </ScannerStyles>
}
