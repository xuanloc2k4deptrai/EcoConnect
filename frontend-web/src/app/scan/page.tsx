'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function QRScanPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setError('');
      setScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on mobile
      });

      streamRef.current = stream;
      setCameraPermission('granted');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Start QR code detection
      detectQRCode();
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraPermission('denied');
      setError('Không thể truy cập camera. Vui lòng cấp quyền hoặc nhập mã thủ công.');
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const detectQRCode = () => {
    // Mock QR detection - In production, use a library like jsQR or html5-qrcode
    const interval = setInterval(() => {
      if (!scanning) {
        clearInterval(interval);
        return;
      }

      // Simulate QR code detection
      // In real implementation, you would:
      // 1. Draw video frame to canvas
      // 2. Get image data from canvas
      // 3. Use QR library to decode
      
      // For demo, we'll just show how it would work
      console.log('Scanning for QR code...');
    }, 100);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      // Navigate to product passport view
      router.push(`/passport/${manualInput.trim()}`);
    }
  };

  const simulateScan = (productId: string) => {
    stopCamera();
    router.push(`/passport/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quét mã QR
          </h1>
          <p className="text-gray-600">
            Quét mã QR trên sản phẩm để xem thông tin hộ chiếu xanh
          </p>
        </div>

        {/* Scanner Card */}
        <Card className="mb-6">
          <CardBody>
            {!scanning ? (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <Button
                  onClick={startCamera}
                  className="w-full max-w-xs"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  Bật camera để quét
                </Button>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-64 object-cover"
                    playsInline
                    muted
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Scanner overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-4 border-white rounded-2xl shadow-lg">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400" />
                    </div>
                  </div>

                  {/* Scanning indicator */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <div className="inline-flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
                      <LoadingSpinner size="sm" />
                      <span className="text-white text-sm">Đang quét...</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={stopCamera}
                  variant="secondary"
                  className="w-full mt-4"
                >
                  Dừng quét
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Manual Input */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Nhập mã thủ công</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleManualSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã sản phẩm hoặc NFT Token ID
                  </label>
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="VD: NFT-001-2024 hoặc 0x7f8c...3d2a"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Xem thông tin
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Demo Products */}
        <Card className="mt-6">
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Demo - Sản phẩm mẫu</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <button
                onClick={() => simulateScan('NFT-001-2024')}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👕</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Áo Cotton Organic Premium</div>
                    <div className="text-sm text-gray-500">NFT-001-2024</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button
                onClick={() => simulateScan('NFT-002-2024')}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🥤</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Bình Nước Inox Tái Chế</div>
                    <div className="text-sm text-gray-500">NFT-002-2024</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button
                onClick={() => simulateScan('NFT-003-2024')}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Túi Vải Canvas Hữu Cơ</div>
                    <div className="text-sm text-gray-500">NFT-003-2024</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <strong>Lưu ý:</strong> Để sử dụng tính năng quét QR, trình duyệt cần được cấp quyền truy cập camera. 
              Bạn cũng có thể nhập mã sản phẩm thủ công nếu không thể quét mã.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
