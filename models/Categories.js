import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const Categorie = mongoose.model('Categories', categoriesSchema);
export default Categorie;