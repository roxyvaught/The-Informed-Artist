const router = require('express').Router();
const { pic, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/:id', (req, res) => {
   pic.findAll({
      where: {
         user_id: req.params.id
      }
   })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
});



router.post('/', withAuth, (req, res) => {
   // check the session
   if (req.session) {
     pic.create({
       title: req.body.title,
       
       // use the id from the session
       user_id: req.session.user_id
     })
       .then(dbCommentData => res.json(dbCommentData))
       .catch(err => {
         console.log(err);
         res.status(400).json(err);
       });
   }
 });

 router.put('/:id', (req,res)=> {
    pic.update(
       {title:req.body.title
      },
      {where: {
         id:req.params.id
      }
     }
    ).then(dbpicData => {
       res.json(dbpicData)
       
    })
 })


router.delete('/:id', (req, res) => {
   pic.destroy(
      {
         where: {
            id: req.params.id
         }
   })
      .then(dbCommentData => {
         if(!dbCommentData) {
            res.status(404).json({ message: 'No comment data found with this id' });
            return;
         }
         res.json(dbCommentData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;