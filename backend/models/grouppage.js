const mongoose = require('mongoose');
const { Schema } = mongoose;


const grouppageSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    group_id: {
        type: String,
        // required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
});


const Grouppage = mongoose.model('Grouppage', grouppageSchema);

module.exports = Grouppage; 