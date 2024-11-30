<template>
  <div>
    <!-- Modern Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand fw-bold" href="#">
          ORIENTAL MINDORO HERITAGE MUSEUM
        </a>

        <!-- Toggler for Mobile View -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Exhibits</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
            <!-- Dropdown for Account Actions -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="accountDropdown">
                <li><a class="dropdown-item" href="http://localhost:8080/register">Register</a></li>
                <li><a class="dropdown-item" href="http://localhost:8080/login">Login</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section d-flex align-items-center justify-content-center text-center">
      <div class="hero-overlay p-5 rounded-3 shadow-lg">
        <h1 class="text-light fw-bold display-4">Welcome to Mindoro Heritage Museum</h1>
        <p class="text-light fs-5 mt-4">
          Explore history, culture, and heritage at your fingertips.
        </p>
        <a href="#" class="btn btn-light mt-4 px-4 py-2 shadow-sm">Discover More</a>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="intro-section text-center py-6 bg-light">
      <h2 class="text-primary fw-bold">Experience History and Culture</h2>
      <div class="divider mx-auto my-4"></div>
      <p class="lead mx-auto" style="max-width: 800px;">
        The Oriental Mindoro Heritage Museum (OMHM), Calapan, exhibits the province's rich culture and history. Opened
        during the 71st Founding Anniversary Celebration of the province on November 15, 2021, it stands as a testament
        to the efforts of preserving our cultural legacy.
      </p>
    </section>

    <!-- Explore Section -->
    <section class="explore-section py-6">
      <div class="container">
        <div class="row align-items-center g-5">
          <!-- Text Content -->
          <div class="col-md-6 order-2 order-md-1">
            <h3 class="mb-4 fw-bold">Explore What's Inside</h3>
            <p class="fs-6">
              As the custodian of Mindoro's heritage, the museum houses cultural artifacts, historical records, and
              remarkable memorabilia from across the province. Visitors can immerse themselves in the traditions and
              stories of the Mangyan people and Mindoro’s vibrant history.
            </p>
            <a href="#" class="btn btn-primary mt-4">Book a Visit</a>
          </div>
          <!-- Image Content -->
          <div class="col-md-6 order-1 order-md-2">
            <img
              src="YOUR_IMAGE_PATH_HERE"
              alt="Museum Interior"
              class="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
/* Navbar */
.navbar {
  padding: 1rem 0;
}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

.navbar .dropdown-menu {
  border-radius: 10px;
}

/* Hero Section */
.hero-section {
  background: url('~@/assets/images/bg_museum.jpg') no-repeat center center / cover;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.75);
  max-width: 800px;
}

.hero-section h1 {
  font-size: 3rem;
}

.hero-section p {
  font-size: 1.25rem;
}

/* Introduction Section */
.intro-section {
  text-align: center;
  padding: 4rem 0;
}

.intro-section h2 {
  font-size: 2.25rem;
}

.intro-section .divider {
  width: 80px;
  height: 4px;
  background-color: #0d6efd;
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.intro-section p {
  font-size: 1.125rem;
}

/* Explore Section */
.explore-section {
  padding: 4rem 0;
}

.explore-section img {
  border-radius: 15px;
  border: 2px solid #ddd;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.explore-section h3 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.explore-section p {
  color: #555;
  font-size: 1.125rem;
}
</style>
