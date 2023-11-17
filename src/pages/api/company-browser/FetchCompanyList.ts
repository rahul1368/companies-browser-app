// This file is not being used now
import { NextApiRequest, NextApiResponse } from "next";
import CSVUtil from "./CSVUtil";

interface IIposDtaItem{
    id: string;
    ipo_id: string;
    object_id: string;
    valuation_amount: string;
    valuation_currency_code: string;
    raised_amount: string;
    raised_currency_code: string;
    public_at: string;
    stock_symbol: string;
    source_url: string;
    source_description: string;
}

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         // Read the CSV file
//         const objectsList = await CSVUtil.readCSV(`${process.cwd()}/src/data/objects.csv`);
//         const iposList = await CSVUtil.readCSV(`${process.cwd()}/src/data/ipos.csv`);
//         const acquisitionsList = await CSVUtil.readCSV(`${process.cwd()}/src/data/acquisitions.csv`);
        
//         const totalItems = objectsList.length;
//         const pageSize = +(req.query.pageSize) || 10;
//         const pageNo =  (+req.query.pageNo) || 1;
//         const totalPages = Math.ceil((totalItems / pageSize));
//         const startIndex = ((pageNo - 1) * pageSize), endIndex = pageNo * pageSize;
//         res.status(200).json({
//             acquisitionsList,
//             companiesList: objectsList.slice(startIndex, endIndex),
//             iposList,
//             totalPages,
//             pageSize,
//         });
//     }catch (error) {
//         console.error(error);
//         res.status(500).end('Internal Server Error');
//     }
// }

function processList(companiesList, iposList, acquisitionsList){
  let finalCompaniesList = [];
  for(let company of companiesList){
    let companyObj = {...company};
    companyObj.iposList = iposList.filter((ipo) => (
      ipo.object_id === companyObj.id)
    );
    companyObj.acquiredList = acquisitionsList.filter(
      (acquisition) => (acquisition.acquiring_object_id === companyObj.id) 
    );
    companyObj.acquiredByList = acquisitionsList.filter(
      (acquisition) => (acquisition.acquired_object_id === companyObj.id) 
    );
    finalCompaniesList.push(companyObj);
  }
  return finalCompaniesList;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const objectsList = await CSVUtil.readCSV(`${process.cwd()}/src/data/objects.csv`);
      const iposList = await CSVUtil.readCSV(`${process.cwd()}/src/data/ipos.csv`);
      const acquisitionsList = await CSVUtil.readCSV(`${process.cwd()}/src/data/acquisitions.csv`);
      
      const objectsFilePath = `${process.cwd()}/src/data/objects.csv`; // Replace with your actual file path
      const pageSize = parseInt(req.query.pageSize as string, 10) || 10; // Default page size

      let currentPage = parseInt(req.query.pageNo as string, 10) || 1; // Default to page 1

      let rowsProcessed = 0, totalRows = 0;
      let rowsToSend: any[] = [];

      await CSVUtil.readLargeCSV(objectsFilePath, (data) => {
        rowsProcessed++;

        if (rowsProcessed <= currentPage * pageSize && rowsProcessed > (currentPage - 1) * pageSize) {
          // Send only the rows relevant to the current page
          rowsToSend.push(data);
        }

      }).then((count) => {
        totalRows = count;
        let finalList = processList(rowsToSend, iposList, acquisitionsList);
        res.json({
          companiesList: rowsToSend,
          totalPages: Math.ceil(totalRows/pageSize),
          objectsList: objectsList.slice(0, 10),
          iposList: iposList.slice(0, 10),
          acquisitionsList: acquisitionsList.slice(0, 10),
          finalList,
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed', message: 'Use GET method' });
  }
}
