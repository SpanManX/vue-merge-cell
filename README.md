# vue-merge-cell

### 缓存版
```javascript
/**
*  @return {Object} 返回缓存的dom，如果没有缓存的dom返回空对象
**/
mergeCellCache({
    row: 7,                   // 要合并的行，不传入参数将不会合并行
    column: [0, 1, 2 , 3 ,4], // 要合并第几行的列，不传入参数将不会合并列
    target:'#c-table',        // 会将其参数传入document.querySelector以获取到对应 DOM 节点
    pageNum: this.pageNum,    // 当前页码 
    linkage:true              // row和column是否关联（如row填3将只会合并3行3列）
})
```

### 非缓存版
```javascript
mergeCell({
    // 传参同上，非缓存版没有pageNum
 })
```
