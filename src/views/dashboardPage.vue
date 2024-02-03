<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <el-avatar :size="120" :src="imgurl" />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2022-10-01</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>东莞</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height: 252px">
          <template #header>
            <div class="clearfix">
              <span>语言详情</span>
            </div>
          </template>
          Vue
          <el-progress :percentage="79.4" color="#42b983"></el-progress>
          TypeScript
          <el-progress :percentage="14" color="#f1e05a"></el-progress>
          CSS
          <el-progress :percentage="5.6"></el-progress>
          HTML
          <el-progress :percentage="1" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <el-icon class="grid-con-icon">
                  <User />
                </el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <el-icon class="grid-con-icon">
                  <ChatDotRound />
                </el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <el-icon class="grid-con-icon">
                  <Goods />
                </el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>商品数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height: 403px">
          <template #header>
            <div class="clearfix">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" text>添加</el-button>
            </div>
          </template>

          <el-table :show-header="false" :data="todoList" style="width: 100%">
            <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <div class="todo-item" :class="{
                  'todo-item-del': scope.row.status
                }">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="container" :style="{ width: '100%', height: '420px' }" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="line" :style="{ width: '100%', height: '420px' }" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="dashboard">
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue';
import imgurl from '@/assets/imgs/img.jpg'



const name = localStorage.getItem('ms_username')
const role: string = name === 'admin' ? '超级管理员' : '普通用户'
const option1 = reactive({
  title: {
    text: '本周各品类销售图',
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['家电', '百货', '食品']
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      // prettier-ignore
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '百货',
      type: 'bar',
      data: [
        32.6, 20.0, 23.2, 25.6, 76.7, 135.6, 162.2
      ],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: '食品',
      type: 'bar',
      data: [
        22.6, 24.0, 33.2, 45.6, 66.7, 115.6, 132.2
      ],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: '家电',
      type: 'bar',
      data: [
        48.7, 18.8, 26.4, 28.7, 70.7, 175.6, 182.2,
      ],
      markPoint: {
        data: [
          { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    }
  ]
})

const option2 = reactive({
  title: {
    text: '最近半年各品类销售趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['家电', '百货', '食品']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '家电',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '百货',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '食品',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
  ]
})

const initBar = () => {
  let echart = echarts
  let chart = echart.init(document.getElementById('container'))
  chart.setOption(option1)
}

const initLine = () => {
  let echart = echarts
  let line = echart.init(document.getElementById('line'))
  line.setOption(option2)
}

onMounted(() => {
  initBar()
  initLine()
})
const todoList = reactive([
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: true
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: true
  }
]);


</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>