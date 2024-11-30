<template>
      <!-- Navbar -->
    <nav class="navbar navbar-custom navbar-dark">
                <router-link to="/Profile">
        <img v-if="profilePictureContainer.imageUrl" 
            :src="profilePictureContainer.imageUrl" 
            alt="Profile Picture" 
            class="profile-picture" 
            style="width: 50px; height: 50px; margin-left: 25%;" />
        </router-link>
        <p v-if="profilePictureContainer.error">{{ profilePictureContainer.error }}</p>

        <div class="container d-flex justify-content-between align-items-center">
          <!-- Social Media Icons and Brand Name -->
          <div class="d-flex align-items-center">
            
            <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-white me-3"><i class="bi bi-instagram"></i></a>
            <span class="navbar-brand ms-2">ORIENTAL MINDORO HERITAGE MUSEUM</span>
            
          </div>
  
          <!-- Toggle Button for Navbar Links -->
          <button class="navbar-toggler" type="button" @click="toggleNavbarLinks">
            <i class="bi bi-list text-white fs-3"></i>
          </button>
          
        </div>
        <!-- Collapsible Navbar Links Below Header -->
        <div v-if="showNavbarLinks" id="navbarLinks" class="text-center">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link text-white" href="/Profile">Profile</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-white" href="#" @click="gotoView">Booking</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-white" href="#">Home</a>
                </li>
                <li class="nav-item">
                <!-- Updated link for accessing the Collections page -->
                <a class="nav-link text-white" href="/Collection">Collections</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-white" href="#">About</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-white" href="#">Contact</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-white" href="#" @click="logout">Logout</a>
                </li>
            </ul>
        </div>

    </nav>
</template>
