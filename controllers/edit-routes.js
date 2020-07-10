const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, pic } = require('../models');
const withAuth = require('../utils/auth');

router.get('/pic/:id',withAuth, (req,res) => {
   pic.findOne({
       where: {
       id: req.params.id
   },
   attributes: [
       'id',
       'title',
       'created_at',  
      
   ],
   // include: [
   //     {
   //         model: Post,
   //         attributes: ['id'],
           
           
   //     },
   //     {
   //         model: User,
   //         attributes: ['username']
   //     }
   // ]
   }) 
   .then(dbpicData => {
      console.log(dbpicData)
       const pic = dbpicData.get({ plain: true });
      
       res.render('edit-pic', {
        pic,
        loggedIn: true
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

router.get('/posts/:id/:subId',withAuth, (req,res) => {
   Post.findOne({
       where: {
       id: req.params.id,
       pic_id: req.params.subId
   },
   attributes: [
       'id',
       'title',
       'post_url',
       'notes',
       'pic_id',
       'created_at'
      
   ],
   include: [
       {
           model: pic,
           attributes: ['id','title'],
           
           
      },
   //     {
   //         model: User,
   //         attributes: ['username']
   //     }
   ]
   }) 
   .then(dbartistData => {
      console.log(dbartistData)
       const post = dbartistData.get({ plain: true });
      
       res.render('edit-artist', {
        post,
        loggedIn: true
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

module.exports = router;