<template>
  <div class="navbar">
    <a-row class="container" type="flex" justify="space-between" align="middle">
      <a-col class="left">
        <img src="../assets/img/logo.png" alt="" class="logo">
      </a-col>
      <a-dropdown class="dropdown">
        <MenuOutlined :style="{fontSize: '20px'}"/>
        <template #overlay>
          <a-menu @click="changeMenu" :selectedKeys="[currentRoute]">
            <a-menu-item key="Home">
              <span class="item" :class="{active: currentRoute === 'Home'}">Home</span>
            </a-menu-item>
            <a-menu-item key="RoadMap">
              <span class="item" :class="{active: currentRoute === 'RoadMap'}">RoadMap</span>
            </a-menu-item>
            <a-menu-item key="Tokenomics">
              <span class="item" :class="{active: currentRoute === 'Tokenomics'}">Tokenomics</span>
            </a-menu-item>
            <a-menu-item key="Airdrop">
              <span class="item" :class="{active: currentRoute === 'Airdrop'}">Airdrop</span>
            </a-menu-item>
            <a-menu-item>
              <a href="https://h2o-1.gitbook.io/h2o-witepaper/" target="_blank" style="color: inherit">Gitbook</a>
            </a-menu-item>
            <a-sub-menu title="Contact us">
              <a-menu-item class="link">
                <a href="https://twitter.com/H2O_Homes" target="_blank">
                  <img src="../assets/img/contact/twitter.png" alt="" class="icon">Twitter
                </a>
              </a-menu-item>
              <a-menu-item class="link">
                <a href="https://t.me/H2OHomes" target="_blank">
                  <img src="../assets/img/contact/telegram.png" alt="" class="icon">Telegram
                </a>
              </a-menu-item>
              <a-menu-item class="link">
                <a href="https://discord.gg/fMC5mMGrqr" target="_blank">
                  <img src="../assets/img/contact/discord.png" alt="" class="icon">Discord
                </a>
              </a-menu-item>
            </a-sub-menu>
            <!--            <a-menu-item class="connect">-->
            <!--              <a-button ghost v-if="showMetamaskWarning" @click="startOnboarding">Add MetaMask</a-button>-->
            <!--              <a-button ghost v-else-if="!defaultAccount" @click="connectMetamask">connect wallet</a-button>-->
            <!--              <a-button ghost v-else>{{ shortAccount }}</a-button>-->
            <!--            </a-menu-item>-->
          </a-menu>
        </template>
      </a-dropdown>
      <a-col class="menu">
        <span class="item" :class="{active: currentRoute === 'Home'}" @click="changeMenu('Home')">Home</span>
        <span class="item" :class="{active: currentRoute === 'RoadMap'}"
              @click="changeMenu('RoadMap')">RoadMap</span>
        <span class="item" :class="{active: currentRoute === 'Tokenomics'}"
              @click="changeMenu('Tokenomics')">Tokenomics</span>
        <span class="item" :class="{active: currentRoute === 'Airdrop'}"
              @click="changeMenu('Airdrop')">Airdrop Claim</span>
        <span class="item">
          <a href="https://h2o-1.gitbook.io/h2o-witepaper/" target="_blank">Gitbook</a>
        </span>

        <a-dropdown placement="bottomCenter">
          <span class="item">Contact us</span>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="https://twitter.com/H2O_Homes" target="_blank">
                  <img src="../assets/img/contact/twitter.png" alt="" class="icon">Twitter
                </a>
              </a-menu-item>
              <a-menu-item>
                <a href="https://t.me/H2OHomes" target="_blank">
                  <img src="../assets/img/contact/telegram.png" alt="" class="icon">Telegram
                </a>
              </a-menu-item>
              <a-menu-item>
                <a href="https://discord.gg/fMC5mMGrqr" target="_blank">
                  <img src="../assets/img/contact/discord.png" alt="" class="icon">Discord
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <div class="connect">
          <span v-if="showMetamaskWarning" class="h-btn" @click="startOnboarding">Add MetaMask</span>
          <span v-else-if="!defaultAccount" class="h-btn" @click="connectMetamask">connect wallet</span>
          <a-dropdown placement="bottomCenter" trigger="click" v-else>
            <span class="h-btn">{{ shortAccount }}</span>
            <template #overlay>
              <a-menu style="padding: 0; overflow: hidden;"  @click="disconnect">
                <a-menu-item style="padding: 14px 24px;">Disconnect wallet</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-col>
    </a-row>
    <a-modal v-model:visible="walletDialogVisible"
             :footer="null"
             :title="`Please connect wallet`"
             @ok="closeWalletDialog">
      <a-row type="flex" justify="space-between" align="middle">
        <div>
          <img src="../assets/img/metamask.png" alt="" width="30">
          <span style="margin-left: 10px">MetaMask</span>
        </div>
        <div class="connect">
          <span v-if="showMetamaskWarning" class="h-btn" @click="startOnboarding">add</span>
          <span v-else-if="!defaultAccount" class="h-btn" @click="connectMetamask">connect wallet</span>
          <span class="h-btn" v-else>{{ shortAccount }}</span>
        </div>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import _ from 'lodash';
import MetaMaskOnboarding from "@metamask/onboarding";
import {shortString} from "@/utils"
import storage from "@/utils/storage"
import {MenuOutlined} from '@ant-design/icons-vue';
import eventBus from "vue3-eventbus";

export default {
  name: "Navbar",
  data() {
    return {
      walletDialogVisible: false
    }
  },
  components: {
    MenuOutlined
  },
  computed: {
    ...mapState(['defaultAccount', 'currentNetworkId']),
    showMetamaskWarning() {
      return !this.web3.currentProvider;
    },
    shortAccount() {
      return shortString(this.defaultAccount)
    },
    currentRoute() {
      return this.$route.name
    }
  },
  created() {
    const disconnect = storage.get('disconnect')
    if (!disconnect) {
      this.connect()
    }

    eventBus.on('showWalletDialog', () => {
      this.walletDialogVisible = true
    })
    eventBus.on('accountChanged', () => {
      this.walletDialogVisible = false
    })
  },
  methods: {
    ...mapActions({
      initializeStore: 'initialize',
      disconnect: 'disconnect',
    }),
    connectMetamask() {
      const web3 = this.web3.currentProvider;
      if (!web3) {
        return
      }
      web3
        .request({method: 'eth_requestAccounts'})
        .then(() => {
          this.initializeStore()
        })
        .catch((requestError) => {
          this.handleError(requestError)
        });
    },
    async startOnboarding() {
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
    },
    handleError(error) {
      if (error.code === -32002) {
        this.$notification.warning({
          message: 'Request already pending. Please wait.',
          description: ''
        });
      }
    },
    async connect() {
      const web3 = this.web3.currentProvider;
      if (!web3) {
        return
      }
      // const networkId = await this.web3.eth.net.getId();
      // if (networkId.toString() !== this.$networkConfig.expectedNetworkId) {
      //   return
      // }
      // 如果能获取到节点控制的帐户，就连接钱包
      const accounts = await this.web3.eth.getAccounts();
      if (accounts.length) {
        web3
          .request({method: 'eth_requestAccounts'})
          .then(() => {
            this.initializeStore()
          })
          .catch((requestError) => {
            console.error('requestError:: ', requestError);
            this.handleError(requestError)
          });
      }
    },
    // async connectMetamask() {
    //   const web3 = this.web3.currentProvider;
    //   if (!web3) {
    //     return
    //   }
    //   const networkId = await this.web3.eth.net.getId()
    //   if (networkId.toString() !== this.$networkConfig.expectedNetworkId) {
    //     await this.configureMetaMask()
    //   }
    //   // 如果此时网络正确，才拉起metamask
    //   const networkId2 = await this.web3.eth.net.getId()
    //   if (networkId2.toString() === this.$networkConfig.expectedNetworkId) {
    //     web3
    //       .request({method: 'eth_requestAccounts'})
    //       .then(() => {
    //         this.initializeStore()
    //       })
    //       .catch((requestError) => {
    //         console.error('requestError:: ', requestError);
    //         this.handleError(requestError)
    //       });
    //   }
    // },
    // async configureMetaMask() {
    //   const web3 = this.web3.currentProvider;
    //   if (!web3) {
    //     return
    //   }
    //
    //   const {
    //     chainId, chainName, rpcUrls, blockExplorerUrls, currencyName, currencySymbol, currencyDecimals
    //   } = this.$networkConfig
    //   try {
    //     await web3.request({
    //       method: 'wallet_switchEthereumChain',
    //       params: [{chainId}],
    //     });
    //   } catch (switchError) {
    //     if (switchError.code === 4902) {
    //       // 检测用户没有添加当前链
    //       try {
    //         await web3.request({
    //           method: 'wallet_addEthereumChain',
    //           params: [
    //             {
    //               chainId,
    //               chainName,
    //               nativeCurrency: {
    //                 name: currencyName,
    //                 symbol: currencySymbol,
    //                 decimals: currencyDecimals,
    //               },
    //               rpcUrls,
    //               blockExplorerUrls
    //             },
    //           ],
    //         });
    //       } catch (addError) {
    //         this.handleError(addError)
    //         console.error('addError:: ', addError);
    //       }
    //     } else {
    //       this.handleError(switchError)
    //       console.error('switchError:: ', switchError);
    //     }
    //   }
    // },
    closeWalletDialog() {
      this.walletDialogVisible = false
    },
    changeMenu(item) {
      let key = item
      if (_.isObject(item)) {
        key = item.key
      }
      this.$router.push({
        name: key
      })
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  height: 124px;
  display: flex;
  align-items: flex-end;
  line-height: 58px;
  color: #fff;
  background-size: 100% 100%;
  background-color: transparent;

  .left {
    .logo {
      margin-right: 75px;
      width: 108px;
    }
  }

  .dropdown {
    display: none;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    font-size: 14px;

    .item {
      position: relative;
      border-bottom: 6px solid transparent;
      margin-left: 60px;

      > a {
        color: inherit;
      }

      &:before {
        animation: border-anim 0.2s linear;
      }

      &.active, &:hover {
        &:before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
        }
      }
      &:hover {
        &:before {
          background-color: #FFFFFF;
        }
      }
      &.active {
        &:before{
          background-color: #2AF1C0;
        }
      }
      &:not(&.active) {
        cursor: pointer;
      }
    }
  }

  .connect {
    margin-left: 84px;

    .h-btn {
      padding: 0 20px;
      height: 40px;
      color: #056EB3;
    }
  }
}

@keyframes border-anim {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@media (max-width: 992px) {
  .navbar {
    .dropdown {
      display: block;
    }

    .menu {
      display: none;
    }
  }
}
</style>