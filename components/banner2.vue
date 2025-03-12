<template>
    <section class="banner-container">
      <div class="item">
        <div class="icon icon-1"></div>
        <div class="text">Certified Organic Ingredients</div>
      </div>
      <div class="item">
        <div class="icon icon-2"></div>
        <div class="text">Clinically Verified Bio-Active Benefits</div>
      </div>
      <div class="item">
        <div class="icon icon-3"></div>
        <div class="text">100% Natural & Safe</div>
      </div>
      <div class="item">
        <div class="icon icon-4"></div>
        <div class="text">Holistic Health Support</div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .banner-container {
    min-height: 15rem !important;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: #e6f0ea;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .item {
    text-align: center;
    color: #333;
    flex: 1;
    min-width: 150px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
  }
  
  .icon {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
  
  .icon-1 {
    background: url('/images/dukhuni.svg') no-repeat center;
    background-size: contain;
  }
  
  .icon-2 {
    background: url('/images/hand_pant.svg') no-repeat center;
    background-size: contain;
  }
  
  .icon-3 {
    background: url('/images/leaf.svg') no-repeat center;
    background-size: contain;
  }
  
  .icon-4 {
    background: url('/images/heart_leaf.svg') no-repeat center;
    background-size: contain;
  }
  
  .text {
    font-size: 20px;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>
  