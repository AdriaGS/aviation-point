import mongoose, { Schema, Document } from 'mongoose';

export interface AirportDocument extends Document {
  airportName: string;
  iataCode: string;
  icaoCode: string;
  latitude: number;
  longitude: number;
  geonameId: string;
  timezone: string;
  countryName: string;
  cityIataCode: string;
}

const AirportSchema: Schema = new Schema({
  iataCode: { type: String, unique: true, required: true },
  airportName: String,
  icaoCode: String,
  latitude: Number,
  longitude: Number,
  geonameId: String,
  timezone: String,
  countryName: String,
  cityIataCode: String,
  lastUpdated: { type: Date, default: Date.now },
});

export const AirportData =
  mongoose.models.AirportData ||
  mongoose.model<AirportDocument>('AirportData', AirportSchema);
