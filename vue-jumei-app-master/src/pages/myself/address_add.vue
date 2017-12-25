<template>
	<div class="address_add_main">
		<div	@click="$router.back()">
          <img src="../../images/icon/arrow_left.png" alt="xxx" title="img" class="image">
        </div>
		<div class="info_input_box">
			<span class="info_name">收&nbsp;&nbsp;件&nbsp;&nbsp;人：</span>
			<input type="text" placeholder="请输入收件人名字" v-model="consignee" class="info_input">
		</div>

		<div class="info_input_box">
			<span class="info_name">手机号码：</span>
			<input type="text" placeholder="请输入您的联系方式" v-model="mobile" class="info_input">
		</div>

		<div class="info_input_box">
			<span class="info_name">所在地区：</span>
			<scroller-selector
			:placeholderText="'省-市-区'"
            :scrollerTitle="'选择地址'"
			:scrollValue="distinctAddress"
			:primaryScrollerData="primaryScrollerData"
			:secondryScrollerData="secondryScrollerData"
			:tertiaryScrollerData="tertiaryScrollerData"
            @primaryScrollerEnd="primaryScrollerEnd"
            @secondryScrollerEnd="secondryScrollerEnd"
            @getValue="getValue"></scroller-selector>
		</div>

		<div class="info_input_box">
			<span class="info_name">详细地址：</span>
			<input type="text" placeholder="请输入您的详细地址" v-model="address" class="info_input">
		</div>

		<div class="confirm_btn_box">
            <span class="confirm_btn" @click="submitInfo">完成</span>
        </div>
        <err-tip :errText="errText" :isShowErrTip="isShowErrTip" @hideErrTip="hideErrTip"></err-tip>
	</div>
</template>

<script>
	import scrollerSelector from '../../components/common/scroll_selector.vue';
	import errTip from '../../components/common/err_tip.vue';
	import {city} from "../../api/api.js"

	
	export default {
		data() {
			return {
				data:city.data,
				consignee: '',
				mobile: '',
				distinctAddress: '',
				distinctAddressId: 0,
				address: '',
				primaryIndex: '',
				secondryIndex: '',
				errText: '',
				isShowErrTip: false,
				primaryScrollerData: [],
				primaryMap: {}, // 市区列表数据是根据当前选中的省来对应给出的，此处做一个省级map~将隶属于不同省的市按省的id归类
				secondryScrollerData: [],
				secondryMap: {}, // 市级map~将隶属于不同市的区按省的id归类
				tertiaryScrollerData: []
			}
		},
        methods: {

          
            primaryScrollerEnd(index) {
             
              
               this.primaryMap=this.primaryScrollerData[index]
               this.secondryScrollerData=[];
             	 this.secondryScrollerData.push("","");
               this.init()
            },

            secondryScrollerEnd(index) {
            	this.secondryMap=this.secondryScrollerData[index]
            	console.log(this.secondryMap)
            	
            	this.tertiaryScrollerData=[];
            	this.tertiaryScrollerData.push("","")
            	this.init()
               
            },

            getValue(data) {
                console.log(data)
                this.distinctAddress=data.text
            },

            hideErrTip() {
            	this.isShowErrTip = false;
            },

            validate() {
            	if(this.consignee == '') {
            		this.errText = '请输入收件人';
            	} else if(this.mobile == '') {
            		this.errText = '请输入手机号';
            	} else if(!(/^1[34578]\d{9}$/.test(this.mobile))) {
            		this.errText = '手机号格式错误';
            	} else if(this.distinctAddress == '') {
            		this.errText = '请选择地区';
            	} else if(this.address == '') {
            		this.errText = '请输入地址';
            	} else {
            		return true;
            	}

            	this.isShowErrTip = true;
            	return false;

            },

            submitInfo() {
            	if(this.validate()) {
            			console.log("验证通过")
            			var s=[];
            		let address={consignee:this.consignee,mobile:this.mobile,distinctAddress:this.distinctAddress,address:this.address,IsDefault:1}	
            		if(localStorage.getItem(address)){
            			
            			s.push(JSON.parse(localStorage.getItem(address)))
            			s.push(address)
            			localStorage.setItem("address",JSON.stringify(s))
            		}else{
            			s.push(address)
            			localStorage.setItem("address",JSON.stringify(address))
            		}
            		
            		this.$router.back()
            	}
            },
            init(){
            	
            	this.data.forEach((item) => {
					
					
					if(item.farther_name==this.primaryMap){
						
						
						this.secondryScrollerData.push(item.local_name)	
					}
					if(item.farther_name==this.secondryMap){
						
						
						this.tertiaryScrollerData.push(item.local_name)
						
					}
					
				})
            	
            	
            	
            }
        },

		mounted() {
			//前面填写两个空得
			this.primaryScrollerData.push("","");
			this.data.forEach((item) => {
					
					if(item.parentId==1){
						this.primaryScrollerData.push(item.local_name)
			}
			})
			this.tertiaryScrollerData.push("","")
            	this.primaryMap="北京";
				this.secondryMap="北京";
				this.init()	
		},
		components: {
			scrollerSelector,
			errTip
		}
	}
</script>

<style scoped>
	.address_add_main {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		padding: 0 3%;
		overflow: auto;
	}

	.info_input_box {
		border: 1px solid #efefef;
		border-radius: 4px;
		margin-top: 4%;
		padding: .1rem 2%;
	}

	.info_name {
		display: inline-block;
		vertical-align: middle;
		line-height: 1rem;
	}

	.info_input {
		border: none;
		outline: none;
		height: 1rem;
		width: 70%;
		vertical-align: middle;
	}

	.confirm_btn_box {
        position: fixed;
        bottom: 0;
        left: 0;
        background: orange;
        height: 50px;
        border-radius: 10px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        width: 100%;
    }
</style>

<style>
	.scroll_selector_input {
		border: none;
		outline: none;
		height: 1rem;
		width: 70%;
	}

	.scroll_selector_main {
		display: inline-block;
		vertical-align: middle;
	}
</style>
