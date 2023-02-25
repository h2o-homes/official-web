<template>
  <div class="footer container">
    <a-row type="flex" justify="center" :wrap="true">
      <a-col class="contact" :wrap="true">
        <a-row type="flex" align="middle" justify="space-around" style="margin-bottom: 40px">
          <a href="https://twitter.com/H2O_Homes" target="_blank">
            <svg-icon icon-class="twitter"></svg-icon>
          </a>
          <a-dropdown placement="topCenter">
            <svg-icon icon-class="telegram"></svg-icon>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="https://t.me/H2OHomes" target="_blank">
                    Group
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a href="https://t.me/H2OHomesNews" target="_blank">
                    Channel
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
<!--          <a href="https://t.me/H2OHomes" target="_blank">-->
<!--            <svg-icon icon-class="telegram"></svg-icon>-->
<!--          </a>-->
          <a href="https://discord.gg/fMC5mMGrqr" target="_blank">
            <svg-icon icon-class="discord"></svg-icon>
          </a>
        </a-row>
        <a-row type="flex" align="middle" justify="space-between">
          <a-col>Copyright ©️ H2O 2022. All Rights Reserved</a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {}
}
</script>

<style scoped lang="less">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, .6);
  >.ant-row {
    padding: 80px 0;
    width: 100%;
  }
  .contact {
    .svg-icon {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
}
</style>