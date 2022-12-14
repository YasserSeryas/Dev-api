import mongoose from "mongoose";

const { Schema } = mongoose;

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
});

listSchema.static({
    findByUserId(userId) {
        return this.find({ user: userId });
    },
    verifyUserId(userId, listId) {
        return this.findOne({ user: userId, _id: listId });
    },
});

const List = mongoose.model("List", listSchema);

export default List;