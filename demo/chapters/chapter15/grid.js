define(['avalon', 'text!./grid.html', './mmRequest'], function(avalon, tpl) {
    var grid = {
        defaultColumn: {//column基本属性
            field: '',//字段名
            title: '',//标题
            width: '',//列宽度
            sort: false,//排序
            sortOrder: '',
            sortFn: avalon.filters.orderBy,
            formatter: avalon.noop//格式化函数
        },
        getElementsByTagName: function (dom, tag) {
            var result = [];
            if(dom && dom.innerHTML) {
                var table = document.createElement('table');
                table.innerHTML = dom.innerHTML;
                result = table.getElementsByTagName(tag);
            }
            return result;
        },
        initColumnsFromFrontPage: function (vm, dom) {
            var columns = [];
            var children = this.getElementsByTagName(dom, 'th');
            avalon.each(children, function(i,v){
                var column = {};
                for(var key in v.attributes){
                    v.hasOwnProperty(key) && key !== 'length' && (column[key] = v.attributes[key]);
                }
                if(!column['field']){
                    column['field'] = avalon.makeHashCode('f');
                }
                if(!column['title']){
                    column['title'] = (avalon(v.textContent) == 'string') ? v.textContent : v.innerText;
                }
                columns.push(column);
            });
            this.initColumns(vm, columns);
        },
        initColumns: function(vm, columns){
            for(var i = 0, len = columns.length, column; i < len; i++){
                column = columns[i];
                for(var key in this.defaultColumn){
                    if(column[key] === undefined){
                        column[key] = this.defaultColumn[key];
                    }
                }
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
            }
            vm.columns = columns;
        },
        //处理每一行数据
        extendRowsData: function (data, fields){
            var obj = {
                _selected: false
            };
            for(var i = 0, row; row = data[i]; i++){
                if(avalon.type(row) === 'array'){
                    var r = {};
                    avalon.each(row, function (i, v) {
                        r[fields[i]] = v;
                    });
                    data[i] = row = r;
                }
                for(var j in obj){
                    if(row[j] === undefined){
                        row[j] = obj[j];
                    }
                }
            }
            return data;
        },
        //初始化前台数据
        initDataFrontPage: function(vm, dom){
            var pageData = [];
            var children = this.getElementsByTagName(dom, 'tr');
            avalon.each(children, function(i,v){
                var tds = v.childNodes;
                var data = [];
                avalon.each(tds, function (j, td) {
                    if(td.nodeName === 'TD'){
                        data.push((avalon(td.textContent) == 'string') ? td.textContent : td.innerText);
                    }
                });
                data.length && pageData.push(data);
            });
            this.initData(vm, pageData);
        },
        //初始化数据
        initData: function (vm, pageData) {
            var fields = vm.columns.map(function (item) {
                return item.field;
            });
            pageData = this.extendRowsData(pageData, fields);
            vm.data[vm.$totalKey] = pageData.length;
            vm.data[vm.$rowsKey] = pageData;
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
        loadDataByPage: function(vm, page){
            if(!vm.url){
                this.dealFrontPageData(vm, page);
            }else{
                this.ajaxLoad(vm, page);
            }
        },
        dealFrontPageData: function(vm, page){
            vm.currentPage = vm.changePage = page;
            this.updatePagination(vm);
        },
        ajaxLoad: function(vm, page, opt){
            avalon.mix(vm.$queryParams, opt);
            avalon.ajax(avalon.mix(vm.$queryParams, {
                url: vm.url,
                success: function(data){
                    if(!data){//错误
                        vm.onLoadError();
                        return;
                    }
                    if(avalon.type(data) === 'array'){
                        vm.data[vm.$totalKey] = data.length;
                        this.dealFrontPageData(vm, page);//前台分页
                    }else{
                    }
                }.bind(this),
                error: function () {
                    vm.onLoadError();
                }.bind(this)
            }));
        }
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
            $frontPageData: [],
            sort: function(column){
                if(column.sort){
                    var order;
                    avalon.each(this.columns, function (i, c) {
                        c != column && (c.sortOrder = '');
                    });
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
                var to = this.toPage(p);
                if (this.$disable[p] || p === this.currentPage) {
                    evt.preventDefault();
                    return; //disabled, active不会触发
                }
                grid.loadDataByPage(this, to || 1);
            },
            //ajax属性
            url: '',
            $queryParams: {},
            load: function(param){
                grid.ajaxLoad(this, 1, param || {});
            },
            reload: function(){
                grid.ajaxLoad(this, this.currentPage);
            },
            //hook
            onInit: function (evt) {
                if(!this.columns || !this.columns.length){
                    grid.initColumnsFromFrontPage(this, evt.target);//尝试从dom获取
                }else{
                    grid.initColumns(this, this.columns.$model);
                }
                if(!this.url){
                    if(!this.$frontPageData || !this.$frontPageData.length){
                        grid.initDataFrontPage(this, evt.target);//尝试从dom获取
                    }else{
                        grid.initData(this, this.$frontPageData);
                    }
                }
            },
            onReady: function(){
                this.$watch('pageSize',function(val){
                    grid.loadDataByPage(this, 1);
                });
                grid.loadDataByPage(this, 1);
            },
            //事件回调声明占位
            onLoadSuccess: avalon.noop,
            onLoadError: avalon.noop,
            onSelect: avalon.noop
        }
    });
});