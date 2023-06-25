import mongoose from 'mongoose';
import { City } from '../../types/OfferType.js';

export interface CityDocument extends City, mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
}

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  latitude: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  longitude: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {
  timestamps: true,
});

export const CityModel = mongoose.model<CityDocument>('City', citySchema);
