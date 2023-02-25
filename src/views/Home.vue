<template>
  <div class="home">
    <section class="banner">
      <div class="container">
        <div class="inner">
          <h2 class="header"><img src="../assets/img/home/happy-help-open.png" alt=""></h2>
          <p class="desc">The first decentralized traffic distribution platform that provides community members with the latest blockchain industry information and industry benefits.</p>
            <a-dropdown placement="bottomCenter" class="h-dropdown">
                <div class="get-token"></div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="Kucoin" class="link">
                            <a href="https://www.kucoin.com/trade/H2O-USDT" target="_blank">
                                <img src="../assets/img/contact/kucoin.png" alt="" class="icon">Kucoin
                            </a>
                        </a-menu-item>
                        <a-menu-item key="Huobi" class="link">
                            <a href="https://www.huobi.com/en-us/exchange/h2o_usdt" target="_blank">
                                <img src="../assets/img/contact/huobi.jpg" alt="" class="icon" style="transform: scale(1.4);">Huobi
                            </a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <div class="water-container">
          <span class="water3"></span>
          <span class="water1"></span>
          <span class="water2"></span>
          <span class="water4"></span>
          <span class="water5"></span>
        </div>
      </div>
    </section>
    <div class="wave-container">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.4)"></use>
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.2)"></use>
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.1)"></use>
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
        </g>
      </svg>
      <div class="line"></div>
      <svg class="waves waves2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.4)"></use>
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.2)"></use>
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.1)"></use>
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
        </g>
      </svg>
<!--      <div class="wave-img">-->
<!--      </div>-->
    </div>
    <div class="container">
      <section class="features">
        <a-row type="flex" justify="space-between">
          <a-col :lg="8" :md="8" :xs="24">
            <div class="item">
              <div class="img" data-aos="zoom-in" data-aos-duration="800" v-animate="'aos-animate'">
                <img src="../assets/img/home/feature1.png" alt="">
              </div>
              <div class="desc" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Aggregate the community and distribute benefits for users: early testing opportunities for community-based products, project token rewards, whitelisting and other participation mechanisms</div>
            </div>
          </a-col>
          <a-col :lg="8" :md="8" :xs="24">
            <div class="item">
              <div class="img" data-aos="zoom-in" data-aos-duration="800" v-animate="'aos-animate'">
                <img src="../assets/img/home/feature2.png" alt="">
              </div>
              <div class="desc" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Launchpad: Aggregate selected assets from the community and provide them with the best resource support in the industry</div>
            </div>
          </a-col>
          <a-col :lg="8" :md="8" :xs="24">
            <div class="item" data-aos="zoom-in" data-aos-duration="800" v-animate="'aos-animate'">
              <div class="img">
                <img src="../assets/img/home/feature3.png" alt="">
              </div>
              <div class="desc" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Diversified community products: including game guilds, trading communities, public testing products, etc.</div>
            </div>
          </a-col>
        </a-row>
      </section>
      <section class="help">
        <div class="desc" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
          <span class="quote-left"></span>Help community members enjoy industry
          development dividends in the process of blockchain industry development,
          spread the spirit of decentralization, and shape brand value <span class="quote-right"></span>
        </div>
        <img src="../assets/img/home/help.png" alt="" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
      </section>
      <section class="advantage">
        <div class="row" style="margin-bottom: 90px;">
          <div class="desc">
            <p class="title" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Information</p>
            <p data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
              The blockchain industry is developing rapidly, daily information dynamics emerge in an endless stream, and hot spots are changing rapidly.
            </p>
            <p data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
              The H2O community will provide all members with the latest and hottest industry information.
            </p>
          </div>
          <div class="img" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
            <img src="../assets/img/home/advantage1.png" alt="">
          </div>
        </div>
        <div class="row" style="margin-bottom: 110px;">
          <div class="img" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
            <img src="../assets/img/home/advantage2.png" alt="">
          </div>
          <div class="desc">
            <p class="title" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Welfare</p>
            <p data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">There are many new projects in the industry, and the lack of popularity of early projects makes it difficult for users to discover.</p>
            <p data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">H2O will provide community members with many benefits such as token airdrops and whitelisting.</p>
          </div>
        </div>
        <div class="row">
          <div class="desc">
            <p class="title" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Traffic and Fundraising</p>
            <p data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">The H2O community has many fans and users, and the project party can gain traffic and exposure in the community. At the same time, excellent early-stage projects can also obtain fundraising channels in the community</p>
          </div>
          <div class="img" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
            <img src="../assets/img/home/advantage3.png" alt="">
          </div>
        </div>
      </section>
      <section class="token">
        <div class="header" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">Token Usage</div>
        <div class="inner" data-aos="fade-up" data-aos-duration="800" v-animate="'aos-animate'">
          <img src="../assets/img/home/h2o-icon.png" alt="" class="icon">
          <div class="item welfale" data-aos="fade-in-right" data-aos-duration="800" data-aos-delay="800" v-animate="'aos-animate'">
            <span class="line"></span>
            <div class="content">
              <div class="title"><span class="line1"></span><span class="line2"></span>Welfare</div>
              <div class="desc">
                  H2O holders can get industry information,
                  token airdrops for third-party cooperation projects,
                  and project whitelisting.
              </div>
            </div>
          </div>
          <div class="item governance" data-aos="fade-in-left" data-aos-duration="800" data-aos-delay="800" v-animate="'aos-animate'">
            <div class="content">
              <div class="title"><span class="line1"></span><span class="line2"></span>Governance</div>
              <div class="desc">
                H2O is the governance token of the H2O platform.<br>
                Community members can
                adjust and modify the relevant
                benefits and rights of the
                H2O platform by voting.
              </div>
            </div>
          </div>
          <div class="item dividend" data-aos="fade-in-right" data-aos-duration="800" data-aos-delay="800" v-animate="'aos-animate'">
            <div class="content">
              <div class="title"><span class="line1"></span><span class="line2"></span>Right</div>
              <div class="desc">
                  H2O can be used to obtain priority
                  casting/participation rights for third-party
                  cooperation NFT projects.
              </div>
            </div>
          </div>
        </div>
      </section>
<!--      <section class="partner">-->
<!--        <div class="header">Partner</div>-->
<!--      </section>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      dailyRecruitLimit: ''
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .wave-container {
    display: flex;
    flex-direction: column;
    margin-top: -18vh;
    position: relative;
    height: 38vh;
    @keyframes move-forever {
      0% {
        transform: translate3d(-90px,0,0);
      }
      100% {
        transform: translate3d(85px,0,0);
      }
    }
    @keyframes wave {
      0% {
        background-position: 0;
      }

      100% {
        background-position: 100vw;
      }
    }
    .waves {
      flex: 1;
      position: relative;
      width: 100%;
      //height: 50%;
      margin-bottom: -7px;
      min-height: 120px;
      max-height: 150px;
    }
    .line {
      width: 100%;
      height: 8vh;
      background-color: #fff;
    }
    .parallax > use {
      animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
    }
    .parallax > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }
    .parallax > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }
    .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
    .parallax > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
    .waves2 {
      transform: rotateX(180deg);
      .parallax > use:nth-child(1) {
        animation-delay: 0s;
        animation-duration: 7s;
      }
      .parallax > use:nth-child(2) {
        animation-delay: -6s;
        animation-duration: 10s;
      }
      .parallax > use:nth-child(3) {
        animation-delay: -7s;
        animation-duration: 13s;
      }
      .parallax > use:nth-child(4) {
        animation-delay: 0s;
        animation-duration: 20s;
      }
    }
  }
  .banner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - @nav-height);
    min-height: 680px;
    .container {
      position: relative;
      .water-container {
        position: absolute;
        width: 206px;
        height: 306px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        &:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 294px;
          display: inline-block;
          width: 212px;
          height: 38px;
          z-index: 10;
          background: url("../assets/img/home/spontaneous-organization.png") center no-repeat;
          background-size: 100% 100%;
        }
        >span {
          position: absolute;
          left: 0;
          animation: bounce-down 5s ease infinite;
        }
        .water1 {
          width: 206px;
          height: 306px;
          background: url("../assets/img/home/water1.png") center no-repeat;
          background-size: 100% 100%;
          bottom: 118px;
        }
        .water2 {
          width: 72px;
          height: 105px;
          background: url("../assets/img/home/water2.png") center no-repeat;
          background-size: 100% 100%;
          bottom: 200px;
          margin-left: -28px;
          animation-delay: 0.8s;
        }
        .water3 {
          width: 144px;
          height: 213px;
          background: url("../assets/img/home/water3.png") center no-repeat;
          background-size: 100% 100%;
          bottom: 132px;
          margin-left: -2px;
          animation-delay: 1.6s;
        }
        .water4 {
          width: 150px;
          height: 222px;
          background: url("../assets/img/home/water4.png") center no-repeat;
          background-size: 100% 100%;
          bottom: 60px;
          margin-left: 80px;
          animation-delay: 2.4s;
        }
        .water5 {
          width: 50px;
          height: 74px;
          background: url("../assets/img/home/water5.png") center no-repeat;
          background-size: 100% 100%;
          bottom: 96px;
          margin-left: 24px;
          animation: bounce-down 4s ease infinite;
        }
      }
      .inner {
        position: relative;
        z-index: 1;
      }
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -110px;
        transform: translatex(-170px);
        width: 368px;
        height: 90px;
        background: url("../assets/img/home/ripple.png") center no-repeat;
        background-size: 100% 100%;
      }
    }

    .header {
      margin: 0 auto;
      margin-bottom: 28px;
      >img {
        max-width: 100%;
        width: 525px;
      }
    }

    .desc {
      margin: 0 auto;
      margin-bottom: 24px;
      max-width: 100%;
      width: 560px;
      font-size: 18px;
    }

    .get-token {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 250px;
      height: 64px;
      border-radius: 32px;
      cursor: pointer;
      background: url("../assets/img/home/get-token.png") center no-repeat;
      background-size: 116px 16px;
      //background-color: #FFFFFF;
      background-color: rgba(255,255,255,.8);
        transition: background-color .2s cubic-bezier(.445,.05,.55,.95);
      &:hover {
        background-color: rgb(255,255,255);
      }
    }
  }

  //.wave-container {
  //  margin-top: -200px;
  //  width: 100%;
  //  height: 424px;
  //  background: url("../assets/img/home/waver.png") center no-repeat;
  //  background-size: cover;
  //}
  .features {
    padding-top: 60px;
    margin-bottom: 100px;
    .item {
      margin: 0 auto;
      width: 298px;
      .img {
        margin: 4px;
        margin-bottom: 30px;
        border-radius: 50%;
        overflow: hidden;

        > img {
          width: 100%;
          height: 100%;
        }
      }

      .desc {
        margin-bottom: 30px;
        font-size: 18px;
      }
    }
  }

  .help {
    margin: 0 auto;
    margin-bottom: 186px;
    max-width: 100%;
    width: 922px;
    .desc {
      margin-bottom: 56px;
      padding: 0 42px;
      font-size: 24px;
      .quote-left {
        display: inline-block;
        margin-right: 40px;
        width: 36px;
        height: 28px;
        background: url("../assets/img/home/quote-left.png") center no-repeat;
        background-size: contain;
      }
      .quote-right {
        display: inline-block;
        margin-left: 40px;
        width: 36px;
        height: 28px;
        background: url("../assets/img/home/quote-right.png") center no-repeat;
        background-size: contain;
      }
    }

    > img {
      border-radius: 10px;
      width: 100%;
    }
  }

  .token {
    margin-bottom: 126px;
    .header {
      margin-bottom: 76px;
      font-weight: bold;
      font-size: 30px;
    }
    .inner {
      .item {
        .content {
          width: 260px;
          text-align: left;
          .title {
            display: flex;
            margin-bottom: 16px;
            &:before {
              content: '';
              display: inline-block;
              margin-right: 15px;
              width: 18px;
              height: 25px;
              background: url("../assets/img/home/waterd.png") center no-repeat;
              background-size: 100% 100%;
            }
            font-size: 18px;
            color: #B4FFD3;
          }
        }
        &.welfale {
          .content {
            width: 260px;
            text-align: left;
            .title {
              color: #B4FFD3;
            }
          }
        }
        &.governance {
          .content {
            .title {
              color: #66CEFA;
            }
          }
        }
        &.dividend {
          .content {
            .title {
              color: #2AF1C0;
            }
          }
        }
      }
    }
  }

  .partner {
    margin-bottom: 60px;
    .header {
      margin-bottom: 42px;
      font-weight: bold;
      font-size: 30px;
    }
  }

  .advantage {
    margin-bottom: 150px;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      text-align: left;
      font-size: 18px;
      .desc {
        width: 516px;
        max-width: 48%;
        .title {
          font-size: 30px;
          font-weight: bold;
        }
      }
      .img {
        max-width: 48%;
        width: 516px;
        border-radius: 10px;
        overflow: hidden;
        >img {
          width: 100%;
        }
      }
    }
  }
}

@keyframes wave-reverse {
  0% {
    background-position: 100vw;
  }
  100% {
    background-position: 0;
  }
}

@keyframes wave {
  0% {
    background-position: 0;
  }

  100% {
    background-position: 100vw;
  }
}

@media (max-width: 768px) {
  .home {
    .advantage {
      .row {
        .desc, .img {
          width: 100%;
          max-width: 100%;
        }
      }
    }
  }
}

@media (min-width: 992px) {
  .home {
    .token {
      .inner {
        position: relative;
        margin: 0 auto;
        padding: 50px 0 105px;
        max-width: 1024px;
        font-weight: bold;
        .icon {
          position: relative;
          width: 250px;
          height: 250px;
          background: #FFFFFF;
          box-shadow: -8px 12px 46px 5px rgba(255, 255, 255, 0.27);
          border-radius: 125px;
          z-index: 1;
        }
        .item {
          .line1 {
            position: absolute;
            left: -100px;
            top: 14px;
            display: inline-block;
            width: 80px;
            height: 0;
            border-top: 1px solid #fff;
          }
          .line2 {
            position: absolute;
            left: -100px;
            top: 14px;
            display: inline-block;
            width: 70px;
            height: 0;
            border-top: 1px solid #fff;
            transform: rotate(135deg);
            transform-origin: left;
          }
        }
        .welfale {
          position: absolute;
          top: 0;
          right: 0;
          .content {
            width: 260px;
            text-align: left;
          }
        }
        .governance {
          position: absolute;
          top: 90px;
          left: 50px;
          .line1 {
            left: 180px;
          }
          .line2 {
            left: 190px;
            transform-origin: right;
            transform: rotate(220deg);
          }
        }
        .dividend {
          position: absolute;
          bottom: 0;
          right: 0;
          .line2 {
            width: 60px;
            transform: rotate(220deg);
          }
        }
      }
    }
  }
}
@media (max-width: 992px) {
  .home {
    .features {
      .item {
        width: 220px;
      }
    }
    .token {
      .inner {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;
        >img {
          display: none;
        }
        .item {
          margin-bottom: 40px;
        }
      }
    }
  }
}
</style>
