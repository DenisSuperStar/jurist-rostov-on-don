const Ad = require('../models/ad.js');
const Activity = require('../models/activity.js');
const Order = require('../models/order.js');

module.exports.uploadData = (req, res) => {
    const {body} = req;

    const adName = body.adName;
    const descName = body.descName;

    if (adName && descName) {
        const ad = new Ad({
            adName: adName,
            descName: descName
        });

        ad.save(err => {
            if (err) process.exit(-1);

            res.redirect('/');
        });
    } else {}

    const id = body.number;
    const title = body.section;
    const name = body.name;
    const text = body.text;
    
    if (id && title && name && text) {
        const direction = new Activity({
            ordinal: id,
            title: title,
            theme: name,
            detail: text
        });

        direction.save(err => {
            if (err) process.exit(-1);

            res.redirect('/');
        });
    } else {}

    const productName = body.serviceName;
    const productDesc = body.serviceDesc;
    const productPrice = body.servicePrice;

    if (productName && productDesc && productPrice) {
        const order = new Order({
            serviceName: productName,
            serviceDesc: productDesc,
            servicePrice: productPrice
        });

        order.save(err => {
            if (err) process.exit(-1);

            res.redirect('/');
        });
    } else {}
}