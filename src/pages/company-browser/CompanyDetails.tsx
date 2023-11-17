import React, { memo } from "react";
import AccordionItem from "~/components/Accordion";
import ModalWrapper from "~/components/Modal";
import { formatCurrency } from "~/utils";

const IPODetails = ({ ipo }) => {
  return (
    <div className="mb-6 p-4">
      <h3 className="text-lg font-semibold mb-4">IPO Details</h3>
        <li key={ipo?.id}>
          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">IPO ID:</p>
            <p className="w-full sm:w-2/3">{ipo?.ipo_id || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Valuation Amount:</p>
            <p className="w-full sm:w-2/3">{ipo?.valuation_amount || 'N/A'} {ipo?.valuation_currency_code || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Raised Amount:</p>
            <p className="w-full sm:w-2/3">{ipo?.raised_amount || 'N/A'} {ipo?.raised_currency_code || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Public Date:</p>
            <p className="w-full sm:w-2/3">{ipo?.public_at || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Stock Symbol:</p>
            <p className="w-full sm:w-2/3">{ipo?.stock_symbol || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Source Description:</p>
            <p className="w-full sm:w-2/3">{ipo?.source_description || 'N/A'}</p>
          </div>

          {ipo?.source_url && (
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Source URL:</p>
              <a
                href={ipo?.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                {ipo?.source_url}
              </a>
            </div>
          )}
        </li>
    </div>
  );
};

const AcquisitionDetails = ({ acquisition }) => {
  return (
    <div className="mb-6 p-4">
      <h3 className="text-lg font-semibold mb-4">Acquisition Details</h3>
        <li key={acquisition?.id}>
          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Acquisition ID:</p>
            <p className="w-full sm:w-2/3">{acquisition?.acquisition_id || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Acquiring Object ID:</p>
            <p className="w-full sm:w-2/3">{acquisition?.acquiring_object_id || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Acquired Object ID:</p>
            <p className="w-full sm:w-2/3">{acquisition?.acquired_object_id || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Price Amount:</p>
            <p className="w-full sm:w-2/3">{acquisition?.price_amount || 'N/A'} {acquisition?.price_currency_code || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Acquired At:</p>
            <p className="w-full sm:w-2/3">{acquisition?.acquired_at || 'N/A'}</p>
          </div>

          <div className="flex flex-col sm:flex-row mb-2">
            <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Source Description:</p>
            <p className="w-full sm:w-2/3">{acquisition?.source_description || 'N/A'}</p>
          </div>

          {acquisition?.source_url && (
            <div className="flex flex-col sm:flex-row mb-2">
              <p className="font-bold sm:w-1/3 mb-2 sm:mb-0">Source URL:</p>
              <a
                href={acquisition?.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                {acquisition?.source_url}
              </a>
            </div>
          )}
        </li>
    </div>
  );
};


const AcquiredDetails = ({ acquiredDetails }) => {
  return (
    <div className="bg-white p-4 rounded w-full">
      <h2 className="text-lg font-semibold mb-4">Acquisition Details</h2>  
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full">
        {/* Individual Acquisition Details Cards */}
        <div key={acquiredDetails.id} className="border p-3 rounded-md">
          <p className="text-gray-600 mb-2"><span className='font-bold'>Acquisition Date: </span>{acquiredDetails.acquired_at}</p>
          <p className="text-gray-600 mb-2"><span className='font-bold'>Acquired Company ID: </span>{acquiredDetails.acquired_object_id}</p>
          <p className="text-gray-600 mb-2"><span className='font-bold'>Acquiring Company ID: </span>{acquiredDetails.acquiring_object_id}</p>
          <p className="text-gray-600 mb-2"><span className='font-bold'>Acquisition ID: </span>{acquiredDetails.acquisition_id}</p>
          <p className="text-gray-600 mb-2"><span className='font-bold'>Acquisition Amount: </span>{formatCurrency(acquiredDetails.price_amount)}</p>
          <p className="text-gray-600 mb-2"><span className='font-bold'>Currency Code: </span>{acquiredDetails.price_currency_code}</p>
          <p className="text-gray-600 mb-2"><span className='font-bold'>Source Description: </span>{acquiredDetails.source_description}</p>
          {acquiredDetails.source_url && (
            <a
              href={acquiredDetails.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Source URL
            </a>
          )}
        </div>
      </div>
    </div>
  );
}



export const IposListAccordion = ({
  items,
}) => {
if(items.length === 0) return null;
return (
  <div className="max-w-lg mx-auto mt-8">
    {/* <IpoDetailsCard content={items} /> */}
    <AccordionItem title="Company's IPO Timeline">
      <ul>
          {items?.map((item, index) => (
            <li key={index} className={`mb-2 ${index < items.length - 1 ? 'border-b border-gray-200 py-2' : ''}`}>
              <div className='flex justify-between'>
                  <div className='my-auto'>
                      <b className="bg-grey">IPO: </b>
                      {item.ipo_id}
                  </div>
                  <ModalWrapper btnText="View more">
                      <IPODetails ipo={item}/>
                  </ModalWrapper>
              </div>
            </li>
          ))}
        </ul>
    </AccordionItem>
  </div>
);
};
export const AcquiredListAccordion = ({
  items,
}) => {
if(items.length === 0) return null;
return (
  <div className="max-w-lg mx-auto mt-8">
    <AccordionItem title="Acquisition History">
      <ul>
          {items.map((item, index: number) => (
            <li key={index} className={`mb-2 ${index < items.length - 1 ? 'border-b border-gray-200 py-2' : ''}`}>
              <div className='flex justify-between'>
                  <div className='my-auto'>
                    <b className="bg-grey">Acquired By: </b>
                      {item.id}
                  </div>
                  <ModalWrapper btnText="View more">
                    <AcquiredDetails acquiredDetails={item} />
                  </ModalWrapper>
              </div>
            </li>
          ))}
        </ul>
    </AccordionItem>
  </div>
);
};
export const AcquisitionListAccordion = ({
  items,
}) => {
if(items.length === 0) return null;
return (
  <div className="max-w-lg mx-auto mt-8">
    <AccordionItem title="Our Acquisitions">
      <ul>
          {items.map((item, index: number) => (
            <li key={index} className={`mb-2 ${index < items.length - 1 ? 'border-b border-gray-200 py-2' : ''}`}>
              <div className='flex justify-between'>
                  <div className='my-auto'>
                    <b className="bg-grey">Acquisition: </b>
                      {item.id}
                  </div>
                  <ModalWrapper btnText="View more">
                      <AcquisitionDetails key={item.id} acquisition={item} />
                  </ModalWrapper>
              </div>
            </li>
          ))}
        </ul>
    </AccordionItem>
  </div>
);
};
const CompanyDetails = ({
    id,
    name,
    overview,
    state_code,
    country_code,
    homepage_url,
    city,
    relatedIpos,
    acquiredList,
    acquisitionsList,
}: {
    id: string;
    name: string;
    overview: string;
    state_code: string;
    country_code: string;
    homepage_url: string;
    city: string;
    relatedIpos: any[];
    acquiredList: any[],
    acquisitionsList: any[],
}) => {
    return (
      <div className="flex flex-wrap h-auto w-full">
        <div className="w-full p-4">
          <div className="rounded overflow-hidden shadow-lg bg-transparent border border-gray-300">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{name}</div>
              <div className="flex items-center mb-4">
                <div className="mr-2 font-semibold">Company Id:</div>
                <div>{id}</div>
              </div>
              <p className="text-gray-700 text-base">
                {overview}
              </p>
            </div>
  
            <div className="px-6 py-2">
              {city && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{city}</span>}
              {state_code && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{state_code}</span>}
              {country_code && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{country_code}</span>}
              {homepage_url && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{homepage_url}</span>}
            </div>

            <IposListAccordion items={relatedIpos} />
            <AcquiredListAccordion items={acquiredList} />
            <AcquisitionListAccordion items={acquisitionsList} />
          </div>
        </div>
      </div>
    );
};

export default CompanyDetails;