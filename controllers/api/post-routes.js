const router = require('express').Router();
const sequelize = require('../../config/connection');
const { pic, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { post } = require('../home-routes');

// get all users
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id', 
      'post_url', 
      'title', 
      'created_at',
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: pic,
        attributes: [
          'id',
          'comment_text',
          'user_id',
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
   /*   {
        model: User,
        attributes: ['username']
      } */
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
 });

// get one record
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'post_url', 
      'title', 
      'notes',
      'created_at',
    ],
    include: [
      {
        model: pic,
        attributes: [
          'id',
          'comment_text',
          'user_id',
          'created_at'
          ],
          include: {
            model: User,
            attributes: ['username']
          }
      },
    /*  {
        model: User,
        attributes: ['username']
      } */
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

 // create a post
 router.post('/', withAuth, (req, res) => {
  
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    notes: req.body.notes,
    pic_id: req.body.pic_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_url: req.body.post_url,
      notes:req.body.notes
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a post
router.delete('/:id', (req, res) => {



  Post.destroy(
    {
      where: {
        id: req.params.id
      }
  })
    .then(dbPostData => {
      if(!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  
module.exports = router;