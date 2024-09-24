const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true,unique:true},
    parentCategory:{type:String},
    IsFeatured:{type:Boolean,required:true},
    ImageUrl:{type:String},
    Description:{type:String}
},{timestamps:true});

mongoose.models={}
export default mongoose.model("Category",CategorySchema);