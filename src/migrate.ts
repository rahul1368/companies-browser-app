const mongoose = require('mongoose');

const MONGODB_URI = ''; // `mongodb+srv://user:password@cluster-name.mongodb.net/database-name`
// Define the schema for the 'objects' collection
const objectSchema = new mongoose.Schema({
  id: String,
  entity_type: String,
  entity_id: String,
  name: String,
  homepage_url: String,
  overview: String,
  country_code: String,
  state_code: String,
  city: String,
});

// Define the schema for the 'ipos' collection
const ipoSchema = new mongoose.Schema({
  id: String,
  ipo_id: String,
  object_id: String,
  valuation_amount: Number,
  valuation_currency_code: String,
  raised_amount: Number,
  raised_currency_code: String,
  public_at: Date,
  stock_symbol: String,
  source_url: String,
  source_description: String,
});

// Define the schema for the 'acquisitions' collection
const acquisitionSchema = new mongoose.Schema({
  id: String,
  acquisition_id: String,
  acquiring_object_id: String,
  acquired_object_id: String,
  price_amount: Number,
  price_currency_code: String,
  acquired_at: Date,
  source_url: String,
  source_description: String,
});

// Define the schema for the 'finalcompanydatas' collection
const finalCompanyDataSchema = new mongoose.Schema({
  // Fields from the 'objects' collection
  id: String,
  entity_type: String,
  entity_id: String,
  name: String,
  homepage_url: String,
  overview: String,
  country_code: String,
  state_code: String,
  city: String,

  // Additional fields
  relatedIpos: [ipoSchema], // List of ipos objects
  acquiredByList: [acquisitionSchema], // List of acquisitions where acquired_object_id matches id
  acquisitionsList: [acquisitionSchema], // List of acquisitions where acquiring_object_id matches id
});

// Connect to the MongoDB database
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Define models based on the schemas
    const ObjectModel = mongoose.model('Object', objectSchema);
    const FinalCompanyDataModel = mongoose.model('FinalCompanyData', finalCompanyDataSchema);

    // Drop existing 'finalcompanydatas' collection if it exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some((collection) => collection.name === 'finalcompanydatas');
    if (collectionExists) {
      await mongoose.connection.collection('finalcompanydatas').drop();
    }

    // Create the 'finalcompanydatas' collection
    await mongoose.connection.createCollection('finalcompanydatas');

    const pipeline = [
        {
          $lookup: {
            from: 'ipos',
            localField: 'id',
            foreignField: 'object_id',
            as: 'relatedIpos',
          },
        },
        {
          $lookup: {
            from: 'acquisitions',
            let: { objectId: '$id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ['$acquiring_object_id', '$$objectId'] },
                      { $eq: ['$acquired_object_id', '$$objectId'] },
                    ],
                  },
                },
              },
            ],
            as: 'relatedAcquisitions',
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            entity_type: 1,
            entity_id: 1,
            name: 1,
            homepage_url: 1,
            overview: 1,
            country_code: 1,
            state_code: 1,
            city: 1,
            relatedIpos: 1,
            acquiredByList: {
              $filter: {
                input: '$relatedAcquisitions',
                as: 'acquisition',
                cond: {
                  $eq: ['$$acquisition.acquired_object_id', '$id'],
                },
              },
            },
            acquisitionsList: {
              $filter: {
                input: '$relatedAcquisitions',
                as: 'acquisition',
                cond: {
                  $eq: ['$$acquisition.acquiring_object_id', '$id'],
                },
              },
            },
          },
        },
      ];

    // Run aggregation on 'objects' collection (replace with your actual aggregation pipeline)
    const result = await ObjectModel.aggregate(pipeline).exec();

    // Insert data into the 'finalcompanydatas' collection
    await FinalCompanyDataModel.insertMany(result);

    console.log('Migration completed successfully.');
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error))
  .finally(() => mongoose.connection.close());