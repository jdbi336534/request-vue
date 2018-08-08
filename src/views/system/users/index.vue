<!-- 用户管理 -->
<template>
    <div class="users">
        <div class="userMenu clearfix">
            <el-button class="fl"
                       icon="fa fa-search"></el-button>
            <el-button class="fr"
                       type="primary"
                       icon="fa fa-user-plus"
                       plain
                       @click="$router.push({name:'dcp-users-create', query: {op:'create'}})"> 添加用户</el-button>
        </div>
        <div class="usertable">
            <el-table :data="tableData"
                      style="width: 100%">
                <el-table-column property="id"
                                 label="ID"
                                 width="60px">
                </el-table-column>
                <el-table-column property="realName"
                                 label="真实姓名">
                </el-table-column>
                <el-table-column property="userName"
                                 label="用户名">
                </el-table-column>
                <el-table-column property="roleName"
                                 label="角色">
                </el-table-column>
                <el-table-column property="email"
                                 label="邮箱"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="phoneNumber"
                                 label="手机"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column property="organizationName"
                                 label="机构">
                </el-table-column>
                <el-table-column property="departmentName"
                                 label="部门">
                </el-table-column>
                <el-table-column property="addDate"
                                 label="添加日期"
                                 :formatter="formatDate">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{ name: 'dcp-users-modify', query: { id: scope.row.id ,op:'modify'}, params: scope.row}"
                                     class="operate-btn"
                                     title="编辑用户">
                            <i class="el-icon-edit"></i>
                        </router-link>
                        <a class="operate-btn"
                           title="删除用户">
                            <i class="el-icon-delete"></i>
                        </a>
                    </template>
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
import { getUserList } from '@/service/system/users';
import util from '@/util';
export default {
    components: {},
    name: '',
    data() {
        return {
            pageNum: 1,
            pageSize: 20,
            total: 0,
            tableData: []
        };
    },
    computed: {},
    created() { },
    mounted() {
        this.userList();
    },
    methods: {
        handlePageChange(page) {
            this.pageNum = page;
        },
        handleSizeChange(size) {
            this.pageSize = size;
        },
        formatDate(row) {
            return util.formatDate(row.addDate, 'YYYY-MM-DD');
        },
        async userList() {
            let res = await getUserList(this.pageNum, this.pageSize);
            if (res) {
                this.tableData = res.list;
                this.total = res.total;
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.users {
  background: #fff;
  min-height: 100%;
  padding: 24px;
  .userMenu {
    margin-bottom: 10px;
  }
  .pagination {
    margin: 20px 0 20px;
  }
}
</style>
