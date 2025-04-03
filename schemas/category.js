let mongoose = require('mongoose');
let slugify = require('slugify');

let categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    },
    slug: {
        type: String,
        unique: true 
    },description:{
        type:String,
        default:""
    }
},{
    timestamps:true
});
categorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});
module.exports = mongoose.model('category',categorySchema);