const {Router} = require('express');
const Contact = require('../model/contactModel');

// Search by specific collection
const getDocumentsCollection = async(req, res = response) => {

  const table = req.params.table;
  const search = req.params.search;
  // Regular expression to make search more sensitive.
  const regex = new RegExp(search, 'i');

  let data = [];

  switch (table) {
    case 'contacts':
        data = await Contact.find({name: regex})
                              .populate('user','name')
        break;

    default:
      return res.status(400).json({
        ok:false,
        msg: 'The table has to be of contacts'
      });
  }

  res.json({
    ok:true,
    results: data
  })
}

module.exports = {
  getDocumentsCollection
}
