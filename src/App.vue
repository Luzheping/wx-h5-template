<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"/>
  </div>
</template>

<style lang="less">
  #app{
    height: 100%;
  }
</style>
