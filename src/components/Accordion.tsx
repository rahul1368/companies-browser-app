import React, { useState } from 'react';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between p-4 bg-gray-200 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="ml-2">{isOpen ? '▼' : '►'}</span>
      </div>
      {isOpen && (
        <div className="p-4 bg-white border">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;

