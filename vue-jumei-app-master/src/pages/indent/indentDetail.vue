<template lang="html">
  <div class="set-wrapper">
  	<div class="header">
  			<span @click="$router.back()" style="font-size: 0.5rem;color:white;margin-left: 0.5rem;"><</span> <p style="margin-left:3rem;color:white;">订单详情</p>
  	</div>
  		<div class="nav-orange" >
  			<p>{{id}}</p>
  			<img src="../../assets/icon/QQ图片20171208190043_03_01.png" alt="" />
  		</div>
  		<div class="nav">
  			<div class="img1">
  				<img src="../../assets/icon/QQ图片20171208190043_04.png" alt="" />
  			</div>
  			<div>
  				<p class="nav-p1"></p>
  				<p class="nav-p2"></p>
  			</div>
  			
  		</div>
  		<div class="nav2">
				<div class="img1">
  				<img src="../../assets/icon/QQ图片20171208190043_06.png" alt="" />
  			</div>
  			<div>
  			<p class="nav2-p1">收件人:{{i}} <span>{{tel}}</span></p>
  			<p class="nav2-p2">地址:{{address}}</p>
  			</div>
  			
  		</div>
  		
  	<div class="content">
      <ul>
        <li class="li" >
        	<p class="first-content"> {{good.dianpu}}></p>
        	<div class="img">
        		<img :src="good.img" alt=""/>
        	</div>
        	<div class="font">
        		<h5>{{good.good}}</h5>
        		<p>{{good.types}}</p>
        		<span>{{good.info}}</span>
        	</div>
        	<div class="right"> 
        		<p>￥{{good.nowPrice}}</p>
        		<s>￥{{good.oldPrice}}</s>
        	</div>
        </li>
      </ul> 
    </div>
    <div class="huan">
    	<button>卖了换钱</button>
    	<button>申请售后</button>
    </div>
    <section>
    	<div class="img2">
  				<img src="../../assets/icon/QQ图片20171208190043_08.png" alt="" />
  		</div>
    	<div class="yunfei">
    		<h3>运费险</h3>
    		<p>确认收货前退款可里赔</p>
    	</div>
    	<p class="ppp">运费险已失效></p>
    </section>
    <div class="money">
    	<p>保险服务<span>￥0.00</span></p>
    </div>
    <div class="footer">
    	<p style="line-height:0.8rem; margin-right: 3%;">更多</p>
    	<button>查看物流</button>
    	<button>卖了还钱</button>
    	<button>追加评价</button>
    </div>
  </div>
</template>

<script>
//import BScroll from 'better-scroll'
export default {
  data () {
    return {
    	good:null,
   		data:null,
   		id:null,
   		i:null,
   		tel:null,
   		address:null
    }
  },
  created(){
  if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  	//this.id=this.$route.query.id;
  	this.good=this.$route.query.id
	console.log(this.good);
	this.id=this.good.state
	this.i =this.good.customer.name
	this.tel =this.good.customer.tel
	this.address =this.good.customer.address
  },
  methods:{
	getInfo(){
  		
  		
  	}
  },
  components: {
   
  }
}
</script>


<style lang="stylus" type="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  position fixed
  left 0
  top .12rem
  right 0
  height 1.5rem
  width 100%
  overflow hidden
  line-height 1.5rem
  border-1px()
  display flex
  background #FF3100
  justify-content flex-start
  font-size 0.5rem
.is-selected{
	color:#FE4070;
  padding-bottom:.25rem;
  border-bottom:.05rem solid #FE4070;
	}
	section{
		display: flex;
		justify-content: space-between;
	}
	.footer{
		display: flex;
		justify-content: flex-end;
	}
	.footer button{
		width:23%;
		height:5vh;
		background:transparent;
		margin-right: 2vw;
		border-radius: 30px;
		border:1px solid #ccc;
	}
	.money p{
		display: flex;
		justify-content: space-between;
		padding: 2%;
	}
	.img2{
		width:15vw;
		height:12vh;
	}
	.img2 img{
		width:15vw;
		height:12vh;
	}
	.yunfei {
		line-height:0.5rem;
		margin-top: 2vh;
		margin-left: -25%;
	}
	.yunfei p{
		color:#ccc;
	}
	.yunfei h3{
		color:red;
	}
	.ppp{
		line-height:0.8rem;
		margin-top: 2vh;
		margin-right: 3vw;
		font-size: 0.4rem;
		color:orangered;
	}
	.nav{
		width:100%;
		height:13vh;
		border-bottom: 1px solid #ccc;
	}
	.nav-orange{
		display: flex;
		height:3rem;
		color:white;
		justify-content: space-around;
		line-height: 3rem;
		font-size: 0.5rem;
		background:#FF3100;
	}
	.nav-orange img{
		width:45%;
	}
	.nav2{
		width:100%;
		height:13vh;
		border-bottom: 1px solid #ccc;
	}
	.img1{
		float:left;
	}
	.img1 img{
		width:100%;
		height:25vw;
		margin-top: -2vw;
	}
	.nav-p1{
		
		margin-right: 12vw;
		font-size: 0.4rem;
		margin-top: 2vh;
		line-height: 3vh;
		color:#65B25D;
	}
	.nav2-p1{
		margin-left:10vw;
		font-size: 0.4rem;
		margin-top: 2vh;
		line-height: 3vh;
	}
	.nav2-p1 span{
		margin-left: 25vw;
	}
	.nav-p2{
		margin-left: 10vw;
		margin-right: 8vw;
		margin-top: 2vh;
		color:#ccc;
	}
	.nav2-p2{
		margin-left:10vw;	
		margin-top: 2vh;
		font-size: 0.4rem;
		margin-right: 8vw;
		line-height: 3vh;
	}
	.img{
		float:left;
		width:25%;
		height:auto;
	}
	.nav{
		
	}
	.img img{
		width:100%;
		height:12vh;
		margin-left:1vw;
	}
	.content ul li{
		list-style: none;
	}
	
	.first-content{
		display: flex;
		justify-content: space-between;
		margin-left:2vw;
		height:6vh;
		line-height: 6vh;
		font-size: 0.5rem;
	}
	.li{
		height:19vh;
		margin-top: 2vh;
		background: #bbbbbbb;
	}

	.font{
	  float:left;
		width:58%;
		margin-left: 2vw;
	}
	.font h5{
		line-height:0.5rem;
	}
	.font p{
		color:#7E8C8D;
		margin-top: 1vh;
		margin-bottom: 2vh;
	}
	.font span{
		text-decoration: none;
		color:red;
		border:1px solid #ccc;
		border-radius:5px;
	}
	.right{
		width:10%;
		float:right;
	}
	.right s{
		color:#ccc;
	}
	.huan{
		display: flex;
		justify-content: flex-end;
	}
	.huan button{
		width:25%;
		height:5vh;
		background:transparent;
		margin-right: 4vw;
		border-radius: 30px;
		border:1px solid #ccc;
	}
</style>
