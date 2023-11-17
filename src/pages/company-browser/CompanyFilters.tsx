import React, { useRef, useState } from 'react'
import AutocompleteFilter from '~/components/AutoComplete';
import useOutsideAlerter from '~/hooks/useOutsideAlerter';

const InlineCheckbox = ({
  label,
  checked,
  onChange,
  className
}: {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}) => {
  return (
    <label className={`inline-flex items-center ${className}`}>
      <input
        type="checkbox"
        className="form-checkbox text-blue-500 h-5 w-5 mr-2 cursor-pointer appearance-none border-none focus:outline-none focus:border-transparent"
        checked={checked}
        onChange={onChange}
      />
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};


interface IAutoCompleteWrapperProps {
  label: string;
  filterKey: string;
  optionsList: string[];
  handleNameAndCountryCodeFilterChange: (filterKey: string, filterVal: string[]) => void;
}
const AutoCompleteWrapper: React.FC<IAutoCompleteWrapperProps> = ({
  label,
  filterKey,
  optionsList,
  handleNameAndCountryCodeFilterChange,
}) => {

  const handleSelect = (selectedOptions: string[]) => {
    handleNameAndCountryCodeFilterChange(filterKey, selectedOptions);
  };

  return (
    <AutocompleteFilter
      filterKey={filterKey}
      label={label}
      options={optionsList}
      onSelect={handleSelect}
      handleNameAndCountryCodeFilterChange={handleNameAndCountryCodeFilterChange}
    />
  );
};

export enum CompanyFilterTypes {
  ByCompanyName = 'byCompanyName',
  ByCountryCode = 'byCountryCode',
  HasAnIPO = 'byhasAnIpo',
  HasMadeAnAcquisiton = 'byHasMadeAnAcquisiton',
  HasBeenAcquired = 'byHasBeenAcquired',
}
export default function CompanyFilters({
  showFilters,
  countryCodes,
  countryNames,
  handleApplyFilter,
}: {
  showFilters: boolean;
  countryCodes: string[];
  countryNames: string[];
  handleApplyFilter: (state: any) => void;
}) {
  const [state, setState] = useState({
    [CompanyFilterTypes.ByCompanyName]: [],
    [CompanyFilterTypes.ByCountryCode]: [],
    [CompanyFilterTypes.HasAnIPO]: false,
    [CompanyFilterTypes.HasMadeAnAcquisiton]: false,
    [CompanyFilterTypes.HasBeenAcquired]: false,
  });
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const handleNameAndCountryCodeFilterChange = (filterKey: string, filterVal: string[]) => {
    setState(state => ({
      ...state,
      [filterKey]: filterVal,
    }));
  }
  const handleFilterChange = (filterKey: string) => (e: { target: { value: any; checked: any; }; }) => {
    const filterVal = e.target.checked;
    setState(state => ({
      ...state,
      [filterKey]: filterVal,
    }));
  }

  const handleApplyBtnClick = () => {
    handleApplyFilter(state);
  }
  return (
    <div ref={wrapperRef} className={`md:w-1/3 sm:w-1 lg:w-1/3 xs:w-1 p-4 ${showFilters ? 'block' : 'hidden'} md:block bg-gray-200`}>
      <h2 className="text-xl font-semibold mb-4">Filter Section</h2>
      <AutoCompleteWrapper
        label="Filter by company name"
        filterKey={CompanyFilterTypes.ByCompanyName}
        optionsList={countryNames}
        handleNameAndCountryCodeFilterChange={handleNameAndCountryCodeFilterChange}
      />
      <AutoCompleteWrapper
        label="Filter by company country code"
        filterKey={CompanyFilterTypes.ByCountryCode}
        optionsList={countryCodes}
        handleNameAndCountryCodeFilterChange={handleNameAndCountryCodeFilterChange}
      />
      <InlineCheckbox
        label="Has an IPO"
        checked={state[CompanyFilterTypes.HasAnIPO]}
        onChange={handleFilterChange(CompanyFilterTypes.HasAnIPO)}
        className="m-2 cursor-pointer"
      />
      <InlineCheckbox
        label="Has made an acquisiton"
        checked={state[CompanyFilterTypes.HasMadeAnAcquisiton]}
        onChange={handleFilterChange(CompanyFilterTypes.HasMadeAnAcquisiton)}
        className="m-2 cursor-pointer"
      />
      <InlineCheckbox
        label="Has been acquired"
        checked={state[CompanyFilterTypes.HasBeenAcquired]}
        onChange={handleFilterChange(CompanyFilterTypes.HasBeenAcquired)}
        className="m-2 cursor-pointer"
      />
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full`}
        onClick={handleApplyBtnClick}
      >
        Apply
      </button>
    </div>
  );
}