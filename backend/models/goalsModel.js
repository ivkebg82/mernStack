const mongoose = require('mongoose')

const goalsSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: [true, 'Please add the text value']
        },
    }, {
        timestamps: true
    }

)

const goalsModel = mongoose.model('Goal', goalsSchema)


module.exports = goalsModel