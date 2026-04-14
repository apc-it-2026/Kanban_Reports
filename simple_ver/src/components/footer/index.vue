<!-- <template>
  <a-layout-footer class="footer">APACHE</a-layout-footer>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: var(--color-text-2);
    text-align: center;
  }
</style> -->

<template>
  <a-layout-footer class="footer">
    <div class="scrolling-text"> APACHE ORGANIZATION </div>
  </a-layout-footer>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: #0c10e0;
    text-align: center;
    background-color: #11b4dd;
    font-size: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    overflow: hidden; /* Ensure content stays within the footer */
    position: relative;
    box-shadow: 20px 20px #11b4dd;
  }

  .footer:hover {
    background-color: cadetblue;
  }

  .scrolling-text {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
    animation: scroll-left 10s linear infinite;
  }

  @keyframes scroll-left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
