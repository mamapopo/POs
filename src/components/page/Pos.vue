<template>
    <div class="pos">
       
           <el-row>
                <el-col :span='7' class="pos-order" id="order-list">
                    <!--我是订单栏-->
                    <el-tabs>
                        <el-tab-pane label='点餐'>
                           <el-table :data="tableData" border  style="width: 100%" >
 
                            <el-table-column prop="goodsName" label="商品"  ></el-table-column>
                            <el-table-column prop="count" label="量" width="50"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                            <el-table-column  label="操作" width="100" fixed="right">
                         <template scope="scope">
                                 <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                 <el-button type="text" size="small">增加</el-button>
 
                         </template>
                    </el-table-column>
                    </el-table>
                    <div class="list-count">
                        <span>合计：{{totalCount}}</span>
                        <span>金额:￥{{totalMoney}}元</span>
                    </div>
                    <div class="btns">
                         <el-button  type='warning'>挂单</el-button>
                    <el-button type='danger' @click="delAllGoods()">删除</el-button>
                    <el-button type='success' @click="checkout()">结账</el-button>
                    </div>
                   
                        </el-tab-pane>
                        <el-tab-pane label='挂单'>
                            挂单
                        </el-tab-pane>
                        <el-tab-pane label='外卖'>
                            外卖
                        </el-tab-pane>

                    </el-tabs>
                </el-col>
                <el-col :span='17'>
                    <!--我是产品栏-->
                    <div class="often-good">
                        <div class="title">人气美食</div>
                        <div class="often-goods-list">
                            <ul>
                               <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                                  <span>{{goods.goodsName}}</span>
                                  <span class="o-price">￥{{goods.price}}元</span>
                               </li>
                               
                                
                            </ul>
                        </div>
                        <div class="foods-list">
                            <el-tabs>
                                <el-tab-pane label='汉堡'>
                                    <ul class="cooklist">

                                        <li v-for="food in type0Goods" @click="addOrderList(food)">
                                             <span class="foodImg">
                                                <img :src=food.goodsImg width="100%"/>
                                            </span>
                                            <span class="foodName">{{food.goodsName}}</span>
                                            <span class="foodPrice">￥{{food.price}}元</span>

                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label='小食'>
                                   <ul class="cooklist">

                                        <li v-for="food in type1Goods" @click="addOrderList(goods)">
                                             <span class="foodImg">
                                                <img :src=food.goodsImg width="100%"/>
                                            </span>
                                            <span class="foodName">{{food.goodsName}}</span>
                                            <span class="foodPrice">￥{{food.price}}元</span>

                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label='饮料'>
                                     <ul class="cooklist">

                                        <li v-for="food in type2Goods" @click="addOrderList(goods)">
                                             <span class="foodImg">
                                                <img :src=food.goodsImg width="100%"/>
                                            </span>
                                            <span class="foodName">{{food.goodsName}}</span>
                                            <span class="foodPrice">￥{{food.price}}元</span>

                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label='套餐'>
                                     <ul class="cooklist">

                                        <li v-for="food in type3Goods" @click="addOrderList(goods)">
                                             <span class="foodImg">
                                                <img :src=food.goodsImg width="100%"/>
                                            </span>
                                            <span class="foodName">{{food.goodsName}}</span>
                                            <span class="foodPrice">￥{{food.price}}元</span>

                                        </li>
                                    </ul>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                   </div>
                </el-col>
           </el-row>
       
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        name:'pos',
        data(){
            return{
                totalCount:0,
                totalMoney:0,
                tableData:[],
                oftenGoods:[],
                type0Goods:[],
                type1Goods:[],
                type2Goods:[],
                type3Goods:[]
            }
        },
        created:function(){
            axios.get('http://jspang.com/DemoApi/oftenGoods.php')//获取后台数据地址
            .then(Response=>{
                console.log(Response);
                this.oftenGoods=Response.data;
            })
            .catch(error=>{
                console.log(error);
                alert('网络错误，不能访问')
            }),
            axios.get('http://jspang.com/DemoApi/typeGoods.php')
            .then(Response=>{
                console.log(Response);
                this.type0Goods=Response.data[0];
                this.type1Goods=Response.data[1];
                this.type2Goods=Response.data[2];
                this.type3Goods=Response.data[3];
            })
            .catch(error=>{
                console.log(error);
                alert('网络错误，不能访问')
            }

            )
        },
        mounted:function(){
            var orderHeight=document.body.clientHeight;
            // console.log(orderHeight);
            document.getElementById('order-list').style.height=orderHeight+'px';
            // console.log(orderHeight);
        },
        methods:{
            
            getAllMoney(){
                this.totalCount=0;
                this.totalMoney=0;
                if(this.tableData){
                     this.tableData.forEach((element) => {
                this.totalCount+=element.count;
                this.totalMoney=this.totalMoney+(element.price*element.count);   
            })
                }
            },
            addOrderList(goods){
                //商品是否已经在列表中
               this.totalCount=0;
               this.totalMoney=0;
               let isHave=false;
               for(let i=0;i<this.tableData.length;i++){
                   console.log(this.tableData[i].goodsId);
                   if(this.tableData[i].goodsId==goods.goodsId){
                       isHave=true;
                   }
               }
               if(isHave){
                   let arr=this.tableData.filter(o =>o.goodsId == goods.goodsId);
                   arr[0].count++;
               }else{
                   let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
                 this.tableData.push(newGoods);//将新对象压入数组
               }
               this.getAllMoney();//更新合计  使用时要加this啊，不然用不来
              },
            delSingleGoods(goods){
                if(goods.count==1){
                    this.tableData=this.tableData.filter(o=>o.goodsId!=goods.goodsId);
                }else{
                    goods.count-=1;
                   
                }
                this.getAllMoney();
            },
            delAllGoods(){
                this.tableData=[];
                this.totalCount=0;
                this.totalMoney=0;
            },
            checkout(){
                if(this.totalCount!=0){
                    this.tableData=[];
                    this.totalCount=0;
                    this.totalMoney=0;
                    this.$message({
                        message:'结账成功',
                        type:'success'
                    });
                }else{
                    this.$message.error('不能空结');
                }
            }
            
        }
        
    }
</script>
<style scoped>
    /*scoped局部样式，只在模版中使用*/
    .pos-order{
        background-color: #f9fafc;
        border-right: 1px solid #c0ccda;
    }
    .btns{
        margin-top: 40px;
    }
    .title{
        height: 20px;
        border-bottom: 1px solid #d3dce6;
        background-color: #f9fafc;
        padding: 10px;
    }
    .often-goods-list ul li{
        cursor: pointer;
        list-style: none;
        float: left;
        border: 1px solid #e5e9f2;
        padding: 10px;
        margin: 5px;
        background-color: #fff;
    }
    .o-price{
        color:#58b7ff;
    }
    .foods-list{
        clear: both;
    }
    .cooklist li{
         cursor: pointer;
        list-style: none;
        width: 23%;
        border: 1px solid #e5e9f2;
        height: auto;
        background: #fff;
        padding: 2px;
        float: left;
        margin: 2px;
    }
    .cooklist li span{
        display: inline-block;
        float: left;
    }
    .foodImg{
        width: 40%;
    }
    .foodName{
        font-size: 18px;
        padding-left: 10px;
        color: brown;
    }
    .foodPrice{
        font-size: 13px;
        padding-left: 10px;
        padding-top: 10px;
    }
    .list-count{
        border: 1px solid rgb(223, 230, 236);
        background-color: rgb(238, 241, 246);
        height: 40px;
        text-align: center;
        
    }
    .list-count span{
        line-height: 40px;
        margin: 10px;
    }
</style>
