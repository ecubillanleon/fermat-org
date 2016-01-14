var mongoose = require('mongoose');
/**
 * [appSchema description]
 *
 * @type {[type]}
 */
var appSchema = mongoose.Schema({
    _owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usr'
    },
    name: {
        type: String,
        trim: true,
        required: true
            //validate: /^[a-zA-Z][a-zA-Z0-9\._\-]{3,14}?[a-zA-Z0-9]{0,2}$/
    },
    desc: {
        type: String,
        trim: true,
        //validate: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
        'default': null
    },
    api_key: {
        type: mongoose.Schema.Types.ObjectId,
        'default': new mongoose.Types.ObjectId()
    },
    upd_at: {
        type: mongoose.Schema.Types.ObjectId,
        'default': new mongoose.Types.ObjectId()
    }
}, {
    collection: 'apps'
});
/**
 * [usrnm description]
 *
 * @type {[type]}
 */
appSchema.index({
    usrnm: 1
}, {
    unique: true
}, {
    name: "apps_usrnm_uq_indx"
});
/**
 * [_owner_id description]
 *
 * @type {number}
 */
appSchema.index({
    _owner_id: 1,
    name: 1,
    api_key: 1
}, {
    name: "apps_cp_indx"
});
module.exports = appSchema;