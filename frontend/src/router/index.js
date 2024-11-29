  import { createRouter, createWebHistory } from 'vue-router';
  import Register from '../views/Register.vue';
  import Login from '../views/Login.vue';
  import Homepage from '../views/Homepage.vue';
  import Landingpage from '../views/Landingpage.vue';
  import AdminDashboard from '../views/Admin_dashboard.vue';  // Import Admin Dashboard
  import UserProfile from '../views/UserProfile.vue'; 
  import GalleryManagement from '../views/GalleryManagement.vue';
  import AdminGalleryTable from '../views/adminGalleryTable.vue';  // Import Admin Gallery Table
  import Bookingpage from '../views/Bookingpage.vue'; 
  import ViewBooking from '../views/Viewbooking.vue'; 
  import Collection from '../views/Collection.vue'; 
  import BookingMangement from '../views/BookingManagement.vue';
  import CryptoJS from 'crypto-js'; // Import crypto-js
  import Favorites from "@/views/Favorites.vue";
  import CreateEvent from '../views/CreateEvent.vue'; // Path to the CreateEvent component
  import EventList from '../views/EventList.vue'; // Path to the EventList component
  import ViewReviews from '@/views/ViewReviews.vue';
  import PanoramaViewer from '@/views/PanoramaViewer.vue'; // Panorama Viewer


  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Landingpage,
    },
    {
      path: '/viewreview',
      name: 'ViewReviews',
      component: ViewReviews,
    },
    {
      path: '/bookrecord',
      name: 'ViewBooking',
      component: ViewBooking,
    },
    {
      path: '/Booking',
      name: 'Bookingpage',
      component: Bookingpage,
    },
    {
      path: '/admin-bookingmanagement',
      name: 'BookingMangement',
      component: BookingMangement,
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
      path: "/favorites",
      name: "Favorites",
      component: Favorites,
    },  
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/create-event', // Route to create a new event
      name: 'CreateEvent',
      component: CreateEvent,
    },
    {
      path: '/events', // Route to list all events
      name: 'EventList',
      component: EventList,
    },
    {
      path: '/panorama',
      name: 'PanoramaViewer',
      component: PanoramaViewer,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('auth_token');
        const encryptedRole = localStorage.getItem('user_role'); // Retrieve the encrypted role

        if (!token) {
          next('/login');  // Redirect to login if no token found
        } else if (encryptedRole) {
          // Decrypt the user role
          const bytes = CryptoJS.AES.decrypt(encryptedRole, 'asdasd');
          const decryptedRole = bytes.toString(CryptoJS.enc.Utf8); // Convert to string

          if (decryptedRole !== 'user') {
            next('/');  // Redirect to home if role is not 'user'
          } else {
            next();
          }
        } else {
          next('/login'); // If no role is found, redirect to login
        }
      },
    },
    {
      path: '/view-reviews',
      name: 'view-reviews',
      component: ViewReviews,  // Point to your ViewReviews component
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('auth_token');
        const encryptedRole = localStorage.getItem('user_role'); // Retrieve encrypted role

        if (!token) {
          next('/login'); // Redirect to login if no token found
        } else if (encryptedRole) {
          const bytes = CryptoJS.AES.decrypt(encryptedRole, 'asdasd');
          const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

          if (decryptedRole !== 'admin') {
            next('/'); // Redirect to home if role is not 'admin'
          } else {
            next();
          }
        } else {
          next('/login'); // If no role is found, redirect to login
        }
      },
    },

    {
      path: '/gallery-management',
      name: 'GalleryManagement',
      component: GalleryManagement,
    },
    {
      path: '/admin/gallery',
      name: 'AdminGalleryTable',
      component: AdminGalleryTable,  // This will route to the AdminGalleryTable component
    },
    {
      path: '/admin/gallery',
      name: 'AdminGalleryTable',
      component: AdminGalleryTable,  // This will route to the AdminGalleryTable component
    },
    {
      path: '/Collection',
      name: 'Collection',
      component: Collection, // Add the Collection route
    },
  ];

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  export default router;
