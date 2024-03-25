import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    listingName: {
        type: String,
        required: true,
      },
      listingRef: {
        type: String,
        required: true,
      },
    userRef: {
      type: String,
      required: true,
    },
 
  },
  { timestamps: true }
);

const Lead = mongoose.model('Lead',leadSchema);

export default Lead;
