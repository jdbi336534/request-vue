<!-- 系统消息提示 -->
<template>
    <div class="bell"
         v-popover:popover>
        <el-badge :value="noticeList.length + newsList.length + todoList.length"
                  :hidden="noticeList.length + newsList.length + todoList.length==0"
                  class="item">
            <i class="fa fa-bell-o bell-icon"
               aria-hidden="true"></i>
        </el-badge>
        <el-popover placement="bottom-end"
                    width="336"
                    popper-class="bell-popver"
                    trigger="click"
                    ref="popover">
            <el-tabs class="bell-tab"
                     v-model="activeName"
                     stretch>
                <el-tab-pane :label="`通知(${noticeList.length})`"
                             name="first">
                    <div v-if="noticeList.length>0"
                         class="list-item"
                         v-for="item in noticeList"
                         :key="item.title">
                        <div class="list-item-mate notice">
                            <div class="list-item-mate-avatar">
                                <span class="avatar-circle">
                                    <img src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                                         alt="">
                                </span>
                            </div>
                            <div class="list-item-mate-content">
                                <h4 class="list-item-mate-title">{{item.title}}</h4>
                                <div class="list-item-mate-discription">
                                    {{item.date}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="notice-clear"
                         v-if="noticeList.length>0"
                         @click="noticeList=[]">
                        清空通知
                    </div>
                    <div class="bell-notfound"
                         v-else>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                             alt="not found">
                        <div>你已查看所有通知</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`消息(${newsList.length})`"
                             name="second">
                    <div class="list-item"
                         v-if="newsList.length>0"
                         v-for="item in newsList"
                         :key="item.title">
                        <div class="list-item-mate notice">
                            <div class="list-item-mate-avatar">
                                <span class="avatar-circle">
                                    <img src="https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg"
                                         alt="">
                                </span>
                            </div>
                            <div class="list-item-mate-content">
                                <h4 class="list-item-mate-title">{{item.title}}</h4>
                                <div class="list-item-mate-discription">
                                    {{item.discription}}
                                </div>
                                <div class="list-item-mate-discription"
                                     style="margin-top:4px;">
                                    {{item.date}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="notice-clear"
                         v-if="newsList.length>0"
                         @click="newsList=[]">
                        清空消息
                    </div>
                    <div class="bell-notfound"
                         v-else>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                             alt="not found">
                        <div>你已查看所有通知</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`待办(${todoList.length})`"
                             name="third">
                    <div class="list-item"
                         v-if="todoList.length>0"
                         v-for="item in todoList"
                         :key="item.title">
                        <div class="list-item-mate">
                            <h4 class="list-item-mate-title">{{item.title}}
                                <el-tag class="list-item-mate-title-status"
                                        size="small"
                                        type="info">{{item.status}}</el-tag>
                            </h4>
                            <div class="list-item-mate-discription">
                                {{item.discription}}
                            </div>
                        </div>
                    </div>
                    <div class="notice-clear"
                         v-if="todoList.length>0"
                         @click="todoList=[]">
                        清空待办
                    </div>
                    <div class="bell-notfound"
                         v-else>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                             alt="not found">
                        <div>你已查看所有通知</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-popover>
    </div>
</template>
<script>
export default {
    components: {},
    name: 'Bell',
    data() {
        return {
            activeName: 'third',
            noticeList: [{
                title: '你收到了14份新周报',
                date: '一年前'
            }],
            newsList: [{
                title: '曲丽丽 评论了你',
                discription: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
                date: '一年前'
            }],
            todoList: [{
                title: '任务名称',
                status: '未开始',
                discription: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务'
            },
            {
                title: '任务名称1',
                status: '已完成',
                discription: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务'
            }]
        };
    },
    computed: {},
    created() { },
    mounted() { },
    methods: {}
};
</script>
<style lang='scss'>
$bell-width: 336px;
.bell {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  font-size: 18px;
  &:hover {
    background: rgb(230, 247, 255);
  }

  .bell-icon {
    display: flex;
  }
}
.bell-popver {
  padding: 5px 0px 0px;
  .bell-tab {
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__nav-wrap {
      padding: 0 16px;
      &:after {
        height: 1px;
        background-color: #e8e8e8;
      }
    }
    .list-item {
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
      padding-top: 12px;
      padding-bottom: 12px;
      transition: all 0.3s;
      overflow: hidden;
      cursor: pointer;
      padding-left: 24px;
      padding-right: 24px;
      .list-item-mate {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .list-item-mate-title {
          width: 100%;
          color: rgba(0, 0, 0, 0.65);
          margin-bottom: 4px;
          font-size: 14px;
          line-height: 22px;
          .list-item-mate-title-status {
            float: right;
          }
        }
        .list-item-mate-avatar {
          margin-right: 16px;
          .avatar-circle {
            background: #fff;
            margin-top: 4px;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            list-style: none;
            display: inline-block;
            text-align: center;
            color: #fff;
            white-space: nowrap;
            position: relative;
            overflow: hidden;
            vertical-align: middle;
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-radius: 16px;
            > img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
        .list-item-mate-content {
          flex: 1;
        }
        .list-item-mate-discription {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.45);
        }
        &.notice {
          flex-direction: row;
        }
      }
    }
    .notice-clear {
      height: 46px;
      line-height: 46px;
      text-align: center;
      color: rgba(0, 0, 0, 0.65);
      border-radius: 0 0 4px 4px;
      //   border-top: 1px solid #e8e8e8;
      transition: all 0.3s;
      cursor: pointer;
    }
    .bell-notfound {
      text-align: center;
      padding: 73px 0 88px 0;
      color: rgba(0, 0, 0, 0.45);
      img {
        display: inline-block;
        margin-bottom: 16px;
        height: 76px;
      }
    }
  }
}
</style>
