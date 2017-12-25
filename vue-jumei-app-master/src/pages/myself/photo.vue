<template >
	<section class="">
		
		<video v-show="!img"  ref="video" id="video" :width="w" :height="h"  autoplay="autoplay">
		</video>
		
		<div>
			<div class="left">
        <div	@click="$router.back()">
          <img src="../../images/icon/arrow_left.png" alt="xxx" title="img" class="image">
        </div>
     </div>
				<div v-show="!img" id="take" @click="takePhoto">
					<span class="take-xiao">
					</span>
				</div>
				<div  v-show="img">
					<canvas id="canvas" ref="canvas"  :width="w" :height="h" ></canvas>
					<div id="caozuo">
						<button @click="img=fasle" class="btn">取消</button>
						<button @click="enter()" class="btn">确定</button>
					</div>
					
				</div>
				
		</div>
	</section>
</template>

<script>

import { MessageBox } from 'mint-ui'

export default {
	data(){
			
			return{
				w:"",
				h:"",
				img:false
				
			}
		},
		created() {
			if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    	}
   
			var _this=this;
			 this.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  			this.h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			console.log(this.h )
			if(navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
				//调用用户媒体设备, 访问摄像头
				this.getUserMedia({
					video: {
						width:_this.w,
						height:_this.h
					}
				}, this.success, this.error);
			} else {
				alert('不支持访问用户媒体');
			}

		},
  methods: {
  	enter(){
  		 var imgsrc = document.getElementById('canvas').toDataURL("image/png");
        localStorage.setItem("userImgUrl",imgsrc);
      	this.$router.push('/myself')	
  	},
  	takePhoto(){
  		this.img=true;
  		 var canvas = document.getElementById('canvas');
   	 var context = canvas.getContext('2d');
   	 var video = document.getElementById('video');
  		context.drawImage(video, 0, 0,this.w,this.h-100); 
  	},
   getUserMedia(constraints, success, error) {
				if(navigator.mediaDevices.getUserMedia) {
					//最新的标准API
					navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
				} else if(navigator.webkitGetUserMedia) {
					//webkit核心浏览器
					navigator.webkitGetUserMedia(constraints, success,error)
				} else if(navigator.mozGetUserMedia) {
					//firfox浏览器
					navigator.mozGetUserMedia(constraints, success, error);
				} else if(navigator.getUserMedia) {
					//旧版API
					navigator.getUserMedia(constraints, success,error);
				}
			},

			success(stream) {
				//兼容webkit核心浏览器
				let CompatibleURL = window.URL || window.webkitURL;
				//将视频流设置为video元素的源
				console.log(stream);

				//video.src = CompatibleURL.createObjectURL(stream);
				this.$refs.video.srcObject = stream;
				video.play();
			},

			error(error) {
				console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
			}
  
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus" scoped>
	#video{
		position: absolute;
		top:30px;
		background: #ccc;
		z-index: 1;
		margin: 0;
		padding: 0;
	}
	.left{
		background: #ccc;
		z-index: 99;
	}
	#take{
		z-index: 9999;
		position: fixed;
		top:80%;
		left: 50%;
		transform: translateX(-50%);
		width:80px;
		height: 80px;
		border-radius:50% ;
		background:#ADA7A7;
		text-align: center;
		display: flex;
		box-sizing: border-box;
    justify-content: center;
    align-items:center;
	}
	#canvas{
		position: absolute;
		width:100%;
		height: 100%;
		z-index:5;
	}
	#caozuo{
		z-index: 9999;
		position: fixed;
		top:80%;
    left: 50%;
		transform: translateX(-50%);
	}
	.take-xiao{
		display: block;
		margin: 0 auto;
		width: 70%;
		height: 70% ;
		background: #fff;
		border-radius: 50%;
		line-height: 80px;
	}
	.image{
		transform:rotateZ(-90deg);
	}
	.btn{
		padding-left: 27px;
		padding-right: 27px;
		padding-top: 10px;
		padding-bottom: 10px;
		border: 1px solid #9F35FF;
		color: #fff;
		background: #9F35FF;
		font-size: 16px;
		border-radius: 5px;
	}
</style>
