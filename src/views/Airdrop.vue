<template>
  <div class="airdrop">
    <div class="container">
      <a-row type="flex">
        <a-col class="col" :lg="8" :md="12" :xs="24" v-for="item in projects" :key="item.id">
          <div class="item"
               :class="{soon: item.status === 'SOON', progress: item.status === 'PROGRESS' || item.status === 'ACT-PROGRESS', end: item.status === 'END'}">
            <div class="header">
              <span class="logo">
                <img :src="item.logo" alt="">
              </span>
              <span>{{ item.name }}</span>
            </div>
            <div class="body">
              <div class="chain">
                <span>{{ item.network }}</span>
              </div>
              <div class="intro">
                <div>
                  {{ item.description }}
                </div>
              </div>
            </div>
            <div class="btns">
              <span class="detail" @click="viewDetail(item)">Details</span>
              <span class="claim"
                    :class="{disabled: isClaimDisabled(item)}"
                    @click="claimToken(item)">
                <LoadingOutlined v-if="item.claiming" :style="{marginRight: '8px'}"/>Claim
              </span>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-modal v-model:visible="visible" @ok="handleOk" class="detail-dialog">
      <template #title>
        <div class="title">
          <span class="logo"><img :src="pDetail.logo" alt=""></span>
          <div class="info">
            <div class="name">
              <span class="text">{{ pDetail.name }}</span>
              <span class="chain">{{ pDetail.network }}</span>
            </div>
            <div class="site"><a :href="pDetail.url" target="_blank">{{ pDetail.url }}</a></div>
            <div class="contact">
              <a :href="pDetail.twitter" v-if="pDetail.twitter" target="_blank">
                <img src="../assets/img/contact/twitter.png" alt="">
              </a>
              <a :href="pDetail.telegram" v-if="pDetail.telegram" target="_blank">
                <img src="../assets/img/contact/telegram.png" alt="">
              </a>
              <a :href="pDetail.discord" v-if="pDetail.discord" target="_blank">
                <img src="../assets/img/contact/discord.png" alt="">
              </a>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="footer"
             :class="{disabled: isClaimDisabled(pDetail)}"
             @click="claimToken(pDetail)">
          <LoadingOutlined v-if="pDetail.claiming" :style="{marginRight: '8px'}"/>
          Claim
        </div>
      </template>
      <div class="body">
        <div class="content">
          <div class="data">
            Network: {{ pDetail.network }}<br>
            Contract:<br>
            {{ pDetail.tokenAddress }}
          </div>
          <p class="desc">{{ pDetail.description }}</p>
          <p class="desc" style="white-space: pre-wrap;">{{ pDetail.claimConditions }}</p>
          <p class="desc">For more details please check <a :href="pDetail.activityDetail" target="_blank">{{ pDetail.activityDetail }}</a></p>
          <div>
            Number of claims:
            <span v-if="pDetail.whiteList">{{
                formattedClaimAmount(pDetail.whiteList.claimAmount)
              }} {{ pDetail.tokenSymbol }}</span>
            <span v-else>Not eligible to claim</span>
          </div>
          <div>
            Activity time:
            <div>{{ formatClaimTime(pDetail.activityStartTime * 1000) }} -- {{ formatClaimTime(pDetail.activityEndTime * 1000) }}</div>
          </div>
          <div>
            Claim time:
            <div>{{ formatClaimTime(pDetail.startTime * 1000) }} -- {{ formatClaimTime(pDetail.endTime * 1000) }}</div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import eventBus from 'vue3-eventbus'
import {mapState, mapGetters, mapActions} from "vuex";
import {fromWeiEther} from "@/utils/common";
import {formatTime} from "@/utils"
import {fetchProject} from '@/api/statistics'
import AirdropContract from '@/contracts/abi/AirdropTokenDistributor.json';
import {LoadingOutlined} from '@ant-design/icons-vue';
import Web3 from "web3";

export default {
  name: "Airdrop",
  data() {
    return {
      visible: false,
      projects: [],
      pDetail: {}
    }
  },
  components: {
    LoadingOutlined,
  },
  computed: {
    ...mapState(['defaultAccount', 'currentNetworkId']),
    ...mapGetters(['contracts'])
  },
  created() {
    this.getProject()
    eventBus.on('accountChanged', () => {
      this.getProject()
    })
  },
  methods: {
    ...mapActions(['aggregate', 'connectMetamask']),
    formatClaimTime(value) {
      return formatTime(value, 'yyyy-MM-dd hh:mm')
    },
    formattedClaimAmount(value) {
      return fromWeiEther(value)
    },
    isClaimDisabled(item = {}) {
      return item.status !== 'PROGRESS' || !item.whiteList || item.isClaimd || item.claiming
    },
    async getProject() {
      const res = await fetchProject({userAddress: this.defaultAccount})
      const projects = res.data.content || []
      const now = Date.now() / 1000
      projects.forEach((item) => {
        item.isClaimd = true
        item.rpcInfo.chainId = item.rpcInfo.chainId.toString()
        if (now > item.endTime) {
          item.status = 'END'
        } else if (now < item.activityStartTime) {
          item.status = 'SOON'
        } else {
          item.status = 'ACT-PROGRESS' // 活动开始
        }
        if (now > item.startTime && now < item.endTime) {
          item.status = 'PROGRESS'
        }
      })
      this.projects = projects
      await this.getProjectClaimStatus()
    },
    async getProjectClaimStatus() {
      const projects = this.projects.filter((item) => {
        return item.status === 'PROGRESS' && item.whiteList // 进行中且有资格的项目
      })

      const calls = []
      projects.forEach((item) => {
        const {abi} = AirdropContract
        const {url} = item.rpcInfo
        const web3 = new Web3(url);
        const AirdropTokenDistributor = new web3.eth.Contract(abi, item.contractAddress)
        calls.push(AirdropTokenDistributor.methods.isClaimed(item.whiteList.claimIndex).call())
      })
      // console.log('getProjectClaimStatus projects:: ', projects);
      const res = await Promise.all(calls)
      // console.log('claimed:: ', res);
      projects.forEach((project, index) => {
        if (!res[index]) {
          this.projects.forEach((item) => {
            if (item.contractAddress === project.contractAddress) {
              item.isClaimd = false
            }
          })
        }
      })
    },
    async claimToken(item) {
      // this.$message.success('claim success')
      // setTimeout(() => {
      //   this.addToken(item)
      // }, 200)
      // return

      if (!this.defaultAccount) {
        eventBus.emit('showWalletDialog')
        return
      }
      if (this.isClaimDisabled(item)) {
        return
      }
      const {chainId} = item.rpcInfo
      if (chainId !== this.currentNetworkId) {
        const {chainId, name, symbol, url, browser} = item.rpcInfo
        const config = {
          expectedNetworkId: chainId,
          chainId: this.web3.utils.numberToHex(chainId),
          chainName: name,
          currencySymbol: symbol,
          currencyDecimals: 18,
          rpcUrls: [url],
          blockExplorerUrls: [browser]
        }
        await this.connectMetamask(config)
      }
      if (this.currentNetworkId !== chainId) {
        return
      }
      item.claiming = true
      const {userAddress, proof, amount, claimIndex} = item.whiteList
      const {abi} = AirdropContract
      const AirdropTokenDistributor = new this.web3.eth.Contract(abi, item.contractAddress);
      const merkleProof = proof.split(',')
      console.log(claimIndex, userAddress, amount, merkleProof);
      AirdropTokenDistributor.methods.claim(claimIndex, userAddress, amount, merkleProof).send({
        from: this.defaultAccount,
      }).then((data) => {
        if (data.status) {
          item.isClaimd = true
          this.$message.success('claim success')
          setTimeout(() => {
            this.addToken(item)
          }, 200)
        }
      }).catch((e) => {
        if (e.code !== 4001) { // User denied
          this.$message.error(e.message)
        }
      }).finally(() => {
        item.claiming = false
      })
    },
    async addToken(item) {
      const {tokenAddress, tokenImage, tokenDecimals, tokenSymbol} = item
      await this.web3.currentProvider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          }
        }
      })
    },
    handleOk() {
      this.visible = false
    },
    viewDetail(project = {}) {
      this.visible = true
      this.pDetail = project
    }
  }
}
</script>

<style lang="less">
.ant-modal.detail-dialog {
  .ant-modal-content {
    border-radius: 20px;
  }

  .ant-modal-header {
    border-bottom: none;
  }

  .ant-modal-body {
    padding: 12px 36px 38px;
  }

  .ant-modal-footer {
    padding: 0;
    border-radius: 0;
    border-top: none;
  }
}
</style>
<style scoped lang="less">
.detail-dialog {
  a {
    text-decoration: underline;
    color: #41C3FF;
  }

  .body {
    box-shadow: 0px 0px 18px 3px rgba(144, 144, 144, 0.13);
    border-radius: 20px;
    font-size: 16px;
    line-height: 30px;
    color: #8C9FA7;

    .content {
      padding: 30px 36px 40px;
      //max-height: 332px;
      max-height: 400px;
      overflow-y: scroll;
      mask: linear-gradient(rgb(255, 255, 255) 86%, transparent);
    }

    .data {
      margin-bottom: 24px;
    }

    .desc {
      margin-bottom: 24px;
      line-height: 24px;
      color: #505A5F;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    background: #2AF1C0;
    border-radius: 0 0 20px 20px;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    cursor: pointer;

    &.disabled {
      background: #A5F8E4;
      cursor: auto;
    }
  }

  .title {
    display: flex;

    .logo {
      margin-right: 26px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      margin-top: 14px;

      .name {
        .text {
          display: inline-block;
          margin-right: 18px;
          margin-bottom: 6px;
          font-size: 24px;
          font-weight: bold;
          color: #041D28;
        }

        .chain {
          margin-bottom: 6px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 4px 18px;
          background: #DFF5FF;
          color: #065B82;
          border: 1px solid #16538E;
          border-radius: 13px;
          line-height: 1;
          font-size: 18px;
        }
      }

      .site {
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: bold;
      }

      .contact {
        > a {
          margin-right: 16px;
          display: inline-block;
          width: 30px;
          height: 30px;

          > img {
            width: 100%;
          }
        }
      }
    }
  }
}

.airdrop {
  padding: 110px 0;

  .col {
    padding: 15px;
  }

  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 20px 47px;
    height: 100%;
    background: #FFFFFF;
    border-radius: 20px;
    text-align: left;
    font-size: 18px;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: -1px;
      right: -1px;
      width: 145px;
      height: 135px;
    }

    &.soon {
      &:before {
        background: url("../assets/img/home/coming-soon.png") center no-repeat;
        background-size: 100% 100%;
      }
    }

    &.progress {
      &:before {
        background: url("../assets/img/home/in-progress.png") center no-repeat;
        background-size: 100% 100%;
      }
    }

    &.end {
      &:before {
        background: url("../assets/img/home/ending.png") center no-repeat;
        background-size: 100% 100%;
      }
    }

    .header {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #041D28;

      .logo {
        margin-right: 20px;
        width: 42px;
        height: 42px;
        border-radius: 50%;

        > img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .body {
      padding: 0 5px 0 32px;
      flex: 1;

      .chain {
        padding-left: 24px;

        > span {
          display: inline-block;
          padding: 4px 18px;
          line-height: 1;
          font-weight: bold;
          color: #065B82;
          background: #DFF5FF;
          border: 1px solid #16538E;
          border-radius: 13px;
        }
      }

      .intro {
        margin: 30px 0 45px;
        box-shadow: 0px 0px 18px 3px rgba(144, 144, 144, 0.13);
        border-radius: 20px;
        font-size: 16px;
        color: #8C9FA7;

        > div {
          overflow: hidden;
          max-height: 250px;
          word-break: break-word;
          overflow-y: scroll;
          padding: 18px 22px 22px 24px;
          mask: linear-gradient(rgb(255, 255, 255) 86%, transparent);
        }
      }
    }

    .btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px 0 32px;

      .detail {
        font-weight: bold;
        text-decoration: underline;
        color: #41C3FF;
        cursor: pointer;
      }

      .claim {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65%;
        height: 48px;
        font-weight: bold;
        background: #2AF1C0;
        border-radius: 24px;
        cursor: pointer;

        &.disabled {
          background: #A5F8E4;
          cursor: auto;
        }
      }
    }
  }
}
</style>