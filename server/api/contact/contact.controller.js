var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_FROM_PASS
  }
});

exports.send = function(req,res){
  var htmlContent = '<p>A new message was posted on ArimorC contact form.</p>' +
                    '<p><b>Name: </b>' + req.body.name + 
                    '<br><b>Company: </b>' + req.body.company + 
                    '<br><b>Email: </b>' + req.body.email + 
                    '<br><b>Message: </b>' + req.body.message + '</p>' +
                    '<p>NB: do not reply to this email directly</p>';
  var mailOptions = {
    to: process.env.EMAIL_TO,
    subject: 'ArimorC contact form - new message',
    from: req.body.name + ' <' + req.body.email + '>',
    sender: req.body.email,
    replyTo: req.body.name,
    html: htmlContent
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
      return res.json(201, info);
    }
  });
}


// 'use strict';

// var _ = require('lodash');
// var Contact = require('./contact.model');

// Get list of contacts
// exports.index = function(req, res) {
//   Contact.find(function (err, contacts) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, contacts);
//   });
// };

// // Get a single contact
// exports.show = function(req, res) {
//   Contact.findById(req.params.id, function (err, contact) {
//     if(err) { return handleError(res, err); }
//     if(!contact) { return res.send(404); }
//     return res.json(contact);
//   });
// };

// // Creates a new contact in the DB.
// exports.create = function(req, res) {
//   Contact.create(req.body, function(err, contact) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, contact);
//   });
// };

// // Updates an existing contact in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Contact.findById(req.params.id, function (err, contact) {
//     if (err) { return handleError(res, err); }
//     if(!contact) { return res.send(404); }
//     var updated = _.merge(contact, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, contact);
//     });
//   });
// };

// // Deletes a contact from the DB.
// exports.destroy = function(req, res) {
//   Contact.findById(req.params.id, function (err, contact) {
//     if(err) { return handleError(res, err); }
//     if(!contact) { return res.send(404); }
//     contact.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

// function handleError(res, err) {
//   return res.send(500, err);
// }