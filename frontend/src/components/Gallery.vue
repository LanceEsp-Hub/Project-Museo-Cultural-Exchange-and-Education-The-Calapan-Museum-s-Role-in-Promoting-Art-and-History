<template>
    <div class="gallery-container">
      <div class="gallery-header">GALERIES</div>
      <div class="row">
        <!-- Gallery Items -->
        <div 
          v-for="(item, index) in galleryItems" 
          :key="index" 
          class="gallery-item col-lg-4 col-md-4 col-sm-12">
          <img :src="item.image" :alt="item.title" />
          <div class="gallery-info">
            <div class="gallery-title">{{ item.title }}</div>
            <div class="gallery-category">{{ item.category }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Gallery",
    props: {
      galleryItems: {
        type: Array,
        required: true,
        default: () => [
          {
            image: "https://via.placeholder.com/300x200",
            title: "Mountain Modern",
            category: "Residential",
          },
          {
            image: "https://via.placeholder.com/300x200",
            title: "Hills Borough Drive",
            category: "Residential",
          },
          {
            image: "https://via.placeholder.com/300x200",
            title: "Modern Sculpture",
            category: "Art Piece",
          },
          {
            image: "https://via.placeholder.com/300x200",
            title: "Ancient Pottery",
            category: "Artifacts",
          },
          {
            image: "https://via.placeholder.com/300x200",
            title: "Historic Painting",
            category: "Fine Arts",
          },
          {
            image: "https://via.placeholder.com/300x200",
            title: "Cultural Exhibit",
            category: "Ethnology",
          },
        ],
      },
    },
  };
  </script>
  
  <style scoped>
  .gallery-container {
    padding: 20px;
  }
  .gallery-header {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
  .gallery-item {
    margin-bottom: 15px;
  }
  .gallery-item img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .gallery-info {
    text-align: center;
    margin-top: 10px;
  }
  .gallery-title {
    font-weight: bold;
  }
  .gallery-category {
    color: gray;
    font-size: 0.9em;
  }
  </style>
  