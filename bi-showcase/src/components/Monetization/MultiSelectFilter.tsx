import React, { useState, useMemo } from 'react';
import { Search, Check, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface MultiSelectFilterProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  maxHeight?: string;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Search...",
  maxHeight = "max-h-48"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const selectAllState = useMemo(() => {
    if (filteredOptions.length === 0) return 'none';

    const selectedCount = filteredOptions.filter(option =>
      selectedValues.includes(option)
    ).length;

    if (selectedCount === 0) return 'none';
    if (selectedCount === filteredOptions.length) return 'all';
    return 'partial';
  }, [filteredOptions, selectedValues]);

  const handleSelectAll = () => {
    const allSelected = selectAllState === 'all';

    if (allSelected) {
      // Deselect all filtered options
      const newValues = selectedValues.filter(value =>
        !filteredOptions.includes(value)
      );
      onChange(newValues);
    } else {
      // Select all filtered options
      const newValues = [...new Set([...selectedValues, ...filteredOptions])];
      onChange(newValues);
    }
  };

  const handleOptionToggle = (option: string) => {
    const isSelected = selectedValues.includes(option);

    if (isSelected) {
      onChange(selectedValues.filter(value => value !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const getSelectAllIcon = () => {
    switch (selectAllState) {
      case 'all':
        return <Check className="w-4 h-4 text-blue-600" />;
      case 'partial':
        return <Minus className="w-4 h-4 text-blue-600" />;
      default:
        return <div className="w-4 h-4 border border-gray-300 rounded"></div>;
    }
  };

  const getSelectAllText = () => {
    switch (selectAllState) {
      case 'all':
        return 'Deselect All';
      case 'partial':
        return 'Select All';
      default:
        return 'Select All';
    }
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label} {selectedValues.length > 0 && (
            <span className="text-blue-600">({selectedValues.length} selected)</span>
          )}
        </label>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Collapsed Summary */}
      {!isExpanded && selectedValues.length > 0 && (
        <div className="text-sm text-gray-600 bg-gray-50 rounded p-2">
          {selectedValues.length === options.length ? (
            'All selected'
          ) : selectedValues.length <= 3 ? (
            selectedValues.join(', ')
          ) : (
            `${selectedValues.slice(0, 3).join(', ')} and ${selectedValues.length - 3} more`
          )}
        </div>
      )}

      {/* Expanded Filter */}
      {isExpanded && (
        <div className="border border-gray-300 rounded-md bg-white">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Select All / Clear All Controls */}
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={handleSelectAll}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                {getSelectAllIcon()}
                <span className="ml-2">{getSelectAllText()}</span>
                {filteredOptions.length !== options.length && (
                  <span className="ml-1 text-gray-500">
                    ({filteredOptions.length} filtered)
                  </span>
                )}
              </button>

              {selectedValues.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className={`${maxHeight} overflow-y-auto`}>
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                {searchTerm ? 'No matching options found' : 'No options available'}
              </div>
            ) : (
              <div className="py-1">
                {filteredOptions.map((option, index) => {
                  const isSelected = selectedValues.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleOptionToggle(option)}
                        className="mr-3 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className={`text-sm flex-1 truncate ${
                        isSelected ? 'text-blue-900 font-medium' : 'text-gray-900'
                      }`} title={option}>
                        {option}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 ml-2 flex-shrink-0" />
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer with count */}
          {filteredOptions.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>
                  {selectedValues.filter(v => filteredOptions.includes(v)).length} of {filteredOptions.length} selected
                </span>
                {searchTerm && (
                  <span>
                    Filtered from {options.length} total
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;
