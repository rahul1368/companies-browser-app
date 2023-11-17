import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectDB from './DBConnection';
import FinalCompanyDataModel from './models/finalcompaniesdata.model';


enum CompanyFilterTypes {
  ByCompanyName = 'byCompanyName',
  ByCountryCode = 'byCountryCode',
  HasAnIPO = 'byhasAnIpo',
  HasMadeAnAcquisiton = 'byHasMadeAnAcquisiton',
  HasBeenAcquired = 'byHasBeenAcquired',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10; // Default page size
    const pageNumber = parseInt(req.query.pageNo as string, 10) || 1; // Default to page 1
    const filters = JSON.parse(req.query.filters as string);
    const companyNamesFilter = filters[CompanyFilterTypes.ByCompanyName] || []; // Empty array initially
    const countryCodesFilter = filters[CompanyFilterTypes.ByCountryCode] || []; // Empty array initially
    const hasIPOFilter = filters[CompanyFilterTypes.HasAnIPO]; // Including only companies that have done at least one IPO
    const hasAcquiredFilter = filters[CompanyFilterTypes.HasBeenAcquired]; // Only including companies that have been acquired
    const hasMadeAcquisitionsFilter = filters[CompanyFilterTypes.HasMadeAnAcquisiton]; // Only including companies that have made acquisitions

    const aggregationPipeline = [
      {
        $match: {
          $and: [
            companyNamesFilter.length > 0 ? { 'name': { $in: companyNamesFilter } } : {},
            countryCodesFilter.length > 0 ? { 'country_code': { $in: countryCodesFilter } } : {},
            hasIPOFilter ? { 'relatedIpos.ipo_id': { $exists: true } } : {},
            hasAcquiredFilter ? { 'acquiredByList': { $exists: true, $ne: [] } } : {},
            hasMadeAcquisitionsFilter ? { 'acquisitionsList': { $exists: true, $ne: [] } } : {},
          ],
        },
      },
      {
        $facet: {
          // Stage 1: Total count
          totalCount: [
            {
              $count: 'value',
            },
          ],

          // Stage 2: Paginated data
          paginatedData: [
            {
              $skip: (pageNumber - 1) * pageSize,
            },
            {
              $limit: pageSize,
            },
          ],
        },
      },
      {
        $project: {
          totalPages: {
            $cond: {
              if: { $gt: [{ $arrayElemAt: ['$totalCount.value', 0] }, 0] },
              then: {
                $ceil: {
                  $divide: [{ $arrayElemAt: ['$totalCount.value', 0] }, pageSize],
                },
              },
              else: 0, // Setting to 0 if total count is 0
            },
          },
          paginatedData: '$paginatedData',
        },
      },
    ];
        
    const result = await FinalCompanyDataModel.aggregate(aggregationPipeline).exec();

    res.status(200).json({
      companiesList: result[0].paginatedData,
      totalPages: result[0].totalPages,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Disconnect from MongoDB when the API request is complete
    await mongoose.disconnect();
  }
};

export default connectDB(handler);
