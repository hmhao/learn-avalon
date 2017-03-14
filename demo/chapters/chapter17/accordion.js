define(['avalon', 'text!./accordion.html', 'css!./accordion.css'], function(avalon, tpl) {
    var accordion = {
        defaultHeader: {
            title: '',//标题
            icon: '',//标题左边的图标
            content: '',//body html
            nodes: [],//若content为空，则取nodes为body内容，参看defaultNode
            selected: false,//是否选中
            $expandIcon: '',//展开图标
            $collapseIcon: ''//收起图标
        },
        defaultNode: {
            text: '',//文本
            icon: '',//文本左边的图标
            selected: false//是否选中
        },
        initData: function (vm, data, isNode) {
            var option = isNode ? this.defaultNode : this.defaultHeader;
            avalon.each(data, function (i, item) {
                for(var key in option){
                    if(item[key] === undefined){
                        item[key] = vm[key] || option[key];
                    }
                }
                if(!isNode && item.nodes && item.nodes.length){
                    item.nodes = this.initData(vm, item.nodes, true);
                }
            }.bind(this));
            return data;
        }
    };

    avalon.component('ms-accordion', {
        template: tpl,
        defaults: {
            data: [],//参看defaultHeader
            $expandIcon: 'icon-chevron-down',//展开图标
            $collapseIcon: 'icon-chevron-right',//收起图标
            $lastSelect: null,
            $lastSelectHeader: null,
            $multiple: true,//是否允许展开多个
            selectHeader: function (el) {//选中节点头
                if(this.$multiple){
                    this.toggle(el, true);
                }else{
                    if(this.$lastSelectHeader){
                        this.toggle(this.$lastSelectHeader, true);
                    }
                    if(this.$lastSelectHeader === el) {
                        this.$lastSelectHeader = null;
                        return;
                    }
                    this.toggle(el, true);
                    this.$lastSelectHeader = el;
                }
            },
            selectNode: function(el){//选中节点
                if(el.selected) return;
                if(this.$lastSelect){
                    this.toggle(this.$lastSelect, false);
                }
                this.toggle(el, false);
                this.onSelect(el);
                this.$lastSelect = el;
            },
            toggle: function(el, isHeader){
                if(el.selected){
                    el.selected = false;
                    isHeader && this.onCollapse(el);
                }else{
                    el.selected = true;
                    isHeader && this.onExpand(el);
                }
            },
            getSelected: function(){//获取所选的
                var array = [];
                var data;
                avalon.each(this.data, function (i, header) {
                    if(header.selected){
                        data = {};
                        if(header.nodes && header.nodes.length){
                            avalon.each(header.nodes, function (j, node) {
                                if(node.selected){
                                    data.type = 'node';
                                    data.selected = node;
                                    array.push(data);
                                    return false;
                                }
                            });
                        }else if(header.content){
                            data.type = 'content';
                            data.selected = header;
                            array.push(data);
                        }
                    }
                });
                return array;
            },
            //hook
            onInit: function (evt) {
                if(this.data){
                    this.data = accordion.initData(this, this.data.$model);
                }
            },
            onReady: function(evt){

            },
            //事件回调声明占位
            onSelect: avalon.noop,
            onCollapse: avalon.noop,
            onExpand: avalon.noop
        }
    });
});