import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react';
// import QrReader from 'react-qr-scanner';
import Loadable from 'react-loadable';

const QR = Loadable({
  loader: () => import('react-qr-scanner'),
  loading: () => <p>Loading..</p>,
});

// function Nothing() {
//   return <p>Nothing!</p>
// }
// function useScanner() {
//   const [module, setModule] = useState(Nothing);
//   useEffect(() => {
//     console.log('Mounted')
//     const reader = dynamic(() => import('react-qr-scanner'), { ssr: false });
//     console.log(reader)
//     // console.log(reader);
//     setModule(reader);
//   }, []);
//   console.log(module);
//   return module;
// }

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
  function handleScan(result) {
      if (result) {
        const timeSinceLastScan = Date.now() - lastScan.timestamp;
        const isSameScanAsLastTime = lastScan.result === result;
        // prevent double scans, ignore if the last scan was less than 5 seconds ago and this is the same value.
        if (timeSinceLastScan < 5000 && isSameScanAsLastTime) return;
        audioRef.current.currentTime = 0;
        audioRef.current?.play();
        handleResult(result)

        setLastScan({
          result: result,
          timestamp: Date.now()
        })
      }
  }

  return <div className="no-print">
    <audio ref={audioRef} src="/beep.wav"></audio>
    <QR
      delay={150}
      onError={console.error}
      onScan={handleScan}
      style={{ width: '100%' }}
    />
  </div>
}
