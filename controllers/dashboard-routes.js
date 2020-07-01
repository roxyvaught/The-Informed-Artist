const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
   Post.findAll({
      where: {
         // use the ID from the session
         user_id: req.session.user_id
      },
      attributes: [
         'id',
         'post_url',
         'title',
         'created_at',
         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
         {
            model: Comment,
            attributes: [
               'id',
               'comment_text',
               'post_id',
               'user_id',
               'created_at'
            ],
            include: {
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   }).then(dbPostData => {
         // serialize data before passing to template
         const posts = dbPostData.map(post => post.get({ plain: true }));
         res.render('dashboard', { posts, loggedIn: true });
      }).catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.get('/edit/:id', withAuth, (req, res) => {
   Post.findOne({
      where: {
         user_id: req.session.user_id
      },
      attributes: [
         'id',
         'post_url',
         'title',
         'created_at',
         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
         {
            model: Comment,
            attributes: [
               'id',
               'comment_text',
               'post_id',
               'user_id',
               'created_at'
            ],
            include: {
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   }).then(dbPostData => {
         const post = dbPostData.get({ plain: true });
         res.render('edit-post', { post, loggedIn: true });
      }).catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

router.put("/bio/:id", function (req, res) {

   db.User.update({
     short_bio: req.body.short_bio
   }, {
     where: {
       id: req.params.id
     }
   }).then(function () {
     console.log("success");
     req.session.passport.user.short_bio = req.body.short_bio;
     req.session.save(function (err) {
       console.log(err);
     });
     res.sendStatus(200);
   }).catch(function (err) {
     console.log(err);
     // res.redirect("/members");
   });
 });

 router.put("/api/profilePic/:id", function (req, res) {

   db.User.update({
     profilePicture: req.body.profilePicture,
   }, {
     where: {
       id: req.params.id
     }
   }).then(function () {
     console.log("profile picture saved successfully");

     // location.replace(data);
     req.session.passport.user.profilePicture = req.body.profilePicture;
     req.session.save(function (err) {
       console.log(err);
     });
     res.sendStatus(200);
   }).catch(function (err) {

     console.log(err);
   });
 });
module.exports = router;