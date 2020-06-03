let doc = document;
let domObj = {
    length: null,
    push: function (val, page) {
        this[page] = val;
        this.length++;
    }
};

Object.defineProperties(domObj, {
    length: {
        enumerable: false
    },
    push: {
        enumerable: false
    }
});

/**
 * @description 合并单元格(缓存版)
 * @param {Number}      row - 要合并的行
 * @param {Array}    column - 要合并第几行的列
 * @param {String}   target - 会将其参数传入document.querySelector以获取到对应 DOM 节点
 * @param {Number}  pageNum - 当前页码
 * @param {Boolean} linkage - row和column是否关联
 * @return {Object} 返回缓存的dom，如果没有缓存的dom返回空对象
 **/
export function mergeCellCache({row, column = [], target, pageNum = 1, linkage = false}) {
    let obj = {};
    let page = pageNum - 1;
    if (domObj[page]) {
        return domObj
    } else {
        mergeCell({row, column, target, linkage});
        let table = doc.querySelector('#c-table');
        let rowLength = table.rows.length;
        for (let i = 0; i < rowLength; i++) {
            obj[`c-tr-${i}`] = table.querySelector(`#c-tr-${i}`)
        }
        domObj.push(obj, page);
        return {}
    }
}


/**
 * @description 合并单元格
 * @param {Number}      row - 要合并的行
 * @param {Array}    column - 要合并第几行的列
 * @param {String}   target - 会将其参数传入document.querySelector以获取到对应 DOM 节点
 * @param {Boolean} linkage - row和column是否关联
 **/
export function mergeCell({row, column = [], target, linkage = false}) {
    let table = doc.querySelector(target);
    let rowLength = table.rows.length;
    let colLength = table.rows[0].cells.length;
    let dom1 = null;
    let dom2 = null;
    // 行合并
    if (row) {
        for (let i = 0; i < colLength; i++) {
            if (i === row) {
                break
            }
            dom1 = table.querySelector(`#c-td-0-${i}`);  // 获取第一个单元格
            for (let j = 1; j < rowLength; j++) {
                dom2 = table.querySelector(`#c-td-${j}-${i}`);  // 获取每个单元格
                if (dom1.innerText === dom2.innerText) {
                    dom1.rowSpan++;    // 横跨单元格行数
                    dom2.remove();     // 移除重复的单元格数据
                } else {
                    dom1 = table.querySelector(`#c-td-${j}-${i}`)  // 重新赋值下个循环比对使用
                }
            }
        }
    }

    // 列合并
    let num = 0;
    for (let item of column) {
        for (let i = 0; i < rowLength; i++) {
            if (i === item) {
                for (let j = 0; j < colLength; j++) {
                    if (j === (row - 1) && linkage) {
                        num = 0;
                        break
                    }
                    dom1 = table.querySelector(`#c-td-${i}-${j}`);
                    dom2 = table.querySelector(`#c-td-${i}-${j + 1}`);
                    if (dom2 && dom1) {
                        if (dom1.rowSpan === dom2.rowSpan) {
                            if (dom1.innerText === dom2.innerText) {
                                num++;
                                dom2.colSpan = num + 1;
                                dom1.remove();
                                if (dom2.id === `c-td-${i}-${colLength - 1}`) {
                                    num = 0
                                }
                            }
                            // else {
                            // num = 0
                            // }
                        }
                    }
                }
            }
        }
    }
}
