<template>
 <div class="roadmap">
   <div class="container">
     <div class="header">
       RoadMap
     </div>
     <div class="phase">
       <a-row type="flex" justify="space-between" :gutter="60">
         <a-col :lg="8" :md="24">
           <div class="item line" data-aos="zoom-in" data-aos-duration="800" v-animate="'aos-animate'">
             <div class="title"><span class="text">Phase 1</span></div>
             <div class="desc">
               <p>Create H2O community</p>
               <p>The official website of the H2O community and the release of governance tokensfunction are online</p>
               <p>The airdrop function and whitelist function of the H2O community are online</p>
             </div>
           </div>
         </a-col>
         <a-col :lg="8" :md="24">
           <div class="item" data-aos="zoom-in" data-aos-duration="800" v-animate="'aos-animate'">
             <div class="title"><span class="text">Phase 2</span></div>
             <div class="desc">
               <p>H2O Community Governance Token Listed on Exchange</p>
               <p>H2O community information function launched</p>
               <p>H2O community DAO voting governance function is online</p>
             </div>
           </div>
         </a-col>
         <a-col :lg="8" :md="24">
           <div class="item" data-aos="zoom-in" data-aos-duration="800" v-animate="'aos-animate'">
             <div class="title"><span class="text">Phase 3</span></div>
             <div class="desc">
               <p>The H2O community's own NFT vault is online</p>
               <p>H2O community NFT rental function launched</p>
               <p>Improve the ecological construction of H2O community</p>
             </div>
           </div>
         </a-col>
       </a-row>
     </div>
   </div>
 </div>
</template>

<script>
export default {
name: "RoadMap"
}
</script>

<style scoped lang="less">
  .roadmap {
    padding-top: 110px;
    padding-bottom: 70px;
    .header {
      margin-bottom: 60px;
      font-weight: bold;
      font-size: 30px;
    }
    .phase {
      .item {
        position: relative;
        margin-bottom: 40px;
        padding: 44px 34px 120px;
        border-radius: 20px;
        background: linear-gradient(0deg, rgba(12, 132, 211, 0), rgba(65, 195, 255, .3), rgba(42, 241, 192, .3));
        .title {
          position: relative;
          z-index: 9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          margin-bottom: 30px;
          width: 162px;
          height: 48px;
          background: #FFFFFF;
          border-radius: 24px;
          .text {
            font-size: 18px;
            font-weight: bold;
            color: #0C84D3;
            background: linear-gradient(to right, rgba(35, 199, 203) 0%, rgba(47, 174, 239) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .desc {
          text-align: left;
          font-weight: bold;
          >p {
            position: relative;
            padding-left: 34px;
            &:before {
              content: '';
              position: absolute;
              left: 0;
              top: -3px;
              width: 28px;
              height: 28px;
              background: url("../assets/img/home/dot.png") center no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
  @keyframes line-loading {
    0% {
      opacity: 0;
      width: 0;
    }
    100% {
      opacity: 0.5;
      width: calc(200% + 120px);
    }
  }
  @media (min-width: 992px) {
    .roadmap{
      .phase .item {
        &.line:before {
          content: '';
          position: absolute;
          top: 68px;
          left: 50%;
          width: calc(200% + 120px);
          height: 0;
          border-top: 2px solid #B4CDDC;
          opacity: 0;
          animation: line-loading 1.4s .2s cubic-bezier(0.76, 0.01, 0.21, 1.02) forwards;
        }
      }
    }
  }
</style>