<template>
	<div class="red_package_main">
		 <div	@click="$router.back()">
          <img src="../../assets/icon/arrow_left.png" alt="xxx" title="img" class="image">
        </div>
		<div class="main_content" @scroll="handleScroll($event)" @touchstart="retract">
			<div class="info_box" id="infoBox">
				<div class="package_value" :style="{marginBottom: marginBottom + '%'}">
					<span class="integer" :style="{fontSize: fontSize + 'px'}">{{redPackageValueInteger}}</span>元
				</div>
				<router-link tag="span" to="/" class="package_btn"  :style="{opacity: opacity}">使用红包购物</router-link>
			</div>
			<div class="record_list_box" id="recordListBox" @touchstart.stop="spread">
				<div class="scroller">
					<div class="record_title_box">红包记录</div>
					<ul class="record_list">
						<li class="record_item" v-for="item in redPackageRecord">
							<span class="date">{{item.display_taketime}}</span>
							<div class="amount_box" :class="{cut_down: item.pack_type != 1}">
								<span class="amount">{{item.amount}}</span>
							</div>
							<div class="remark_box">
								<template v-if="item.pack_type == 1">
									<p class="remark">{{item.pack_type_name}}</p>
									<p class="display_expire_date">{{item.display_expire_date}}后过期</p>
								</template>
								<template v-else>
									<p class="remark">{{item.pack_type_name}}</p>
								</template>
							</div>
						</li>
					</ul>
					<div :class="{transparent: !isMore}">
						<div id="pullUp">
							<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import  '../../plugins/iscroll.js';
	export default{
		data(){
			return{
				redPackageValueInteger:0,
				redPackageValueDecimals:0,
				redPackageRecord:[
					{
						display_taketime:"2017/12/13",
						amount:"￥5",
						price:5
						
					},
					{
						display_taketime:"2017/12/11",
						amount:"￥0.3",
						price:0.3
						
					}
				
				]
				
			}
		},
		created(){
			for(var i=0;i<this.redPackageRecord.length;i++){
				
				this.redPackageValueInteger+=this.redPackageRecord[i].price;
			}
			
		}
		
		
	}
	
</script>

<style scoped>
	.red_package_main {
		position: absolute;
		z-index: 2;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
		background: url('../../images/red_package/my_package_bg.jpg') center top repeat-y;
		background-size: 100% auto;
	}

	.main_content {
		height: 100%;
		overflow: auto;
	}

	.info_box {
		text-align: center;
		margin-top: 32%;
	}

	.package_value {
		color: #e47372;
		font-size: 24px;
		margin-bottom: 10%;
	}

	.integer {
		font-size: 90px;
		line-height: 90px;
		transition: font-size .1s;
	}

	.package_btn {
		display: inline-block;
		background: #ef8200;
		color: #fff;
		line-height: 1.2rem;
		border-radius: 1.4rem;
		width: 51%;
	}

	.record_list_box {
		position: relative;
		width: 90%;
		margin: 10% auto 0 auto;
		background: url('../../images/user_index/record_list_line.png') 28% top repeat-y #fff;
		background-size: 1px auto;
		height: 80%;
		overflow: hidden;
	}

	.scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0;
    }

	.record_title_box {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		line-height: 0.966184rem;
		border-bottom: 1px solid #e4e4e3;
		padding: 0 5%;
		box-sizing: border-box;
		background: #fff;
	}

	.record_list {
		padding: 0.966184rem 5% 0 5%;
	}

	.record_item {
		position: relative;
		font-size: 0;
		padding: 0.386473rem 0;
		line-height: 16px;
	}

	.date {
		color: #7f7f7f;
		display: inline-block;
		vertical-align: middle;
		width: 25.55%;
		text-align: left;
		font-size: 11px;
	}

	.amount_box {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		font-size: 11px;
		padding-left: 10px;
	}

	.amount_box:before,
	.amount_box:after {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.amount_box:before {
		left: -3px;
		width: 6px;
		height: 6px;
		border-radius: 5px;
		background: #f7c592;
	}

	.amount_box:after {
		left: 5px;
		height: 20px;
		width: 10px;
		background: url('../../images/user_index/amount_arrow.png') center no-repeat;
		background-size: auto 19px;
	}

	.amount {
		display: inline-block;
		vertical-align: middle;
		background: #e47372;
		color: #fff;
		line-height: 24px;
		border-radius: 24px;
		min-width: 1.207729rem;
		text-align: center;
		padding: 0 10px;
	}

	.amount_box.cut_down .amount {
		background: #b1b1b1;
	}

	.amount_box.cut_down:after {
		background-image: url('../../images/user_index/amount_cut_down_arrow.png')
	}


	.remark_box {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		font-size: 11px;
		text-align: right;
		max-width: 45%;
	}

	.remark {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.display_expire_date {
		color: #7f7f7f;
	}

	.transparent {
		visibility: hidden;
	}

	#pullUp {
		line-height:40px;
		text-align: center;
	}

	.pullUpIcon {
		display: inline-block;
		vertical-align: middle;
		width: 0.386473rem;
		height: 0.386473rem;
		background: url('../../images/common/load_more.gif') center no-repeat;
		background-size: 100% auto;
		margin-right: 0.193237rem;
	}
	.pullUpLabel {
		display: inline-block;
		vertical-align: middle;
	}
</style>
