import Lead from '../models/lead.model.js';
import { errorHandler } from '../utils/error.js';

export const insertLead = async (req, res, next) => {
    try {
      const lead = await Lead.create(req.body);
      return res.status(201).json(lead);
    } catch (error) {
      next(error);
    }
  };