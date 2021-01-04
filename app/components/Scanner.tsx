import dynamic from 'next/dynamic'
import { useRef, useState } from 'react';

export function Scanner() {
  const QrReader = dynamic(() => import('react-qr-scanner'));
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lastScan, setLastScan] = useState({
    timestamp: 0,
    result: ''
  });

  function handleScan(result) {

      if (result) {
        const timeSinceLastScan = Date.now() - lastScan.timestamp;
        const isSameScanAsLastTime = lastScan.result === result;
        // prevent double scans, ignore if the last scan was less than 5 seconds ago and this is the same value.
        if (timeSinceLastScan < 5000 && isSameScanAsLastTime) return;
        audioRef.current.currentTime = 0;
        audioRef.current?.play();
        console.log(result)
        setLastScan({
          result: result,
          timestamp: Date.now()
        })
      }
  }
  return <div>
    <audio ref={audioRef} src="/beep.wav"></audio>
    <QrReader
      delay={150}
      onError={console.error}
      onScan={handleScan}
      style={{ width: '100%' }}
    />
  </div>
}
