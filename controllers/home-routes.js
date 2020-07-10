const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, pic } = require('../models');
const withAuth = require('../utils/auth')

//init render if not logged in
router.get('/', (req, res) => {
   if (req.session.loggedIn) { //add session id?
     const id = req.session.user_id
     res.redirect(`/pics/${id}`);
     return;
   }
 
   res.render('login');
});

//when logged in single pics artists
router.get('/posts/:id',withAuth, (req, res) => {
   console.log(req.session);
    Post.findAll({
       where: {
          pic_id: req.params.id
       },
      attributes: [
         'id',
         'post_url',
         'title',
         'notes',
         'pic_id',
         'created_at',
      ],
      include: [
         {
            model: pic,
            attributes: ['id', 'user_id', 'title', 'created_at'],
            include: {
               model: User,
               attributes: ['username']
            }
         },
     /*    {
            model: User,
            attributes: ['username']
         } */
      ]
   })
      .then(dbPostData => {
         // pass a single post object into the homepage template
         console.log(dbPostData[0]);
         const posts = dbPostData.map(post => post.get({ plain: true }));
         res.render('pic', { 
            posts,
            loggedIn: req.session.loggedIn
         });
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});


//when loged in all users pics
router.get('/pics/:id',withAuth, (req, res) => {
   console.log(req.session)
   pic.findAll({
     where: {
       user_id: req.params.id
     },
     attributes: [
       'id',
        'title',
        'user_id',
       'created_at',
      
     ],
     include: [
       {
         model: User,
         attributes: ['id','username'],
         },
        { model: Post,
         attributes: ['id']

       },
      
     ]
   })
     .then(dbpicData => {
        console.log(dbpicData)
       
     
 
       // serialize the data
       const pics = dbpicData.map(pic => pic.get({ plain: true }));
 
       // pass data to template
       res.render('homepage', { 
          pics, 
         loggedIn: req.session.loggedIn
         });
     })
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
});

module.exports = router;