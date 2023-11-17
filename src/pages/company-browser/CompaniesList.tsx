import ReactPaginate from "react-paginate";
import CompanyFilters from "./CompanyFilters";
import CompanyDetails from "./CompanyDetails";
import { useMemo, useState } from "react";

interface ICompanyItem{
  id: string;
  entity_type: string;
  entity_id: number;
  name: string;
  homepage_url: string;
  overview: string;
  country_code: string;
  state_code: string;
  city: string;
  relatedIpos: any[];
  acquiredByList: any[];
  acquisitionsList: any[];
}

interface ICompaniesListProps{
  data: any;
  totalPages: number;
  handleCurrentPageChange: (page: number) => void;
  handleApplyFilter: (state: any) => void;
}
const CompaniesList: React.FC<ICompaniesListProps> = ({ data, totalPages, handleCurrentPageChange, handleApplyFilter }) => {
  const [showFilters, setShowFilters] = useState(false);
  const countryCodes = useMemo<string[]>(() => {
    let countryCodesSet = new Set<string>();
    data?.map((item: ICompanyItem) => (item?.country_code && countryCodesSet.add(item.country_code)));
    return [...Array.from(countryCodesSet)];
  }, [data]);
  const countryNames = useMemo<string[]>(() => data?.map((item: ICompanyItem) => (item?.name)), [data]);

  const handlePageChange = (selected: { selected: number }) => {
    handleCurrentPageChange(selected.selected);
  };

  const renderData = () => {
    return data?.map((item: ICompanyItem) => (
      <CompanyDetails
        key={item.id}
        name={item.name}
        id={item.id}
        state_code={item.state_code}
        country_code={item.country_code}
        overview={item.overview}
        homepage_url={item.homepage_url}
        city={item.city}
        relatedIpos={item.relatedIpos}
        acquiredList={item.acquiredByList}
        acquisitionsList={item.acquisitionsList}
      />
    ));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar - Filter Section */}
      <CompanyFilters
        countryCodes={countryCodes}
        countryNames={countryNames}
        showFilters={showFilters}
        handleApplyFilter={handleApplyFilter}
      />

      {/* Button to toggle filters on mobile */}
      <button
        className={`md:hidden bg-blue-500 text-white px-4 py-2 rounded-md m-2 mt-4 w-auto`}
        onClick={toggleFilters}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      {/* Right Section - Paginated List */}
      <div className="md:w-2/3 lg:w-2/3 h-screen max-h-screen overflow-y-auto border p-4 overflow-hidden pb-48">
        {renderData()}
        <ReactPaginate
          pageCount={Math.ceil(totalPages)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="flex justify-center mt-4 mb-4 overflow-hidden"
          pageClassName="mx-auto my-auto px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
          activeClassName="bg-blue-500 border px-3 py-2 text-white rounded-md"
          previousClassName="border px-4 py-2 rounded-l"
          nextClassName="border px-4 py-2 rounded-r"
          breakClassName="mx-2"
        />
      </div>
    </div>
  );
};

export default CompaniesList;