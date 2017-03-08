define(['avalon', 'text!./grid.html'], function(avalon, tpl) {
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
            },{
                a1 : "wefgf324"
            },{
                a1 : 33
            },{
                a1 : 33345
            },{
                a1 : 234535
            },{
                a1 : 32343
            },{
                a1 : 3345
            },{
                a1 : 3643
            },{
                a1 : 3387
            },{
                a1 : 345345435
            },{
                a1 : 34533
            },{
                a1 : 3382
            },{
                a1 : 345345
            },{
                a1 : 33356
            },{
                a1 : 32133
            },{
                a1 : 3378
            },{
                a1 : 234234234
            },{
                a1 : 33
            },{
                a1 : 33
            }
        ],
        defaultColumn: {//column基本属性
            field: '',//字段名
            title: '',//标题
            width: '',//列宽度
            sort: false,//排序
            sortOrder: '',
            sortFn: avalon.filters.orderBy,
            formatter: avalon.noop//格式化函数
        },
        initColumns: function(columns){
            avalon.each(columns, function (i, column) {
                column = avalon.mix({}, this.defaultColumn, column);
                if(column.formatter !== avalon.noop){
                    if(column.formatter === 'datetime'){
                        column.formatter = function(v){
                            return avalon.filters.date(v,'yyyy-MM-dd HH:mm:ss');
                        };
                    }else if(column.formatter === 'date'){
                        column.formatter = function(v){
                            return avalon.filters.date(v,'yyyy-MM-dd');
                        };
                    }
                }
            }.bind(this));
        },
        //处理每一行数据
        extendRowsData: function (data){
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
            return data;
        },
        //初始化前台分页数据
        initFrontPageData: function(vm){
            if(vm.url) return;
            /*var frontPageData = vm.$frontPageData;
            if(!frontPageData) return;*/
            var frontPageData = this.testData;
            frontPageData = this.extendRowsData(frontPageData);
            vm.data[vm.$totalKey] = frontPageData.length;
            vm.data[vm.$rowsKey] = frontPageData;
        },
        //更新分页信息
        updatePagination: function(vm){
            var total = vm.data[vm.$totalKey];
            if(total === 0){
                vm.totalPages = vm.currentPage = vm.changePage = 1;
                vm.start = vm.end = 0;
            }else{
                vm.totalPages = parseInt(total / vm.pageSize,10) + (total % vm.pageSize > 0 ? 1 : 0);
                if(vm.currentPage === 0){
                    vm.changePage = vm.currentPage = 1;
                }else if(vm.currentPage > vm.totalPages){
                    vm.changePage = vm.currentPage = vm.totalPages;
                }
                vm.start = 1 + vm.pageSize * (vm.currentPage - 1);
                if(vm.start + vm.pageSize > total){
                    vm.end = total;
                }else{
                    vm.end = vm.start + vm.pageSize - 1;
                }
            }
        },
    };
    avalon.component('ms-grid', {
        template: tpl,
        defaults: {
            //table属性
            $totalKey : 'total',
            $rowsKey : 'rows',
            $style: ['table-striped', 'table-bordered', 'table-hover'],//表格样式
            $multiple: true,//是否允许多选
            $lastSelect: null,//前一个选择
            title: '',
            columns: [],
            data : {
                total : 0,
                rows : []
            },
            sort: function(column){
                if(column.sort){
                    var order;
                    if(column.sortOrder === 'down'){
                        column.sortOrder = 'up'; order = 1;
                    }else{
                        column.sortOrder = 'down'; order = -1;
                    }
                    if(column.sortFn && column.sortFn !== avalon.noop){
                        this.data.rows = column.sortFn(this.data.rows, column.field, order);
                    }
                }
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
            getSelected: function () {
                var data = this.data[this.$rowsKey] || [];
                if(this.$multiple){
                    return data.filter(function (item) {
                        return item._selected && item;
                    });
                }else{
                    return this.$lastSelect;
                }
            },
            //pagination属性
            $disable: {},
            pagination: true,
            totalPages: 1,
            currentPage: 1,
            changePage: 1,
            start : 0,
            end : 0,
            pageSize : 5,
            pageSizeArr : [5,10,15,20,25,30],
            //pageSizeArr : [20,40,60,80,100],
            isDisabled: function (name, page) {
                return this.$disable[name] = (this.currentPage === page);
            },
            toPage: function (p) {
                var cur = this.currentPage;
                var max = this.totalPages;
                switch (p) {
                    case 'first':
                        return 1;
                    case 'prev':
                        return Math.max(cur - 1, 1);
                    case 'next':
                        return Math.min(cur + 1, max);
                    case 'last':
                        return max;
                    default:
                        return p;
                }
            },
            $pageProxy: function (evt, p) {
                var cur = this.toPage(p);
                if (this.$disable[p] || p === this.currentPage) {
                    evt.preventDefault();
                    return; //disabled, active不会触发
                }
            },
            onInit: function () {
                grid.initFrontPageData(this);
                grid.updatePagination(this);
                this.columns = [
                    {field: 'a1',title: 'a1', sort: true},
                    {field: 'a2',title: 'a2'},
                    {field: 'a3',title: 'a3'}
                ];
                grid.initColumns(this.columns);
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