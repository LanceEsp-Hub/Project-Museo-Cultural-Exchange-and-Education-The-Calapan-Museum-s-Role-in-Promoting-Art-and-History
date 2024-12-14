import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Homepage from '../views/Homepage.vue';
import Landingpage from '../views/Landingpage.vue';
import AdminDashboard from '../views/Admin_dashboard.vue';
import UserProfile from '../views/UserProfile.vue';
import GalleryManagement from '../views/GalleryManagement.vue';
import AdminGalleryTable from '../views/adminGalleryTable.vue';
import Bookingpage from '../views/Bookingpage.vue';
import ViewBooking from '../views/Viewbooking.vue';
import Collection from '../views/Collection.vue';
import BookingMangement from '../views/BookingManagement.vue';
import CryptoJS from 'crypto-js';
import Favorites from "@/views/Favorites.vue";
import CreateEvent from '../views/CreateEvent.vue';
import EventList from '../views/EventList.vue';
import ViewReviews from '@/views/ViewReviews.vue';
import PanoramaViewer from '@/views/PanoramaViewer.vue';
import RequestResetPassword from '@/views/RequestPasswordReset.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import AdminAccounts from '@/views/AdminAccounts.vue';
import AdminUsers from '@/views/AdminUsers.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landingpage,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/request-reset',
    name: 'RequestResetPassword',
    component: RequestResetPassword,
  },
  {
    path: '/viewreview',
    name: 'ViewReviews',
    component: ViewReviews,
    meta: { role: 'admin' },
  },
  {
    path: '/bookrecord',
    name: 'ViewBooking',
    component: ViewBooking,
    meta: { role: 'user' },
  },
  {
    path: '/adminusers',
    name: 'AdminUsers',
    component: AdminUsers,
  },
  {
    path: '/adminaccounts',
    name: 'AdminAccounts',
    component: AdminAccounts,
  },
  {
    path: '/Booking',
    name: 'Bookingpage',
    component: Bookingpage,
    meta: { role: 'user' },
  },
  {
    path: '/admin-bookingmanagement',
    name: 'BookingMangement',
    component: BookingMangement,
    meta: { role: 'admin' },
  },
  {
    path: '/Profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { role: 'user' },
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
    meta: { role: 'user' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent,
    meta: { role: 'admin' },
  },
  {
    path: '/events',
    name: 'EventList',
    component: EventList,
    meta: { role: 'admin' },
  },
  {
    path: '/panorama',
    name: 'PanoramaViewer',
    component: PanoramaViewer,
    meta: { role: 'user' },
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: Homepage,
    meta: { role: 'user' }, // User-only route
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { role: 'admin' }, // Admin-only route
  },
  {
    path: '/gallery-management',
    name: 'GalleryManagement',
    component: GalleryManagement,
    meta: { role: 'admin' }, // User-only route
  },
  {
    path: '/admin/gallery',
    name: 'AdminGalleryTable',
    component: AdminGalleryTable,
    meta: { role: 'admin' }, // Admin-only route
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection,
    meta: { role: 'user' }, // User-only route
  },
  {
    path: '/collection/:id',
    name: 'Collection',
    component: () => import('@/views/Collection.vue'), // Lazy loading the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token');
  const encryptedRole = localStorage.getItem('user_role');

  // Helper function to clear specific keys from localStorage
  const clearLocalStorage = () => {
    const keysToRemove = [
      'auth_token',
      'profile_picture',
      'profile_picture_error',
      'profile_pictures',
      'token',
      'user_email',
      'user_id',
      'user_name',
      'user_role',
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  if (to.meta.role) {
    if (!token) {
      clearLocalStorage(); // Clear storage and redirect
      next('/login');
    } else if (encryptedRole) {
      const bytes = CryptoJS.AES.decrypt(encryptedRole, 'asdasd');
      const userRole = bytes.toString(CryptoJS.enc.Utf8);

      if (to.meta.role === userRole) {
        next(); // Allow access if roles match
      } else {
        clearLocalStorage(); // Clear storage and redirect
        next('/');
      }
    } else {
      clearLocalStorage(); // Clear storage and redirect
      next('/login');
    }
  } else {
    next(); // Allow access if no specific role is required
  }
});

export default router;