define(['avalon', 'text!./grid.html'], function(avalon, tpl) {
    /**
     * data = {
     *      total: 1,
     *      rows: [{field:value,...}]
     * }
     * */
    var defaultColumn = {
        field: '',
        title: '',
        sort: false,
        sortOrder: '',
        sortFn: avalon.filters.orderBy,
        formatter: avalon.noop
    };
    var grid = {
        testData: [
            {
                a1 : 'rgwrtwrwerewrewrwerewrwerewr'
            },{
                a1 : 33
            },{
                a1 : 11
            },{
                a1 : 233577
            },{
                a1 : 123
            }
        ],
        //初始化每一行数据
        initRowsData: function (data){
            var result = {
                total: data.length,
                rows: data
            };
            var obj = {
                _selected: false
            };
            for(var i = 0, row; row = data[i++];){
                for(var j in obj){
                    if(row[j] === undefined){
                        row[j] = obj[j];
                    }
                }
            }
            return result;
        },
        dealValue: function(item, column, rowIndex){
            var value = item[column.field];
            if(column.formatter && column.formatter !== avalon.noop){
                return column.formatter(value, item, rowIndex);
            }
            if(value === null || value === undefined){
                return '';
            }
            return value;
        },
    };
    avalon.component('ms-grid', {
        template: tpl,
        defaults: {
            //属性
            $totalKey : 'total',
            $rowsKey : 'rows',
            $style: ['table-striped', 'table-bordered', 'table-hover'],//表格样式
            $multiple: false,//是否允许多选
            $lastSelect: null,//前一个选择
            title: '',
            columns: [
                avalon.mix({}, defaultColumn, {field: 'a1',title: 'a1', sort: true}),
                avalon.mix({}, defaultColumn, {field: 'a2',title: 'a2'}),
                avalon.mix({}, defaultColumn, {field: 'a3',title: 'a3'})
            ],
            data: '',
            sort: function(item){
                if(item.sort){
                    var order;
                    if(item.sortOrder === 'down'){
                        item.sortOrder = 'up'; order = 1;
                    }else{
                        item.sortOrder = 'down'; order = -1;
                    }
                    if(item.sortFn && item.sortFn !== avalon.noop){
                        this.data.rows = item.sortFn(this.data.rows, item.field, order);
                    }
                }
            },
            dealValue: grid.dealValue,
            toggleSelect: function(item){
                if(this.$multiple){
                    item._selected = !item._selected;
                    item._selected && this.onSelect(item);
                }else{
                    if(item._selected){
                        item._selected = false;
                        this.$lastSelect = null;
                    }else{
                        if(this.$lastSelect){
                            this.$lastSelect._selected = false;
                        }
                        item._selected = true;
                        this.$lastSelect = item;
                    }
                }
            },
            onInit: function () {
                this.data = grid.initRowsData(grid.testData);
            },
            onReady: function(){
            },
            //事件回调声明占位
            onLoadSuccess: avalon.noop,
            onLoadError: avalon.noop,
            onSelect: avalon.noop
        }
    });
});