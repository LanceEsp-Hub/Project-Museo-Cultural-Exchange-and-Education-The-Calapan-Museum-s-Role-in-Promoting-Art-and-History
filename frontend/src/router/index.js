// import { createRouter, createWebHistory } from 'vue-router';
// // import Home from '../views/Home.vue';
// import Register from '../views/Register.vue';
// import Login from '../views/Login.vue';  // Make sure you import the Login component
// import Homepage from '../views/Homepage.vue';
// import Landingpage from '../views/Landingpage.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Landingpage,
//   },
//   {
//     path: '/register',
//     name: 'register',
//     component: Register,
//   },
//   {
//     path: '/login',  // Define the login route
//     name: 'login',
//     component: Login,  // Ensure you have a Login.vue component
//   },
//   {
//     path: '/homepage',
//     name: 'homepage',
//     component: Homepage,
//     beforeEnter: (to, from, next) => {
//       const token = localStorage.getItem('auth_token');
//       if (!token) {
//         next('/login'); // Redirect to login if no token found
//       } else {
//         next();
//       }
//     },
//   },

// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Homepage from '../views/Homepage.vue';
import Landingpage from '../views/Landingpage.vue';
import AdminDashboard from '../views/Admin_dashboard.vue';  // Import Admin Dashboard
import UserProfile from '../views/UserProfile.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landingpage,
  },
  {
    path: '/Profile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: Homepage,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('auth_token');
      const userRole = localStorage.getItem('user_role');  // Retrieve the user role

      if (!token) {
        next('/login');  // Redirect to login if no token found
      } else if (userRole !== 'user') {
        next('/');  // Redirect to home if role is not 'user'
      } else {
        next();
      }
    },
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('auth_token');
      const userRole = localStorage.getItem('user_role');  // Retrieve the user role

      if (!token) {
        next('/login');  // Redirect to login if no token found
      } else if (userRole !== 'admin') {
        next('/');  // Redirect to home if role is not 'admin'
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
