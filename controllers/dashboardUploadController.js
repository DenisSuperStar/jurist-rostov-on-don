module.exports.uploadAd = (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const adName = body.adName;
    const descName = body.descName;

    if (!adName || !descName) return res.sendStatus(404);

    const ad = new Ad({
        adName: adName,
        descName: descName
    });

    ad.save(err => {
        if (err) res.sendStatus(500);
        res.redirect('/');
    });
}

module.exports.uploadActivity = (req, res) => {

}

module.exports.uploadOrder = (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const serviceName = body.serviceName;
    const serviceDesc = body.serviceDesc;
    const servicePrice = body.servicePrice;

    if (!serviceName || !serviceDesc || !servicePrice) return res.sendStatus(404);

    const order = new Order({
        serviceName: serviceName,
        serviceDesc: serviceDesc,
        servicePrice: servicePrice
    });

    order.save(err => {
        if (err) re.sendStatus(500);
        
        res.redirect('/');
    });
}

module.exports.uploadService = (req, res) => {
    
}