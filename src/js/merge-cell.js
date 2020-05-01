/**
 * @description 合并单元格
 * @param {Number}   row - 要合并的列
 * @param {Array} column - 要合并的行
 **/
export function mergeCell(row, column = []) {
    let doc = document;
    let table = doc.getElementById('c-table');
    let rowLength = table.rows.length;
    let colLength = table.rows[0].cells.length;
    let dom1 = null;
    let dom2 = null;

    // 合并行
    for (let i = 0; i < colLength; i++) {
        if (i === row) {
            break
        }
        dom1 = doc.getElementById(`c-td-0-${i}`);  // 获取第一个单元格
        for (let j = 1; j < rowLength; j++) {
            dom2 = doc.getElementById(`c-td-${j}-${i}`);  // 获取每个单元格
            if ((dom1.innerText !== '' && dom2.innerText !== '') && dom1.innerText === dom2.innerText) {
                dom1.rowSpan++;    //横跨单元格行数
                dom2.remove();  // 移除重复的单元格数据
            } else {
                dom1 = doc.getElementById(`c-td-${j}-${i}`)  // 重新赋值下个循环比对使用
            }
        }
    }

    // 列合并
    let num = 0;
    for (let item of column) {
        for (let i = 0; i < rowLength; i++) {
            if (i === item) {
                for (let j = 0; j < colLength; j++) {
                    dom1 = doc.getElementById(`c-td-${i}-${j}`);
                    dom2 = doc.getElementById(`c-td-${i}-${j + 1}`);
                    if (dom2 !== null && dom1 !== null) {
                        if ((dom1.innerText !== '' && dom2.innerText !== '') && dom1.rowSpan === 1 && dom2.rowSpan === 1) {
                            if (dom1.innerText === dom2.innerText) {
                                num++;
                                dom2.colSpan = num + 1;
                                dom1.remove();
                                if (dom2.id === `c-td-${i}-${colLength - 1}`) {
                                    num = 0
                                }
                            } else {
                                num = 0
                            }
                        }
                    }
                }
            }
        }
    }
}
