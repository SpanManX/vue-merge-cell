<template>
    <div style="padding: 10px">
        <table>
            <thead>
            <tr>
                <th v-for="(item,index) in tableHeader" :key="index">{{item.title}}</th>
            </tr>
            </thead>
            <tbody id="c-table" v-if="!html[pageNum - 1] && bool">
            <tr v-for="(item,index) in data" :key="index" :id="`c-tr-${index}`">
                <td v-for="(val,num) in tableHeader" :key="num" :id="'c-td-'+index +'-'+ num">
                    <slot :name="val.key" :row="item[val.key]">{{item[val.key]}}</slot>
                </td>
            </tr>
            </tbody>
            <tbody v-else-if="html[pageNum - 1]">
            <tr v-for="index in Object.keys(data)" :key="index" v-html="generateDom(`c-tr-${index}`)">
            </tr>
            </tbody>
        </table>
        <el-pagination
                layout="prev, pager, next"
                :total="tableData.length" @current-change="changePage" :page-size="pageSize"
                :current-page.sync="pageNum">
        </el-pagination>
    </div>
</template>

<script>
    import {mergeCellCache} from "../js/merge-cell";
    import {tableHeader, tableData} from "../js/tableData";

    export default {
        name: "test",
        data() {
            return {
                data: [],                 // 分页列表数据
                bool: true,               // 控制没使用缓存的tbody重置dom
                tableHeader: tableHeader, // 表头
                tableData: tableData,     // 全部列表数据
                pageSize: 5,
                pageNum: 1,
                html: {},
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.loadTable()
            })
        },
        methods: {
            /**
             *  加载列表
             **/
            loadTable() {
                this.bool = false;
                this.$nextTick(() => {
                    let arr = [];
                    // 计算分页列表数据
                    for (let i = (this.pageNum * this.pageSize) - this.pageSize; i < this.pageNum * this.pageSize; i++) {
                        if (i < this.pageNum * this.pageSize) {
                            if (typeof tableData[i] !== 'undefined') {
                                arr.push(tableData[i])
                            }
                        }
                    }
                    this.data = arr;
                    this.bool = true;
                    this.$nextTick(() => {
                        this.html = mergeCellCache({row: 7, column: [0, 1, 2 , 3 ,4], pageNum: this.pageNum,linkage:true})
                    })
                })
            },

            /**
             *  创建td元素（缓存的元素）
             **/
            generateDom(index) {
                if (this.html[this.pageNum - 1][index]) {
                    return this.html[this.pageNum - 1][index].innerHTML
                }
            },

            /**
             *  翻页
             **/
            changePage() {
                this.loadTable()
            }
        }
    }
</script>

<style lang="scss" scoped>
    table {
        width: 100%;
        border-collapse: collapse;
        color: #515a6e;

        thead {
            border: 1px #e8eaec solid;
            font-weight: 500;

            tr {
                height: 35px;

                th {
                    border: 1px #e8eaec solid;
                }
            }
        }

        tbody {
            text-align: center;

            tr {
                height: 42px;

                td {
                    border: 1px #e8eaec solid;
                    border-top: none;
                    padding: 10px;

                }
            }

        }
    }
</style>
