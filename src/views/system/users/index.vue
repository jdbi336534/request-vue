<!-- 用户管理 -->
<template>
    <div class="users">
        <div class="userMenu clearfix">
            <el-button class="fl"
                       icon="fa fa-search"></el-button>
            <el-button class="fr"
                       type="primary"
                       icon="fa fa-user-plus"
                       plain> 添加用户</el-button>
            <el-button class="fr"
                       type="primary"
                       icon="fa fa-user-plus"
                       plain> 批量添加</el-button>
        </div>
        <div class="usertable">
            <el-table :data="tableData"
                      highlight-current-row
                      style="width: 100%">
                <el-table-column property="realName"
                                 label="真实姓名">
                </el-table-column>
                <el-table-column property="userName"
                                 label="用户名">
                </el-table-column>
                <el-table-column property="roleName"
                                 label="职位">
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
                                 label="添加日期">
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange"
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
        async userList() {
            let res = await getUserList(this.pageNum, this.pageSize);
            if (res) {
                console.log(res)
                this.tableData = res.list;
                this.total = res.total;
             }
        }
    }
};
</script>
<style lang='scss' scoped>
.users {
  .userMenu {
    margin-bottom: 10px;
  }
  .pagination {
  }
}
</style>
