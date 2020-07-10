const Post = require('./Post');
const pic = require('./pic');
const User = require('./User');

User.hasMany(pic, {
   foreignKey: 'user_id'
});

pic.belongsTo(User, {
   foreignKey: 'user_id'
});

pic.hasMany(Post, {
   foreignKey: 'pic_id'
});

Post.belongsTo(pic, {
    foreignKey: 'pic_id',
    onDelete: 'CASCADE'
 });

module.exports = {
   User,
   Post,
   pic
};