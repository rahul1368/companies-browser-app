import React, { useEffect, useRef, useState } from 'react';
import useOutsideAlerter from '~/hooks/useOutsideAlerter';

interface AutocompleteFilterProps {
  options: string[];
  label: string;
  filterKey: string;
  onSelect: (selectedOptions: string[]) => void;
  handleNameAndCountryCodeFilterChange: (filterKey: string, filterVal: string[]) => void;
}

const AutocompleteFilter: React.FC<AutocompleteFilterProps> = ({ label, filterKey, options, onSelect, handleNameAndCountryCodeFilterChange }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useOutsideAlerter(inputRef);

  useEffect(() => {
    // Update filtered options based on input value
    setFilteredOptions(
      options?.filter(
        (option) =>
          !selectedOptions.includes(option) &&
          option?.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, options, selectedOptions]);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handling of Enter key to add the current input value as a selected option
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const updatedOptions = [...selectedOptions, inputValue.trim()];
      setSelectedOptions(updatedOptions);
      onSelect(updatedOptions);
      setInputValue('');
    }

    // Handling of Backspace key to remove the last selected option if the input is empty
    if (e.key === 'Backspace' && inputValue === '' && selectedOptions.length > 0) {
      const updatedOptions = selectedOptions.slice(0, selectedOptions.length - 1);
      setSelectedOptions(updatedOptions);
      onSelect(updatedOptions);
    }
  };

  const handleOptionClick = (option: string) => {
    // Toggling the selected option
    const isSelected = selectedOptions.includes(option);
    const updatedOptions = isSelected
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    // Updating state
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
    setInputValue('');
    setIsOpen(false);

    // Focus on the input after selecting an option
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap border w-full mb-1">
        {selectedOptions.map((option) => (
            <div className="flex items-center mt-2">
                <button
                    onClick={() => handleOptionClick(option)}
                    className="m-1 bg-blue-500 text-white px-4 py-4 rounded-full focus:outline-none"
                >
                    {option}
                    <span
                        onClick={() => handleOptionClick(option)}
                        className="bg-red-500 text-white px-2 py-1 rounded-full ml-1 cursor-pointer"
                    >
                        &times;
                    </span>
                </button>
            </div>    
        ))}
        <div className="w-full mt-4">
          <input
            ref={inputRef}
            className="w-full flex-1 outline-none"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={label}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>
      {isOpen && filteredOptions?.length > 0 && (
        <ul
          ref={dropdownRef} 
          className='absolute z-10 bg-white border rounded-md shadow-md w-full'
        >
          {options
            .filter(
              (option) =>
                !selectedOptions.includes(option) &&
                option?.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white z-index"
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteFilter;
