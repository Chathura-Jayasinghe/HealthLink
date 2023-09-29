const axios = require('axios');
function cass(req, res, next){
    const data = {
        applicationId: process.env.APP_ID,
        password: process.env.PASSWORD,
        externalTrxId: "1234567890123456789012345678901223",
        subscriberId: "tel:"+req.body.phone,
        paymentInstrumentName: "Mobile Account",
        accountId: process.env.ACCOUNTID,
        amount: "5",
        currency: "LKR"
      };
      
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };


    axios.post('https://api.mspace.lk/caas/direct/debit', data, axiosConfig)
    .then((response) => {
      if(response.status===200){
        return res.status(250).json({
            results: response.data,
        });
        
        // next()
      }else{
        return res.status(250).json({
            'message': "Something went wrong",
        });
      }
    })
    .catch((error) => {
        return res.status(250).json({
            'message': "Error!!",
        });
    });
}




module.exports = {
    cass: cass
}