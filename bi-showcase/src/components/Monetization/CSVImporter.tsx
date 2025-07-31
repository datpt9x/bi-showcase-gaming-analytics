import React, { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { monetizationDataService, MonetizationRecord } from '../../services/MonetizationDataService';

interface CSVImporterProps {
  onImport: (data: MonetizationRecord[]) => void;
  onClose: () => void;
}

const CSVImporter: React.FC<CSVImporterProps> = ({ onImport, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<MonetizationRecord[]>([]);
  const [importStats, setImportStats] = useState<{
    totalRows: number;
    validRows: number;
    errors: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setLoading(true);

    try {
      const text = await selectedFile.text();
      const lines = text.trim().split('\n');
      
      if (lines.length < 2) {
        throw new Error('CSV file must contain at least a header row and one data row');
      }

      // Validate CSV structure
      const headers = lines[0].split(',');
      const expectedHeaders = [
        'Week', 'Date', 'Month', 'App', 'Ad source', 'Country', 'Format',
        'Estimated earnings (USD)', 'Observed eCPM (USD)', 'Requests',
        'Match rate', 'Matched requests', 'Show rate', 'Impressions',
        'CTR', 'Clicks', 'Ads ARPV (USD)', 'Ads ARPU (USD)',
        'Ad viewers (AV)', 'Active users (AU)', 'Ad viewer rate',
        'Imps / AV', 'Imps / AU', 'Bid requests', 'Bids in auction (%)',
        'Bids in auction', 'Win rate', 'Winning bids'
      ];

      const missingHeaders = expectedHeaders.filter(header => 
        !headers.some(h => h.trim().toLowerCase() === header.toLowerCase())
      );

      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
      }

      // Parse the data
      const parsedData = monetizationDataService.parseCSV(text);
      const validRows = parsedData.filter(row => row.estimatedEarnings > 0 || row.impressions > 0);
      
      setPreview(validRows.slice(0, 10)); // Show first 10 rows as preview
      setImportStats({
        totalRows: lines.length - 1, // Exclude header
        validRows: validRows.length,
        errors: parsedData.length !== validRows.length ? 
          [`${parsedData.length - validRows.length} rows with invalid or zero values were filtered out`] : []
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error parsing CSV file');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    if (file && importStats) {
      setLoading(true);
      try {
        // Re-parse the full file for import
        file.text().then(text => {
          const parsedData = monetizationDataService.parseCSV(text);
          const validRows = parsedData.filter(row => row.estimatedEarnings > 0 || row.impressions > 0);
          onImport(validRows);
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error importing data');
        setLoading(false);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Upload className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Import CSV Data</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* File Upload Area */}
          {!file && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your CSV file here, or click to browse
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Supports CSV files with monetization data
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Import Error</h4>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Processing file...</span>
            </div>
          )}

          {/* File Info and Stats */}
          {file && importStats && !loading && (
            <div className="space-y-6">
              {/* File Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <FileText className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-900">{file.name}</span>
                  <span className="ml-2 text-sm text-gray-600">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Rows:</span>
                    <span className="ml-2 font-medium">{importStats.totalRows.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Valid Rows:</span>
                    <span className="ml-2 font-medium text-green-600">{importStats.validRows.toLocaleString()}</span>
                  </div>
                </div>

                {importStats.errors.length > 0 && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h5 className="text-sm font-medium text-yellow-800 mb-1">Warnings:</h5>
                    <ul className="text-sm text-yellow-700 list-disc list-inside">
                      {importStats.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Data Preview */}
              {preview.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Data Preview</h4>
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">App</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ad Source</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">eCPM</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {preview.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-900">{row.date}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{row.app}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{row.adSource}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{row.country}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(row.estimatedEarnings)}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(row.observedECPM)}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{row.impressions.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {preview.length < importStats.validRows && (
                    <p className="text-sm text-gray-600 mt-2">
                      Showing first 10 rows of {importStats.validRows.toLocaleString()} total rows
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="flex items-center text-sm text-gray-600">
            {importStats && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Ready to import {importStats.validRows.toLocaleString()} rows
              </>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!file || !importStats || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Importing...' : 'Import Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSVImporter;
