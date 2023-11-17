import { Document, Schema, model, models } from 'mongoose';

interface IpoDoc extends Document {
    id: number;
    ipo_id: number;
    object_id: string;
    valuation_amount: number;
    valuation_currency_code: string;
    raised_amount: number;
    raised_currency_code: string;
    public_at: string;
    stock_symbol: string;
    source_url: string;
    source_description: string;
}

export const ipoSchema = new Schema<IpoDoc>({
    id: { type: Number },
    ipo_id: { type: Number },
    object_id: { type: String },
    valuation_amount: { type: Number },
    valuation_currency_code: { type: String },
    raised_amount: { type: Number },
    raised_currency_code: { type: String },
    public_at: { type: String },
    stock_symbol: { type: String },
    source_url: { type: String },
    source_description: { type: String },
});

const IposModel = models.Ipo || model<IpoDoc>('Ipo', ipoSchema, 'ipos');

export default IposModel;
