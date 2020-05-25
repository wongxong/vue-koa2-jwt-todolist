<template>
  <div id="app">
    <div class="logo-container">
      <img alt="Vue logo" src="./assets/logo.png">
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 16px;
    box-sizing: border-box;
  }

  body {
    font-size: 14px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .logo-container {
    padding: 30px 0;
    text-align: center;
  }
</style>
