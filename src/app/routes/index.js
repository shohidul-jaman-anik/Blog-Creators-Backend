const express = require('express');
const router = express.Router();



const authRoute = require('../../app/modules/auth/auth.route');
const adminRoute = require('../../app/modules/admin/admin.route');
const forumRoute = require('../../app/modules/forum/forum.route');
const paymentRoute = require('../../app/modules/payment/payment.route');
const chatRoute = require('../../app/modules/chat/chat.route');
const messageRoute = require('../../app/modules/message/message.route');
const wishlistRoute = require('../../app/modules/addToWishlist/addToWishlist.route');


const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin/activity',
    route: adminRoute,
  },
  {
    path: '/wishlist',
    route: wishlistRoute,
  },
  {
    path: '/forum',
    route: forumRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/message',
    route: messageRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

module.exports = router;
