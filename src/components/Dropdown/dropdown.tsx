import React, { useState } from 'react';

interface Option {
  value: string | number;
  label: string | number;
}

interface DropdownProps {
  options?: Option[];
  onSelect?: (selectedValue: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options = [], onSelect = () => {}, placeholder = 'Select an option' }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value as any);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-white bg-darkVariantOne rounded-sm shadow-sm focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <ul className="absolute right-0 w-full mt-2 space-y-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 h-32 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
