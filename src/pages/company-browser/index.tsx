import React, { useEffect, useState } from 'react'
import CompanyItemsList from './CompaniesList';
import { CompanyFilterTypes } from './CompanyFilters';
import FullScreenLoader from '~/components/FullScreenLoader';

export default function CompaniesListPage(){
  const [companiesList, setCompaniesList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [filters, setFilters] = useState({
    [CompanyFilterTypes.ByCompanyName]: '',
    [CompanyFilterTypes.ByCountryCode]: '',
    [CompanyFilterTypes.HasAnIPO]: false,
    [CompanyFilterTypes.HasMadeAnAcquisiton]: false,
    [CompanyFilterTypes.HasBeenAcquired]: false,
  });

  const handleApplyFilter = (filters) => {
    setFilters(filters);
    setCurrentPage(0);
  }

  useEffect(() => {
    const getCompaniesData = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/company-browser?pageNo=${currentPage + 1}&pageSize=10&filters=${encodeURIComponent(JSON.stringify(filters))}`);
      const json = await response.json();
      setIsLoading(false);
      setCompaniesList(json.companiesList);
      setTotalPages(json.totalPages);
      if(!isDataLoaded){
        setIsDataLoaded(true);
      }
      return json;
    };
    getCompaniesData();
  }, [currentPage, filters]);

  return(
    <div className='container overflow-hidden min-h-screen mx-auto my-auto'>
      {isLoading && <FullScreenLoader />}
      {
        isDataLoaded && (
          <div className='container overflow-hidden fixed'>
            <header className="text-center mt-4">
              <h2 className="text-5xl font-extrabold text-blue-600 mb-4">Companies Browser</h2>
            </header>
            <CompanyItemsList
              data={companiesList}
              totalPages={totalPages}
              handleCurrentPageChange={setCurrentPage}
              handleApplyFilter={handleApplyFilter}
            />
          </div>
        )
      }
    </div>
  );
}

  
  