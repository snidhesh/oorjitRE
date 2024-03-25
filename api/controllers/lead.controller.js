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

  
export const getLead = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const leads = await Lead.find({ userRef: userId });

    if (leads.length > 0) { // 
      res.json(leads);
    } else {
      res.status(404).json({ message: 'No leads found for this user' });
    } 
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};
