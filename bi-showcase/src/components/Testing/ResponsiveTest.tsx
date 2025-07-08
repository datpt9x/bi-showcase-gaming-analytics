import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, RotateCcw } from 'lucide-react';

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
  category: 'mobile' | 'tablet' | 'desktop';
}

const ResponsiveTest: React.FC = () => {
  const [isTestMode, setIsTestMode] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DevicePreset | null>(null);

  const devicePresets: DevicePreset[] = [
    // Mobile devices
    { name: 'iPhone SE', width: 375, height: 667, icon: <Smartphone className="h-4 w-4" />, category: 'mobile' },
    { name: 'iPhone 12', width: 390, height: 844, icon: <Smartphone className="h-4 w-4" />, category: 'mobile' },
    { name: 'iPhone 12 Pro Max', width: 428, height: 926, icon: <Smartphone className="h-4 w-4" />, category: 'mobile' },
    { name: 'Samsung Galaxy S21', width: 384, height: 854, icon: <Smartphone className="h-4 w-4" />, category: 'mobile' },
    { name: 'Google Pixel 5', width: 393, height: 851, icon: <Smartphone className="h-4 w-4" />, category: 'mobile' },
    
    // Tablets
    { name: 'iPad Mini', width: 768, height: 1024, icon: <Tablet className="h-4 w-4" />, category: 'tablet' },
    { name: 'iPad Air', width: 820, height: 1180, icon: <Tablet className="h-4 w-4" />, category: 'tablet' },
    { name: 'iPad Pro 11"', width: 834, height: 1194, icon: <Tablet className="h-4 w-4" />, category: 'tablet' },
    { name: 'iPad Pro 12.9"', width: 1024, height: 1366, icon: <Tablet className="h-4 w-4" />, category: 'tablet' },
    { name: 'Samsung Galaxy Tab', width: 800, height: 1280, icon: <Tablet className="h-4 w-4" />, category: 'tablet' },
    
    // Desktop
    { name: 'Laptop 13"', width: 1280, height: 800, icon: <Monitor className="h-4 w-4" />, category: 'desktop' },
    { name: 'Laptop 15"', width: 1440, height: 900, icon: <Monitor className="h-4 w-4" />, category: 'desktop' },
    { name: 'Desktop HD', width: 1920, height: 1080, icon: <Monitor className="h-4 w-4" />, category: 'desktop' },
    { name: 'Desktop 2K', width: 2560, height: 1440, icon: <Monitor className="h-4 w-4" />, category: 'desktop' },
    { name: 'Desktop 4K', width: 3840, height: 2160, icon: <Monitor className="h-4 w-4" />, category: 'desktop' },
  ];

  const applyDeviceSize = (device: DevicePreset) => {
    if (isTestMode) {
      // Create or update the test iframe
      let testFrame = document.getElementById('responsive-test-frame') as HTMLIFrameElement;
      
      if (!testFrame) {
        testFrame = document.createElement('iframe');
        testFrame.id = 'responsive-test-frame';
        testFrame.src = window.location.href;
        testFrame.style.position = 'fixed';
        testFrame.style.top = '50%';
        testFrame.style.left = '50%';
        testFrame.style.transform = 'translate(-50%, -50%)';
        testFrame.style.zIndex = '9999';
        testFrame.style.border = '2px solid #374151';
        testFrame.style.borderRadius = '8px';
        testFrame.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        testFrame.style.backgroundColor = '#1f2937';
        document.body.appendChild(testFrame);
      }
      
      testFrame.style.width = `${device.width}px`;
      testFrame.style.height = `${device.height}px`;
      testFrame.style.display = 'block';
      
      setSelectedDevice(device);
    }
  };

  const closeTestMode = () => {
    const testFrame = document.getElementById('responsive-test-frame');
    if (testFrame) {
      testFrame.remove();
    }
    setIsTestMode(false);
    setSelectedDevice(null);
  };

  const toggleTestMode = () => {
    if (isTestMode) {
      closeTestMode();
    } else {
      setIsTestMode(true);
    }
  };

  const rotateDevice = () => {
    if (selectedDevice) {
      const rotatedDevice = {
        ...selectedDevice,
        width: selectedDevice.height,
        height: selectedDevice.width,
        name: `${selectedDevice.name} (Rotated)`
      };
      applyDeviceSize(rotatedDevice);
    }
  };

  const getCategoryDevices = (category: 'mobile' | 'tablet' | 'desktop') => {
    return devicePresets.filter(device => device.category === category);
  };

  if (!isTestMode) {
    return (
      <button
        onClick={toggleTestMode}
        className="fixed top-20 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg transition-colors"
        title="Test Responsive Design"
      >
        <Monitor className="h-5 w-5" />
      </button>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={closeTestMode} />
      
      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-[10000] bg-gray-900 rounded-lg p-4 border border-gray-700 text-white max-w-sm max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Responsive Test</h3>
          <div className="flex items-center space-x-2">
            {selectedDevice && (
              <button
                onClick={rotateDevice}
                className="p-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                title="Rotate Device"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={closeTestMode}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {selectedDevice && (
          <div className="mb-4 p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {selectedDevice.icon}
              <span className="font-medium">{selectedDevice.name}</span>
            </div>
            <div className="text-sm text-gray-400">
              {selectedDevice.width} × {selectedDevice.height}
            </div>
          </div>
        )}

        {/* Mobile Devices */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile Devices
          </h4>
          <div className="space-y-1">
            {getCategoryDevices('mobile').map((device) => (
              <button
                key={device.name}
                onClick={() => applyDeviceSize(device)}
                className={`w-full text-left p-2 rounded text-sm transition-colors ${
                  selectedDevice?.name === device.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{device.name}</span>
                  <span className="text-xs text-gray-400">
                    {device.width}×{device.height}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tablet Devices */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
            <Tablet className="h-4 w-4 mr-2" />
            Tablet Devices
          </h4>
          <div className="space-y-1">
            {getCategoryDevices('tablet').map((device) => (
              <button
                key={device.name}
                onClick={() => applyDeviceSize(device)}
                className={`w-full text-left p-2 rounded text-sm transition-colors ${
                  selectedDevice?.name === device.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{device.name}</span>
                  <span className="text-xs text-gray-400">
                    {device.width}×{device.height}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Devices */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
            <Monitor className="h-4 w-4 mr-2" />
            Desktop Devices
          </h4>
          <div className="space-y-1">
            {getCategoryDevices('desktop').map((device) => (
              <button
                key={device.name}
                onClick={() => applyDeviceSize(device)}
                className={`w-full text-left p-2 rounded text-sm transition-colors ${
                  selectedDevice?.name === device.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{device.name}</span>
                  <span className="text-xs text-gray-400">
                    {device.width}×{device.height}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Click outside or press × to close test mode
          </p>
        </div>
      </div>
    </>
  );
};

export default ResponsiveTest;
