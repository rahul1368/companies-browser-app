import mongoose, { Document, Schema, model, models } from 'mongoose';
import { ipoSchema } from './ipos.model';
import { acquisitionSchema } from './acquisitions';

interface FinalCompaniesDataDoc extends Document {
    id: string;
    entity_type: string;
    entity_id: number;
    name: string;
    homepage_url: string;
    overview: string;
    country_code: string;
    state_code: string;
    city: string;
}

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

const FinalCompanyDataModel = models.FinalCompanyData || mongoose.model('FinalCompanyData', finalCompanyDataSchema);

export default FinalCompanyDataModel;
