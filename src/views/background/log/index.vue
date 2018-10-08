<!-- 日志查询 -->
<template>
    <div class="logs">
        <div class="userMenu clearfix">
            <el-form ref="form"
                     :model="form"
                     :inline="true"
                     label-width="40px">
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"
                              style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker type="date"
                                    placeholder="开始日期"
                                    v-model="form.beginTime"
                                    value-format="yyyy-MM-dd"
                                    style="width: 160px;"></el-date-picker>
                    <span style="text-align:center;">-</span>
                    <el-date-picker type="date"
                                    placeholder="结束日期"
                                    v-model="form.endTime"
                                    value-format="yyyy-MM-dd"
                                    style="width: 160px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.flag"
                               style="width:80px;">
                        <el-option label="全部"
                                   value=""></el-option>
                        <el-option label="成功"
                                   value="1"></el-option>
                        <el-option label="失败"
                                   value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="onSubmit">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="usertable">
            <el-table :data="tableData"
                      v-loading="loading"
                      style="width: 100%">
                <el-table-column property="id"
                                 label="ID"
                                 width="60px">
                </el-table-column>
                <el-table-column label="昵称"
                                 width="120px">
                    <template slot-scope="scope">
                        {{scope.row.user.nickname}}
                    </template>
                </el-table-column>
                <el-table-column property="module"
                                 label="模块"
                                 width="120px">
                </el-table-column>
                <el-table-column property="flag"
                                 label="状态"
                                 width="60px"
                                 :formatter="formatStr"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="remark"
                                 label="备注"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="createTime"
                                 label="时间"
                                 width="160px">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination class="fr"
                           @size-change="handleSizeChange"
                           @current-change="handlePageChange"
                           :current-page="pageNum"
                           :page-sizes="[20, 30, 50, 100, 200, 500, 1000, 2000]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { loglist } from '@/service/background/log';
export default {
    components: {},
    name: '',
    data() {
        return {
            loading: false,
            pageNum: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            form: {
                flag: '',
                nickname: '',
                beginTime: '',
                endTime: ''
            }
        };
    },
    computed: {},
    created() {
        this.logList();
    },
    mounted() { },
    methods: {
        onSubmit() {
            this.logList();
        },
        handlePageChange(page) {
            this.pageNum = page;
            this.logList();
        },
        handleSizeChange(size) {
            this.pageSize = size;
            this.logList();
        },
        formatStr(row) {
            return row.flag ? '成功' : '失败';
        },
        async logList() {
            this.loading = true;
            let res = await loglist({
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                params: {
                    ...this.form,
                    orderBy: 'order by createTime desc'
                }
            });
            this.loading = false;
            if (res) {
                this.tableData = res.list;
                this.total = res.recordsTotal;
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.logs {
  background: #fff;
  min-height: 100%;
  padding: 24px;
  .userMenu {
    margin-bottom: 10px;
  }
  .pagination {
    overflow: hidden;
    margin: 20px 0 0;
  }
}
</style>
