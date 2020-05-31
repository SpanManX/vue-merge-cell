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
                data: [],
                bool: true,
                tableHeader: tableHeader,
                tableData: tableData,
                pageSize: 3,
                pageNum: 1,
                html: {},
                htmlBool: true
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.loadTable()
            })
        },
        methods: {
            loadTable() {
                this.bool = false;
                this.$nextTick(() => {
                    let arr = [];
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
                        this.html = mergeCell({row: 7, column: [0, 1, 2],domName:'#c-table1'})
                    })
                })
            },
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
                height: 25px;

                td {
                    border: 1px #e8eaec solid;
                    border-top: none;
                    padding: 10px;

                }
            }

        }
    }
</style>
