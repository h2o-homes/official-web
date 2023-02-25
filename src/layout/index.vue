<template>
  <div class="layout">
    <Navbar />
    <div class="layout-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name"/>
        </keep-alive>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "index",
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped lang="less">
@keyframes backgroundFade {
  0% {
    background-color: #003679;
  }
  33% {
    background-color: #0c84d3;
  }
  66% {
    background-color: #11abed;
  }
  100% {
    background-color: #003679;
  }
}
.layout {
  position: relative;
  min-height: 100%;
  display: flex;
  flex: auto;
  flex-direction: column;
  &-content {
    flex: auto;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0C84D3;
    animation: backgroundFade 22s linear infinite; // #003679-----#0c84d3------#11abed
    z-index: -1;
    transform: translateZ(0);
  }
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>