const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Project must have a name!']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;