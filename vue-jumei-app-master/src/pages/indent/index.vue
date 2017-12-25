<template lang="html">
	
 <div class="content-wrapper" >

			<header>订单</header>
		<div class="header">
			<ul>
				<li  v-for="(item,index) in navs" @click="changeNav(index)" :class="chooseId==index?'is-selected':''">{{item}}</li>
			</ul>
		</div>

    <div>
		<main class="content" ref="contentWrapper">
					<ul>
			<li  v-show="data.length>0" v-for="(item,index) in data">
            <p class="child-content"> 
            	<span>{{item.dianpu}}</span>
            	<span>{{item.state}}</span>
            </p>
            <div class="container">
            	<div class="container_left"><img :src="item.img"/></div>
            	<div @click="finddetail(item)" class="container_main">
            		<h6>{{item.good}}</h6>
            		<p>{{item.types}}</p>
            		<span>{{item.info}}</span>
            	</div>
            	<div class="container_right">
            			<h6>价格{{item.nowPrice}}</h6>
            		<p>原价<s>{{item.oldPrice}}</s></p>
            		<span >数量x{{item.count}}</span>
            	</div>
            </div>
            <div class="container_bottom">
               <p>共{{item.count}}件商品 合计:￥<span>{{item.count*item.nowPrice}}</span>.00</p>
            </div>
            <div class="footer">
            	<button @click="deletIndent(item.id,index)">删除订单</button>
            </div>
			</li>
		</ul>
		<div v-show="data.length<=0">
			<span id="" style="font-size:1rem;">
   				暂无数据
   			</span>
		</div>
		</main>
		
		</div>
    </div>
   </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      navs: ['全部','待付款','待发货',"待收货","交易成功"],
     chooseId:0,
     result:[],
     data:[]
    }
  },
  created(){
  	this.checkLogin();
//	 this.$nextTick( () => {
//     this._initScroll()
//    })
//	
  	 this.$store.state.selectTab = "订单"
  },
  methods:{
  	deletIndent(id,index){
  		 MessageBox.confirm('你确定删除id是!'+id+"的商品").then((action) => {
         	this.data.splice(index,1)
        })
  		
  	},
  	checkLogin () {
      if (!storage['user']) {
        MessageBox.alert('您尚未登录!').then(action => {
          this.$router.push('/login');
          return;
        })
      }else{
      	this.getInfo();
      	//this._initScroll()
      }
    },
  	finddetail(item){
  		this.$router.push({path:"/indentDetail",query:{id:item}})
  	},
  	_initScroll () {
      this.typeScroll = new BScroll(this.$refs.contentWrapper, {
        click: true,
        probeType: 3
     
      })
    },
  	changeNav(index){
  		this.chooseId=index;
  		this.data=[];
//		for (let i=0;i<this.result.length;i++) {
//			if(this.result[i].state==this.navs[index]){
//				this.data.push(this.result[i])
//			}
//		}
//filter  过滤数组
if(this.navs[index]=="全部"){
	this.data=this.result
}else{
	this.data=this.result.filter((p)=>{
		return p.state==this.navs[index]	
})
}

  	},
  	getInfo(){
  		axios.get("/api/data").then(res=>{
//			console.log(res.data.indent)
  			this.result=res.data.indent;
  			this.data=this.result;
  		})
  		
  	}
  	
  },
  components: {
    
  }
}
</script>


<style lang="stylus" type="stylesheet/stylus" scoped>
.content-wrapper{
		height: 100%;
	}
	ul li {
		list-style: none;
	}
	.set-wrapper{
		 width: 100%;
	}
    header{
    	 width: 100%;
    	 height: 1.2rem;
    	 font-size: .4rem;
    	 background-color: deepskyblue;
    	 text-align: center;
        line-height: 1.2rem;  
        font-weight: bold;
   color: white;
   position: fixed;
   top: 0;
    	z-index: 100;
   
    }
    .header{
    	width:100%;
    	height: 1rem;
    	position: fixed;
    	top:1.2rem;
    	background-color: white;
    	z-index: 100;
    }
    .header ul{
    	 width:100%;
    	 height: 100%;
    	 display: flex;
    	 justify-content: space-around;
    	 border-bottom: 1px solid #eee;

          
    }
    .header ul li{
    	 line-height: 1rem;
    	  font-size: .446667rem;
    	
    }
     .is-selected{
     	  color:#FE4070;
        padding-bottom :.25rem;
        border-bottom: .05rem solid #FE4070;
     }
     main{
       width:100%;
       margin-top: 2.4rem;
     }
     main ul li {
      width: 100%;
      height: 6rem;  
      margin-top: 0.2rem;
     
     }
     main ul li .child-content{
      width: 100%;
      height: 14%;
      display: flex;
      justify-content:space-between;
      align-items: center;
                
     }
     main ul li .child-content span:first-child{
     	  margin-left: 0.3rem;
     }  main ul li .child-content span:last-child{
     	  margin-right: 0.3rem;
     	  color: #FE8B52;
     }
     main ul li .container{
     	width: 100%;
     	height: 50%;
     	display: flex;
     	background-color: #eee;
     	
     }
       main ul li .container .container_left{
       	 width:30%;
       	 padding-top: .2rem;
       }
        main ul li .container .container_left img{
        	width:94%;
        	height: 94%;
        	display: block;
        	transform: translateX(.1rem);
        	        }
       main ul li .container .container_main{
       	margin-top: .2rem;
       	 width:54%;
       }
         main ul li .container .container_main h6{
           line-height:.4rem;
           overflow:hidden; 
text-overflow:ellipsis;
display:-webkit-box; 
-webkit-box-orient:vertical;
-webkit-line-clamp:2; 
         }
         main ul li .container .container_main p{
       	  color: grey;
       	  margin-top: .4rem;
       }
        main ul li .container .container_main span{
        	        display: block;width: 26%;height: .4rem; line-height:.4rem;margin-top: .4rem;color: #E67473;border: 1px solid #E67473;border-radius: .1rem;
        }

       main ul li .container .container_right{
       	 width:16%;
  
       }
     main ul li .container_bottom{
     	height: 18%;
     	     	 display: flex;
       	 align-items: center;
      border: 1px solid #eee;
     }
      main ul li .container_bottom p{
      	transform: translateX(160%);
      }    	
      main ul li .footer{
      	height: 18%;
      	display: flex;
  align-items: center;
       }
        main ul li .footer button{
         border: 1px solid #eee;
         border-radius: .4rem;
         font-size: .2rem;
         width: 20%;
         height: .8rem;
         transform: translateX(380%);
        }
</style>
