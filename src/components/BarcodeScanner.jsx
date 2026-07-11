import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function BarcodeScanner({ onScanSuccess, onClose }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    Html5Qrcode.getCameras()
      .then(cameras => {
        if (!cameras || cameras.length === 0) {
          setError("No camera found on this device.");
          return;
        }

        // Prefer back camera on mobile
        const cameraId =
          cameras.find(c =>
            c.label.toLowerCase().includes("back") ||
            c.label.toLowerCase().includes("rear") ||
            c.label.toLowerCase().includes("environment")
          )?.id || cameras[0].id;

        setScanning(true);

        scanner.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.0,
            disableFlip: false
          },
          (decodedText) => {
            // Success — stop scanner and pass barcode up
            scanner.stop().then(() => {
              setScanning(false);
              onScanSuccess(decodedText);
            });
          },
          () => {
            // Scan attempt failed — this fires constantly while scanning
            // Don't set error here, it's normal behaviour
          }
        ).catch(err => {
          console.error("Camera error:", err);
          if (err.toString().includes("Permission denied")) {
            setError("📱 Camera permission denied. Please allow camera access in settings.");
          } else if (window.location.protocol === "http:" && !window.location.hostname.includes("localhost")) {
            setError("⚠️ HTTPS required for camera access on mobile. Use HTTPS or install the app.");
          } else {
            setError("Camera access failed. Try on a real device with a camera.");
          }
        });
      })
      .catch(() => {
        if (window.location.protocol === "http:" && !window.location.hostname.includes("localhost")) {
          setError("⚠️ HTTPS required: Camera access needs a secure connection. For development, use localhost or ngrok.");
        } else {
          setError("📷 Could not access camera. Make sure: 1) Device has a camera, 2) You allowed camera permission, 3) You're on HTTPS (for real devices)");
        }
      });

    // Cleanup on unmount
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="scanner-overlay">
      <div className="scanner-box">
        <div className="scanner-header">
          <h3>📷 Scan Barcode</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {error ? (
          <div className="scanner-error">
            <p>⚠️ {error}</p>
            <button onClick={onClose}>Go back</button>
          </div>
        ) : (
          <>
            <div id="qr-reader" style={{ width: "100%" }} />
            {scanning && (
              <p className="scan-hint">
                Point camera at the barcode on the packet
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BarcodeScanner;