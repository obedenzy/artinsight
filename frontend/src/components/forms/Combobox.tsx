import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Check } from 'lucide-react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const Combobox = forwardRef<HTMLInputElement, Props>(
  ({ options, onSelect, placeholder, value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setFilteredOptions(
        options.filter(option =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
      setIsOpen(true);
      if (onChange) onChange(e);
      onSelect(value);
    };

    const handleSelect = (option: string) => {
      setInputValue(option);
      onSelect(option);
      setIsOpen(false);
    };

    return (
      <div className="relative" ref={wrapperRef}>
        <input
          {...props}
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder={placeholder}
        />
        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            {filteredOptions.map((option) => (
              <li
                key={option}
                className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-purple-50 ${
                  inputValue === option ? 'bg-purple-50' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                <span className="block truncate">{option}</span>
                {inputValue === option && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Check className="h-4 w-4 text-purple-600" />
                  </span>
                )}
              </li>
            ))}
            {inputValue && !filteredOptions.includes(inputValue) && (
              <li
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-purple-50"
                onClick={() => handleSelect(inputValue)}
              >
                Add "{inputValue}"
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
);
