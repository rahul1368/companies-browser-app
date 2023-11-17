import mongoose, { Document, Schema, model, models } from 'mongoose';

interface ObjectDoc extends Document {
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

const objectSchema = new Schema<ObjectDoc>({
    id: { type: String },
    entity_type: { type: String },
    entity_id: { type: Number },
    name: { type: String },
    homepage_url: { type: String },
    overview: { type: String },
    country_code: { type: String },
    state_code: { type: String },
    city: { type: String },
});
const ObjectModel = models.Object || model<ObjectDoc>('Object', objectSchema, 'objects');

export default ObjectModel;
