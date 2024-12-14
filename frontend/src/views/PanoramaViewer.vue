<template>
   <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore the Oriental Mindoro Heritage Museum's collections. Book your visit and discover history, culture, and art.">
    <meta name="keywords" content="Museum, Oriental Mindoro, Heritage, Artifacts, Booking, Collections">
    <meta name="author" content="Oriental Mindoro Heritage Museum">
    <meta property="og:title" content="Oriental Mindoro Heritage Museum">
    <meta property="og:description" content="Discover the rich cultural heritage of Oriental Mindoro.">
       <!-- SEO Meta Tags -->
       <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />
    <!-- SEO Meta Tags -->
    <meta name="description" content="Experience history and culture at the Oriental Mindoro Heritage Museum. Explore rich cultural artifacts, historical records, and more." />
    <meta name="keywords" content="Oriental Mindoro, Heritage Museum, History, Culture, Mangyan Artifacts, Museum Booking" />
    <meta name="author" content="Oriental Mindoro Heritage Museum" />

    <!-- Open Graph Meta Tags for Social Sharing -->
    <meta property="og:title" content="Oriental Mindoro Heritage Museum" />
    <meta property="og:description" content="Discover the rich culture and history of Oriental Mindoro at our heritage museum." />
    <meta property="og:image" content="/path-to-your-image.jpg" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Oriental Mindoro Heritage Museum" />
    <meta name="twitter:description" content="Explore the culture and history of Oriental Mindoro at the Heritage Museum." />
  <div class="panorama-wrapper">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Category Buttons -->
      <div class="category-buttons">
        <button
          class="category-btn"
          :class="{ active: selectedCategory === 'front' }"
          @click="setCategory('front')"
        >
          Front
        </button>
        <button
          class="category-btn"
          :class="{ active: selectedCategory === 'inside' }"
          @click="setCategory('inside')"
        >
          Inside
        </button>
        <button
          class="category-btn"
          :class="{ active: selectedCategory === 'top' }"
          @click="setCategory('top')"
        >
          Top
        </button>
        <button
          class="category-btn"
          :class="{ active: selectedCategory === 'topRoom' }"
          @click="setCategory('topRoom')"
        >
          Top Room
        </button>
      </div>

      <!-- Panorama Buttons for the selected category -->
      <div class="panorama-buttons">
        <button
          v-for="(image, index) in filteredImages"
          :key="index"
          :class="['modern-btn', 'btn-' + (index + 1)]"
          @click="setImage(image)"
        >
          {{ getImageName(image) }}
        </button>
      </div>

     
    </div>

    <!-- Panorama Viewer in Box -->
     
    <div class="panorama-container-wrapper">
      <div ref="panoramaContainer" class="panorama-container"></div>
        <!-- Home Button placed in the right side -->
         <!-- Home Button with transition class -->
      <button 
        class="home-btn"
        :class="{ 'move-home': isHomeClicked }"
        @click="goHome"
      >
        <a href="/homepage" class="home-link">Home</a>
      </button>
    </div>
  </div>
</template>



<script>
import * as THREE from "three";

export default {
  name: "PanoramaViewer",
  data() {
    return {
      isHomeClicked: false, // State to track the home button click

      // Grouped images by category
      imageCategories: {
        front: [
          require("@/assets/images/FRONT2.jpeg"),
          require("@/assets/images/FRONT3.jpeg"),
        ],
        inside: [
          require("@/assets/images/INSIDE1.jpeg"),
          require("@/assets/images/INSIDE2.jpeg"),
          require("@/assets/images/INSIDE3.jpeg"),
        ],
        top: [
          require("@/assets/images/TOP2.jpeg"),
          require("@/assets/images/TOP3.jpeg"),
          require("@/assets/images/TOP4.jpeg"),
          require("@/assets/images/TOP5.jpeg"),
          require("@/assets/images/TOP6.jpeg"),
          require("@/assets/images/TOP7.jpeg"),
          require("@/assets/images/TOP8.jpeg"),
          require("@/assets/images/TOP9.jpeg"),
        ],
        topRoom: [
          require("@/assets/images/TOPROOM22.jpeg"),
          require("@/assets/images/TOPROOM2.jpeg"),
        ],
      },
      selectedCategory: 'front', // Default selected category
      imageSrc: require("@/assets/images/FRONTVIEW.jpeg"),
    };
  },
  computed: {
    // Filter images based on selected category
    filteredImages() {
      return this.imageCategories[this.selectedCategory];
    }
  },
  methods: {
     // Method to trigger the home button animation
     goHome() {
      this.isHomeClicked = true;

      // Timeout to reset the animation after the transition ends
      setTimeout(() => {
        this.isHomeClicked = false;
      }, 2000); // Reset after 1 second (duration of the animation)
    },
    setCategory(category) {
      this.selectedCategory = category; // Set the category
    },
    setImage(image) {
      this.imageSrc = image;
      this.initPanorama();
    },
    initPanorama() {
      const container = this.$refs.panoramaContainer;
      if (!container) return;

      container.innerHTML = ''; // Clear previous content

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        this.imageSrc,
        (texture) => {
          const radius = 30;
          const height = 30;
          const segments = 1000;
          const geometry = new THREE.CylinderGeometry(radius, radius, height, segments, 1, true);

          const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
          const cylinder = new THREE.Mesh(geometry, material);
          scene.add(cylinder);

          camera.position.z = 0;
          camera.rotation.y = Math.PI;

          let isDragging = false;
          let previousMouseX = 0;

          renderer.domElement.addEventListener("mousedown", (event) => {
            isDragging = true;
            previousMouseX = event.clientX;
          });

          renderer.domElement.addEventListener("mousemove", (event) => {
            if (isDragging) {
              const deltaX = event.clientX - previousMouseX;
              cylinder.rotation.y += deltaX * 0.005;
              previousMouseX = event.clientX;
            }
          });

          renderer.domElement.addEventListener("mouseup", () => {
            isDragging = false;
          });

          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };
          animate();
        },
        undefined,
        (error) => {
          console.error("Error loading texture:", error);
        }
      );

      window.addEventListener("resize", () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      });
    },
    // Extract image name from the file path
    getImageName(image) {
      const path = image.split('/').pop(); // Get the file name with extension
      return path.split('.')[0]; // Remove file extension
    }
  },
};
</script>



<style scoped>
/* Home Button Styling */
.home-btn {
  position: absolute;
  top: 20px; /* Distance from the top */
  right: 20px; /* Distance from the right */
  background-color: #333; /* Dark background */
  color: white; /* Text color */
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  z-index: 10; /* Ensure it's above other elements */
  transition: transform 1s ease, opacity 1s ease;
}

.home-btn:hover {
  background-color: #39ff14; /* Neon green on hover */
}

.home-btn a {
  color: white;
  text-decoration: none;
}

/* Transition Effect: Moving the button */
.move-home {
  transform: translateX(200px); /* Move button to the right */
  opacity: 0; /* Fade the button out */
}

/* Home Button Responsive Styling */
@media (max-width: 768px) {
  .home-btn {
    top: 10px;
    right: 10px;
    font-size: 14px;
    padding: 8px 15px;
  }
}
/* Wrapper for full layout */
.panorama-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000; /* Black background */
  color: white;
}

/* Sidebar */
.sidebar {
  width: 300px;
  background-color: #1a1a1a; /* Dark sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-right: 1px solid #333;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
}

/* Category Buttons Section */
.category-buttons {
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333; /* Separate sections */
}

.category-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background-color: #333; /* Dark grey background */
  color: #39ff14; /* Neon green text */
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.category-btn.active {
  background-color: #39ff14; /* Neon green background for active state */
  color: #000; /* Black text for contrast */
}

.category-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0px 6px 12px rgba(57, 255, 20, 0.6); /* Neon green glow */
  background-color: #444; /* Slightly lighter grey */
}

/* Panorama Buttons Section */
.panorama-buttons {
  width: 100%;
  margin-top: 20px;
}

.modern-btn {
  width: 100%;
  padding: 15px 12px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  color: white; /* White text */
  background-color: #444; /* Grey background */
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.modern-btn:nth-child(odd) {
  background-color: #39ff14; /* Neon green background for odd buttons */
  color: #000; /* Black text for contrast */
}

.modern-btn:nth-child(even) {
  background-color: #333; /* Dark grey background for even buttons */
  color: #39ff14; /* Neon green text */
}

.modern-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0px 6px 12px rgba(57, 255, 20, 0.6); /* Neon green glow */
  background-color: #555; /* Slightly lighter grey */
}

/* Panorama Container Wrapper */
.panorama-container-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #000; /* Black background for immersive view */
}

.panorama-container {
  width: 90%;
  height: 70%;
  background-color: #111; /* Subtle contrast */
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .panorama-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border-right: none;
    border-bottom: 1px solid #333;
  }

  .category-buttons,
  .panorama-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .category-btn,
  .modern-btn {
    width: auto;
    flex: 1;
    margin: 5px;
    font-size: 12px;
    padding: 8px;
  }

  .panorama-container-wrapper {
    height: calc(100vh - 100px); /* Adjust for sidebar height */
    padding: 10px;
  }

  .panorama-container {
    width: 100%;
    height: 100%;
  }
}


</style>