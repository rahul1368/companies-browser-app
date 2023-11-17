import { Document, Schema, model, models } from 'mongoose';
import ObjectModel from './object.model';

interface AcquisitionDoc extends Document {
    acquisition_id: string;
    acquiring_object_id: string;
    acquired_object_id: string;
    price_amount: number;
    price_currency_code: string;
    acquired_at: Date;
    source_url: string;
    source_description: string;
}

export const acquisitionSchema = new Schema<AcquisitionDoc>({
    acquisition_id: { type: String, required: true },
    acquiring_object_id: { type: String, required: true },
    acquired_object_id: { type: String, required: true },
    price_amount: { type: Number, required: true },
    price_currency_code: { type: String, required: true },
    acquired_at: { type: Date, required: true },
    source_url: { type: String, required: true },
    source_description: { type: String, required: true },
});

const AcquisitionModel = models.Acquisition || model<AcquisitionDoc>('Acquisition', acquisitionSchema);

export default AcquisitionModel;
