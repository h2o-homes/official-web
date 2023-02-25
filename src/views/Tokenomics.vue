<template>
  <div class="tokenomics">
    <div class="container">
      <div class="icon" data-aos="zoom-in" data-aos-duration="800" v-animate="'aos-animate'"><img src="../assets/img/home/h2o-icon.png" alt=""></div>
      <div class="name" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Token Name : H2O</div>
      <div data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
        <div class="contract">Contract Address (BSC):</div>
        <div class="address">0xAF3287cAe99C982586c07401C0d911Bf7De6CD82</div>
      </div>
      <a-row class="graph">
        <a-col :lg="12" :md="12" :sm="24" class="img">
          <img src="../assets/img/home/chart.png" alt="">
        </a-col>
        <a-col flex="270px" class="data">
          <div class="title">Total: 1000000000</div>
          <div class="percent">
            <p>Community operations: <span style="color: #2BC4E0">20</span><b>%</b></p>
            <p>Core development: <span style="color: #FFF">10</span><b>%</b></p>
            <p>Early contributors: <span style="color: #AAF9E6">10</span><b>%</b></p>
            <p>Ecological construction: <span style="color: #1FD4A7">20</span><b>%</b></p>
            <p>Community treasury: <span style="color: #2AF1C0">40</span><b>%</b></p>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tokenomics"
}
</script>

<style scoped lang="less">
  .tokenomics {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 110px 0;
    .icon {
      margin: 0 auto;
      margin-bottom: 34px;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      box-shadow: -8px 12px 46px 5px rgba(255, 255, 255, 0.27);
      >img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 38px;
      font-size: 24px;
      font-weight: bold;
      &:before {
        content: '';
        margin-right: 14px;
        display: inline-block;
        width: 18px;
        height: 25px;
        background: url("../assets/img/home/waterd.png") center no-repeat;
        background-size: 100%;
      }
    }
    .contract {
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: bold;
      color: #2AF1C0;
    }
    .address {
      font-size: 24px;
      font-weight: bold;
      word-break: break-all;
    }
    .graph {
      display: flex;
      justify-content: space-around;
      align-items: center;
      max-width: 1140px;
      margin: 0 auto;
      margin-top: 100px;
      .img {
        margin-bottom: 40px;
        max-width: 490px;
        >img {
          width: 100%;
        }
      }
      .data {
        margin-bottom: 40px;
        text-align: left;
        .title {
          padding: 16px 0;
          font-weight: bold;
          font-size: 18px;
          border-bottom: 1px solid #fff;
        }
        .percent {
          padding-top: 42px;
          p {
            >span {
              font-weight: bold;
              font-size: 18px;
            }
            >b {
              font-weight: bold;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
</style>