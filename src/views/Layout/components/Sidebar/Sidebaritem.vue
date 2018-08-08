<template>
    <!-- 存在子路由并且hidden=false -->
    <div v-if="!item.hidden&&item.children"
         class="menu-wrapper">
        <!-- 只有一级菜单时候（hidden=false且没有children） -->
        <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children"
                     :to="resolvePath(onlyOneChild.path)">
            <el-menu-item :index="resolvePath(onlyOneChild.path)"
                          :class="{'submenu-title-noDropdown':!isNest}">
                <i v-if="onlyOneChild.meta&&onlyOneChild.meta.icon"
                   class="fa"
                   :class="onlyOneChild.meta.icon"
                   aria-hidden="true"></i>
                <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title"
                      slot="title">{{onlyOneChild.meta.title}}</span>
            </el-menu-item>
        </router-link>
        <template v-else>
            <el-submenu :index="item.name||item.path">
                <template slot="title">
                    <i v-if="item.meta&&item.meta.icon"
                       class="fa"
                       :class="item.meta.icon"
                       aria-hidden="true"></i>
                    <span v-if="item.meta&&item.meta.title"
                          slot="title">{{item.meta.title}}</span>
                </template>

                <template v-for="child in item.children"
                          v-if="!child.hidden">
                    <sidebar-item :is-nest="true"
                                  class="nest-menu"
                                  v-if="child.children&&child.children.length>0"
                                  :item="child"
                                  :key="child.path"
                                  :base-path="resolvePath(child.path)"></sidebar-item>

                    <router-link v-else
                                 :to="resolvePath(child.path)"
                                 :key="child.name">
                        <el-menu-item :index="resolvePath(child.path)">
                            <i v-if="child.meta&&child.meta.icon"
                               class="fa"
                               :class="child.meta.icon"
                               aria-hidden="true"></i>
                            <span v-if="child.meta&&child.meta.title"
                                  slot="title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
import path from 'path'

export default {
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            onlyOneChild: null
        }
    },
    methods: {
        hasOneShowingChild(children) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                } else {
                    // temp set(will be used if only has one showing child )
                    this.onlyOneChild = item
                    return true
                }
            })
            if (showingChildren.length === 1) {
                return true
            }
            return false
        },
        resolvePath(...paths) {
            return path.resolve(this.basePath, ...paths)
        }
    }
}
</script>
