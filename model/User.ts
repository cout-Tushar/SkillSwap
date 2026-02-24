import mongoose, {Schema,models} from 'mongoose';

const UserSchema=new Schema({
    name:{
        type:String,
        Required:true,   
    },
    email:{
        type:String,
        Required:true,
        unique:true,
    },
    password:{
        type:String,
        Required:true, },
    skilsOffered:{
        type:[String],
        Required:true, },
    skilsNeeded:{
        type:[String],
    },
    rating:{

        type:Number,
        default:0,
    },
    bio:{
        type:String,
        Required:true,
    }
    
});

export default models.User || mongoose.model('User', UserSchema);