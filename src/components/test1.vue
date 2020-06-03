<template>
    <div style="padding: 10px">
        <table>
            <thead>
            <tr>
                <th v-for="(item,index) in tableHeader" :key="index">{{item.title}}</th>
            </tr>
            </thead>
            <tbody id="c-table1" v-if="bool">
            <tr v-for="(item,index) in data" :key="index">
                <td v-for="(val,num) in tableHeader" :key="num" :id="'c-td-'+index +'-'+ num">
                    <slot :name="val.key" :row="item[val.key]">{{item[val.key]}}</slot>
                </td>
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
    import {mergeCell} from "../js/merge-cell";
    import {tableHeader, tableData} from "../js/tableData";

    export default {
        name: "test1",
        data() {
            return {
                data: [],                 // 分页列表数据
                bool: true,               // 控制没使用缓存的tbody重置dom
                tableHeader: tableHeader, // 表头
                tableData: tableData,     // 全部列表数据
                pageSize: 3,
                pageNum: 1,
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
                        mergeCell({row: 3, column: [0, 1, 2], target: '#c-table1'})
                    })
                })
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
