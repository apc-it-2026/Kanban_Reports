<template>
    <a-col :span="8" :xs="24" :sm="12" :md="8">
      <a-card>
        <div v-for="item in steps" :key="item.process" 
        style="font-weight: bold;color: darkorchid;"
        > {{item.process}} </div>  
        <div class="timeline">
          <div
            class="container"
            :class="index % 2 === 0 ? 'left' : 'right'"
            v-for="(item, index) in steps"
            :key="index"
          >
            <div class="content">
              <div class="year">{{ item.date }}</div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </a-card>
    </a-col>
  </template>
  
  <script setup lang="ts">
  defineProps<{ steps: Array<{ name: string; date: string , content : string , process : string }> }>();    
 
  </script> 
  <style scoped>
  .timeline {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
}

.timeline::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: #ccc;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
}



.container {
    padding: 10px 10px;
    position: relative;
    background-color: inherit;
    width: 50%;
}

.container::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: -10px;
    background-color: white;
    border: 4px solid #ff9f55;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
}

.left {
    left: 0;
}

.right {
    left: 50%;
}

.left::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    border: medium solid transparent;
    border-left-color: #fff;
    border-width: 10px;
    margin-top: -10px;
}

.right::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 10px;
    left: 10px;
    border: medium solid transparent;
    border-right-color: #fff;
    border-width: 10px;
    margin-top: -10px;
}

.content {
    padding: 10px;
    background-color: white;
    position: relative;
    border-radius: 6px;
}

.year {
    background-color: #003366;
    color: white;
    padding: 5px 15px;
    display: inline-block;
    margin-bottom: 10px;
    border-radius: 15px;
    font-weight: bold;
}

.red {
    background-color: #e91e63;
}

.blue {
    background-color: #3f51b5;
}

.yellow {
    background-color: #ffc107;
}

.teal {
    background-color: #00bcd4;
}
@media screen and (max-width: 768px) {
    .timeline::after {
        left: 31px;
    }

    .container {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;
    }

    .container::before {
        left: 60px;
        border: medium solid transparent;
        border-left-color: #fff;
        border-width: 10px;
        margin-top: -10px;
    }

    .left,
    .right {
        left: 0%;
    }

    .right::before {
        left: 60px;
        border: medium solid transparent;
        border-left-color: #fff;
        border-width: 10px;
        margin-top: -10px;
    }
}
</style>
  