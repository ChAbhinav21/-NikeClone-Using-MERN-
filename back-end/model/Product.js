const mongoose = require('mongoose')
const {Schema} = mongoose;
const ProductSchema = new Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0, min: 0, max: 90 },
    size: { type: [String], required: true },
    colors: { type: [Schema.Types.Mixed], required: true },
    category: { type: String, required: true },
    gender: {type:String},
    kids: {type: String},
    stock: { type: Number, min: 0, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
    origin: { type: String, required: true },
    description: { type: String  },
    marketedBy: { type: String, required: true },
    images: { type: [String], required: true },
    highlights: { type: [String], required: true },
    discountPrice: Number
}, { timestamps: true });

ProductSchema.pre('save',function(next){
       this.discountPrice = this.discount
        ? Math.round(this.price * (1 - this.discount / 100))
        : this.price; 
})
ProductSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.price || update.discount) {
    const price = update.price ?? update.$set?.price;
    const discount = update.discount ?? update.$set?.discount ?? 0;

    const discountPrice = discount
      ? Math.round(price * (1 - discount / 100))
      : price;

    if (update.$set) {
      update.$set.discountPrice = discountPrice;
    } else {
      update.discountPrice = discountPrice;
    }
  } 
});

exports.Product = mongoose.model("Product",ProductSchema);

