import mongoose, { Document ,Model,Schema} from "mongoose";

export interface IProduct extends Document{
    name:string;
    slug:string;
    Description?:string;
    IsFeatured:boolean;
    CategoryID:mongoose.Schema.Types.ObjectId;
    Discount?:number;
    Price:number;
    Quantity:number;
    Summary?:string;
    CoverImageUrl?:string;
    size:string;
    color:string;
}

const ProductSchema: Schema = new Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true,unique:true},
    Description:{type:String},
    IsFeatured:{type:Boolean,required:true},
    CategoryID:{type:mongoose.Schema.Types.ObjectId, required:true},
    Discount:{type:Number},
    Price:{type:Number, required:true},
    Quantity:{type:Number, required:true},
    Summary:{type:String},
    CoverImageUrl:{type:String},
    size:{type:String},
    color:{type:String}
},{timestamps:true});

// mongoose.models={}
const Product: Model<IProduct> = mongoose.models.Products || mongoose.model<IProduct>('Products', ProductSchema);
export default Product;