import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    address: {
      type: String,
      required: true, 
    },  
    isPending: {
        type: Boolean,
      },
  },

  { timestamps: true }
);


const user = mongoose.model("user", userSchema, );

export default user;
