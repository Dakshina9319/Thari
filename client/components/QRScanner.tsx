import React, { useEffect, useRef } from 'react';

type QRScannerProps = {
  /** Callback with the scanned QR code string */
  onScan: (code: string) => void;
  /** Optional callback when the scanner is closed */
  onClose?: () => void;
};

/**
 * QRScanner component using the html5-qrcode library via CDN.
 * It loads the script dynamically (no npm needed) and renders the scanner.
 */
export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<any>(null);

  // Load the CDN script once
  useEffect(() => {
    if (document.getElementById('html5-qrcode-script')) return;
    const script = document.createElement('script');
    script.id = 'html5-qrcode-script';
    script.src = 'https://unpkg.com/html5-qrcode@2.3.8/minified/html5-qrcode.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize scanner when script is ready
  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore - html5Qrcode is a global injected by the script
      if (window.Html5Qrcode && scannerRef.current) {
        clearInterval(interval);
        const html5QrCode = new window.Html5Qrcode('qr-reader');
        html5QrCodeRef.current = html5QrCode;
        html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: 250 },
          (decodedText: string) => {
            onScan(decodedText);
            // Stop after first successful scan
            html5QrCode.stop().catch(() => {});
          },
          (errorMessage: string) => {
            // You can handle scan errors here if needed
          }
        );
      }
    }, 500);
    return () => {
      clearInterval(interval);
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [onScan]);

  return (
    <div className="w-full h-full flex flex-col items-center" ref={scannerRef}>
      {/* The library will replace this div with the camera view */}
      <div id="qr-reader" style={{ width: '100%', maxWidth: '400px' }} />
      {onClose && (
        <button
          type="button"
          className="mt-4 text-sm text-primary underline"
          onClick={onClose}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
