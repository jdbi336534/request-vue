<!-- 添加用户页面 -->
<template>
    <div class="addUser">
        <el-card class="box-card">
            <div slot="header"
                 v-if="$route.query.op==='create'"
                 class="clearfix">
                <i class="fa fa-user-plus"
                   aria-hidden="true"></i>
                <span>新增用户</span>
            </div>
            <div slot="header"
                 v-else
                 class="clearfix">
                <i class="fa fa-user-times"
                   aria-hidden="true"></i>
                <span>编辑用户</span>
            </div>
            <el-form :model="form"
                     :rules="rules"
                     ref="userForm"
                     label-width="120px"
                     class="users-ruleForm">
                <el-form-item label="用户名"
                              prop="userName">
                    <el-input v-model="form.userName"
                              auto-complete="off"
                              placeholder="2-60位中英文数字"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名"
                              prop="realName">
                    <el-input v-model="form.realName"
                              auto-complete="off"
                              placeholder="2-18位中文或英文"></el-input>
                </el-form-item>
                <el-form-item label="密码"
                              prop="password">
                    <el-input type="password"
                              v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="重复密码"
                              prop="repassword">
                    <el-input type="password"
                              v-model="form.repassword"></el-input>
                </el-form-item>
                <el-form-item label="所属机构"
                              prop="organizationId">
                    <el-select v-model="form.organizationId"
                               filterable
                               placeholder="请选择"
                               size="small"
                               @change="changessjg"
                               style="width: 100%;">
                        <el-option :key="i"
                                   v-for="(item, i) in optionsorgs"
                                   :label="item.label"
                                   :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <transition name="el-zoom-in-top">
                    <el-form-item label="所属部门"
                                  prop="departmentId"
                                  v-show="form.organizationId">
                        <el-select v-model="form.departmentId"
                                   filterable
                                   placeholder="请选择"
                                   size="small"
                                   style="width: 100%;">
                            <el-option :key="i"
                                       v-for="(item, i) in optionsssbm"
                                       :label="item.label"
                                       :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                </transition>
                <el-form-item label="角色"
                              prop="roleId">
                    <el-select v-model="form.roleId"
                               filterable
                               placeholder="请选择"
                               size="small"
                               style="width: 100%;">
                        <el-option :key="i"
                                   v-for="(item, i) in rolesdataList"
                                   :label="item.label"
                                   :value="item.value"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱"
                              prop="email">
                    <el-input v-model="form.email"
                              auto-complete="off"
                              placeholder="xx@xx.xx"></el-input>
                </el-form-item>
                <el-form-item label="电话号码"
                              prop="phoneNumber">
                    <el-input size="small"
                              v-model="form.phoneNumber"
                              auto-complete="off"
                              placeholder="手机或座机"></el-input>
                </el-form-item>
                <el-form-item label="备注"
                              prop="describeText">
                    <el-input type="textarea"
                              v-model="form.describeText"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               :loading="loading"
                               @click="submitForm('userForm')">保存</el-button>
                    <el-button @click="$router.push({name:'dcp-users'})">返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { getDepartment, getListOfRole, saveUserInfo, modifyUserInfo, getUserInfoById } from '@/service/system/users';
export default {
    components: {},
    name: '',
    data() {
        let validateuserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                let text = temp.replace(/[^x00-xff]/g, '**').length;
                if (/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(value) !== true) {
                    callback(new Error('用户名只能为中英文或数字!'));
                } else if (text < 2 || text > 60) {
                    callback(new Error('用户名只能在2-60个字符之间!'));
                } else {
                    callback();
                }
            }
        };
        let validatepassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (!/^(\w){6,20}$/.test(value)) {
                    callback(new Error('只能输入6-20个字母、数字、下划线 !'));
                } else {
                    if (this.form.repassword !== '') {
                        this.$refs.userForm.validateField('repassword');
                    }
                    callback();
                }
            }
        };
        let validateRepassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else {
                if (!/^(\w){6,20}$/.test(value)) {
                    callback(new Error('只能输入6-20个字母、数字、下划线 !'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
        };
        let validatephoneNumber = (rule, value, callback) => {
            let temp = value.replace(/(^\s*)|(\s*$)/g, '');
            if (value === '' && temp.length === 0) {
                callback(new Error('请输入电话号码'));
            } else {
                if (
                    !/(^0\d{2,3}-?\d{7,8}$)|(^1(3|4|5|7|8)\d{9}$)/.test(value)
                ) {
                    callback(new Error('请输入正确的电话号码!'));
                } else {
                    callback();
                }
            }
        };
        let validaterealNamer = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入真实姓名!'));
            } else {
                if (
                    !/(^[a-zA-Z \s]{2,18}$)|(^[\u4e00-\u9fa5 ]{2,20}$)/.test(
                        value
                    )
                ) {
                    callback(new Error('真实姓名只能为2-18位中文或英文!'));
                } else {
                    callback();
                }
            }
        };
        return {
            event: {
                'create': this.createUser,
                'modify': this.editUser
            },
            loading: false,
            optionsssbm: [], // 所属部门
            optionsorgs: [], // 所属机构
            rolesdataList: [], // 角色
            form: {
                userName: '',
                password: '',
                repassword: '',
                phoneNumber: '',
                email: '',
                organizationId: '', // 所属机构id
                departmentId: '', // 所属部门id
                realName: '',
                roleId: '',
                describeText: '',
                id: null
            },
            rules: {
                userName: [
                    {
                        required: true,
                        validator: validateuserName,
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        validator: validatepassword,
                        trigger: 'blur'
                    }
                ],
                repassword: [
                    {
                        required: true,
                        validator: validateRepassword,
                        trigger: 'blur'
                    }
                ],
                phoneNumber: [
                    {
                        required: true,
                        validator: validatephoneNumber,
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        type: 'email',
                        message: '请填写邮箱',
                        trigger: 'blur'
                    }
                ],
                realName: [
                    {
                        required: true,
                        validator: validaterealNamer,
                        trigger: 'blur'
                    }
                ],
                organizationId: [
                    {
                        required: true,
                        message: '请选择所属机构',
                        trigger: 'change'
                    }
                ],
                departmentId: [
                    {
                        required: true,
                        message: '请选择所属部门',
                        trigger: 'change'
                    }
                ],
                roleId: [
                    {
                        required: true,
                        message: '请选择角色',
                        trigger: 'change'
                    }
                ],
                describeText: [
                    {
                        max: 200,
                        message: '长度需要小于200个字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {},
    created() { },
    mounted() {
        this.role();
        this.UserInfo(this.$route.query.id);
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.event[this.$route.query.op](this.form);
                } else {
                    return false;
                }
            });
        },
        resolveData(data) {
            this.form = {
                userName: data.userName,
                password: '',
                repassword: '',
                phoneNumber: data.phoneNumber,
                email: data.email,
                organizationId: data.organization + '', // 所属机构id
                departmentId: data.departmentId + '', // 所属部门id
                realName: data.realName,
                roleId: data.roleId + '',
                describeText: data.describeText,
                id: data.id
            };
            this.Department(data.organization);
        },
        async createUser(data) {
            this.loading = true;
            let res = await saveUserInfo(data);
            this.loading = false;
            if (res) {
                this.$router.push({ name: 'dcp-users' });
            }
        },
        async editUser(data) {
            this.loading = true;
            let res = await modifyUserInfo(data);
            this.loading = false;
            if (res) {
                this.$router.push({ name: 'dcp-users' });
            }
        },
        async UserInfo(id) {
            if (this.$route.query.op !== 'modify') {
                return;
            }
            if (this.$route.params.id) {
                // 这里将params的值赋值给data
                this.resolveData(this.$route.params);
                return;
            }
            // 如果不存在的话，说明刷新页面，重新请求用户数据
            let res = await getUserInfoById(id);
            if (res) {
                this.resolveData(res);
            }
        },
        changessjg(val) {
            this.form.departmentId = '';
            this.Department(val);
        },
        async Department(val) {
            let res = await getDepartment(val);
            if (res) {
                res.map((item) => {
                    item.value = item.id + '';
                    item.label = item.depName;
                })
                this.optionsssbm = res;
            }
        },
        async role() {
            let res = await getListOfRole();
            if (res) {
                let orgs = res.orgs || [];
                let roles = res.roles || [];
                orgs.map((item) => {
                    item.value = item.id + '';
                    item.label = item.orgName;
                })
                roles.map((item) => {
                    item.value = item.id + '';
                    item.label = item.cName;
                })
                this.optionsorgs = orgs;
                this.rolesdataList = roles;
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.addUser {
  .users-ruleForm {
    width: 800px;
  }
}
</style>
