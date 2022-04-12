const Cigar = require('../models/cigar.model');
const User = require('../models/user.model')
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken')

module.exports = {
  findAllCigars: (req, res) => {
    Cigar.find()
      .sort({ createdAt: -1 })
      .populate("messages", "content likes _id")
      .populate("createdBy", "username email")
      .then((allCigars) => {
        res.json(allCigars);
      })
      .catch((err) => {
        console.log('Find all Cigars failed');
        res.json({ message: 'Something went wrong in findAll', error: err });
      });
  },

  createNewCigar: (req, res) => {

    const newCigarObject = new Cigar(req.body);
    const decodedJWT = jwt.decode(req.cookies. usertoken,{
      complete: true
    })
    newCigarObject.createdBy = decodedJWT.payload.id
    newCigarObject
      .save()
      .then((newCigar) => {
        res.json(newCigar);
      })
      .catch((err) => {
        console.log('Something went wrong in createNewCigar');
        res.status(400).json(err);
      });
  },

  findOneCigar: (req, res) => {
    Cigar.findOne({ _id: req.params.id })
      .populate("messages", "content likes")
      .then((oneCigar) => {
        res.json(oneCigar);
      })
      .catch((err) => {
        console.log('Find One Cigar failed');
        res.json({ message: 'Something went wrong in findOneCigar', error: err });
      });
  },

  deleteCigar: (req, res) => {
    Cigar.deleteOne({ _id: req.params.id })
      .then((deletedCigar) => {
        console.log(deletedCigar);
        res.json(deletedCigar);
      })
      .catch((err) => {
        console.log('Delete One Cigar failed');
        res.json({ message: 'Something went wrong in deleteCigar', error: err });
      });
  },

  updateCigar: (req, res) => {
    Cigar.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((updatedCigar) => {
        res.json(updatedCigar);
      })
      .catch((err) => {
        console.log('Something went wrong in updateCigar');
        res.status(400).json(err);
      });
  },


  findAllCigarsByUser: (req, res)=>{
    if(req.jwtpayload.username !== req.params.username){
      console.log("Not the user")

      User.findOne({username: req.params.username})
        .then((userNotLoggedIn)=>{
            Cigar.find({createdBy: userNotLoggedIn._id})
              .populate("createdBy", "username")
              .then((allCigarsFromUser)=>{
                console.log(allCigarsFromUser)
                res.json(allCigarsFromUser)
              })
        })
        .catch((err)=>{
          console.log(err)
          res.status(400).json(err)
        })
    } else {
      console.log("current user")
      console.log("req.jwtpayload.id:", req.jwtpayload.id)
      Cigar.find({createdBy: req.jwtpayload.id})
        .populate("createdBy", " username")
        .then((allCigarsFromLoggedInUser)=>{
          console.log(allCigarsFromLoggedInUser)
          res.json(allCigarsFromLoggedInUser)
        })
        .catch((err)=>{
          console.log(err)
          res.status(400).json(err)
        })
    }
  }
};
