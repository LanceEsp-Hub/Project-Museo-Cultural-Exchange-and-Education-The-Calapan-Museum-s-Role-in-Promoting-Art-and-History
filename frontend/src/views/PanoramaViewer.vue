<template>
  <div class="panorama-wrapper">
    <!-- Sidebar -->
    <div class="sidebar">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="['modern-btn', 'btn-' + (index + 1)]"
        @click="setImage(image)"
      >
        Button {{ index + 1 }}
      </button>
    </div>

    <!-- Panorama Viewer in Box -->
    <div class="panorama-container-wrapper">
      <div ref="panoramaContainer" class="panorama-container"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "PanoramaViewer",
  data() {
    return {
      images: [
        require("@/assets/images/FRONT2.jpeg"),
        require("@/assets/images/FRONT3.jpeg"),
        require("@/assets/images/INSIDE1.jpeg"),
        require("@/assets/images/INSIDE2.jpeg"),
        require("@/assets/images/INSIDE3.jpeg"),
        require("@/assets/images/TOP2.jpeg"),
        require("@/assets/images/TOP3.jpeg"),
        require("@/assets/images/TOP4.jpeg"),
        require("@/assets/images/TOP5.jpeg"),
        require("@/assets/images/TOP6.jpeg"),
        require("@/assets/images/TOP7.jpeg"),
        require("@/assets/images/TOP8.jpeg"),
        require("@/assets/images/TOP9.jpeg"),
        require("@/assets/images/TOPROOM22.jpeg"),
        require("@/assets/images/TOPROOM2.jpeg"),
      ],
      imageSrc: require("@/assets/images/FRONTVIEW.jpeg"),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initPanorama();
    });
  },
  methods: {
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
  },
};
</script>



<style scoped>
/* Wrapper for full layout */
.panorama-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Sidebar Buttons */
.modern-btn {
  width: 100%;
  padding: 15px 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.modern-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}

.modern-btn:nth-child(odd) {
  background-color: #007bff;
  color: white;
}

.modern-btn:nth-child(even) {
  background-color: #6c757d;
  color: white;
}

/* Panorama Container Wrapper */
.panorama-container-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0; /* Light background for contrast */
}

/* Panorama Viewer Box */
.panorama-container {
  width: 90%;
  height: 70%;
  background-color: #000;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
