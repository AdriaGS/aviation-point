import mongoose, { Schema, Document } from 'mongoose';

export interface FlightHistoryData extends Document {
  flightCode: string;
  date: string;
  delay: number;
  status: 'Delayed' | 'On Time';
}

const FlightHistorySchema: Schema = new Schema({
  flightCode: { type: String, required: true },
  date: { type: String, required: true },
  delay: { type: Number, required: true },
  status: { type: String, required: true },
});

// Create a model using the schema
export const FlightHistory =
  mongoose.models.FlightHistory ||
  mongoose.model<FlightHistoryData>('FlightHistory', FlightHistorySchema);
