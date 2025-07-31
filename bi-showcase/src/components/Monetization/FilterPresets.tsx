import React, { useState, useEffect } from 'react';
import { Save, Bookmark, Trash2, Edit3, Check, X } from 'lucide-react';

interface FilterPreset {
  id: string;
  name: string;
  filters: any;
  createdAt: string;
}

interface FilterPresetsProps {
  currentFilters: any;
  onApplyPreset: (filters: any) => void;
}

const FilterPresets: React.FC<FilterPresetsProps> = ({ currentFilters, onApplyPreset }) => {
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [editingPreset, setEditingPreset] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  // Load presets from localStorage on component mount
  useEffect(() => {
    const savedPresets = localStorage.getItem('monetization-filter-presets');
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (error) {
        console.error('Error loading filter presets:', error);
      }
    }
  }, []);

  // Save presets to localStorage whenever presets change
  useEffect(() => {
    localStorage.setItem('monetization-filter-presets', JSON.stringify(presets));
  }, [presets]);

  const hasActiveFilters = () => {
    return Object.values(currentFilters).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== '' && v !== null && v !== undefined);
      }
      return value !== '' && value !== null && value !== undefined;
    });
  };

  const savePreset = () => {
    if (!presetName.trim()) return;

    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name: presetName.trim(),
      filters: { ...currentFilters },
      createdAt: new Date().toISOString()
    };

    setPresets(prev => [...prev, newPreset]);
    setPresetName('');
    setShowSaveDialog(false);
  };

  const deletePreset = (id: string) => {
    if (confirm('Are you sure you want to delete this preset?')) {
      setPresets(prev => prev.filter(preset => preset.id !== id));
    }
  };

  const startEditing = (preset: FilterPreset) => {
    setEditingPreset(preset.id);
    setEditName(preset.name);
  };

  const saveEdit = () => {
    if (!editName.trim()) return;

    setPresets(prev => prev.map(preset => 
      preset.id === editingPreset 
        ? { ...preset, name: editName.trim() }
        : preset
    ));
    setEditingPreset(null);
    setEditName('');
  };

  const cancelEdit = () => {
    setEditingPreset(null);
    setEditName('');
  };

  const getFilterSummary = (filters: any) => {
    const summary: string[] = [];
    
    if (filters.dateRange?.start && filters.dateRange?.end) {
      summary.push(`Date: ${filters.dateRange.start} to ${filters.dateRange.end}`);
    }
    
    if (filters.apps?.length) {
      summary.push(`Apps: ${filters.apps.length} selected`);
    }
    
    if (filters.adSources?.length) {
      summary.push(`Ad Sources: ${filters.adSources.length} selected`);
    }
    
    if (filters.countries?.length) {
      summary.push(`Countries: ${filters.countries.length} selected`);
    }
    
    if (filters.formats?.length) {
      summary.push(`Formats: ${filters.formats.length} selected`);
    }

    return summary.length > 0 ? summary.join(', ') : 'No filters';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Bookmark className="w-4 h-4 mr-2" />
          Filter Presets
        </h4>
        <button
          onClick={() => setShowSaveDialog(true)}
          disabled={!hasActiveFilters()}
          className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-3 h-3 mr-1" />
          Save Current
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter preset name..."
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && savePreset()}
              className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={savePreset}
              disabled={!presetName.trim()}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Check className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setPresetName('');
              }}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Presets List */}
      <div className="space-y-2">
        {presets.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            No saved presets. Save your current filters to create a preset.
          </div>
        ) : (
          presets.map(preset => (
            <div key={preset.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                {editingPreset === preset.id ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onApplyPreset(preset.filters)}
                      className="flex-1 text-left"
                    >
                      <h5 className="font-medium text-gray-900 text-sm">{preset.name}</h5>
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        {getFilterSummary(preset.filters)}
                      </p>
                    </button>
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => startEditing(preset)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Edit preset name"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deletePreset(preset.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Delete preset"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {editingPreset !== preset.id && (
                <div className="text-xs text-gray-500">
                  Saved on {new Date(preset.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Presets */}
      {presets.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-xs font-medium text-gray-700 mb-2">Quick Actions</h5>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onApplyPreset({})}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
            {presets.slice(0, 3).map(preset => (
              <button
                key={preset.id}
                onClick={() => onApplyPreset(preset.filters)}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors truncate max-w-24"
                title={preset.name}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPresets;
