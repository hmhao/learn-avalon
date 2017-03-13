define(['avalon', 'text!./tree.html', 'css!./tree.css', './mmRequest'], function(avalon, tpl) {
    var rootTpl = tpl.replace('MS_FOR',':for="($index,el) in @nodes"');
    var nodesTpl = tpl.replace('MS_FOR',':for="($index,el) in el.nodes"');
    var tree = {
        defaultTreeNode: {
            nodes: [],
            $path: '',
            $nodeIcon: '',
            $expandIcon: '',
            $collapseIcon: '',
            $checkbox: false,
            $checkedIcon: '',
            $uncheckedIcon: '',
            text: '',
            loading: false,
            checked: 0,
            selected: false,
            loaded: true,//
            state: ''
        },
        initTreeNode: function (vm, nodes, path) {
            var defTreeNode = this.defaultTreeNode;
            path = path || '';
            avalon.each(nodes, function (i, node) {
                for(var key in defTreeNode){
                    if(node[key] === undefined){
                        node[key] = key !== 'nodes' ?
                            (vm[key] || defTreeNode[key]) :
                            defTreeNode[key];
                    }
                }
                if(!node.state) node.state = 'collapse';
                node.$path = path + i;
                if(node.nodes && node.nodes.length){
                    node.nodes = this.initTreeNode(vm, node.nodes, node.$path);
                }
            }.bind(this));
            return nodes;
        },
        eachNode: function (nodes, cb){//遍历nodes中的所有节点，若传入回调则执行回调
            avalon.each(nodes, function (i, node) {
                if(node){
                    if(cb && cb(node, i, nodes) === false){
                        return false;
                    }
                    var _nodes = node.nodes;
                    if(_nodes && _nodes.length > 0 && this.eachNode(_nodes, cb) === false){
                        return false;
                    }
                }
            }.bind(this));
        },
        getNode: function(nodes, path){//根据path获取节点
            path = path.split('');
            var node, i, len;
            for(i = 0, len = path.length; i < len; i++){
                node = nodes[path[i]];
                if(node && node.nodes && node.nodes.length){
                    nodes = node.nodes;
                } else {
                    break;
                }
            }
            return i == len - 1 ? node : null;
        },
        getParents: function(nodes, target){//获取target的所有父节点
            var parents = [];
            var path = target.$path.split('');
            for(var i = 0, len = path.length, index, node; i < len - 1; i++){
                index = path[i];
                node = nodes[index];
                parents.push(node);
                nodes = node.nodes;
            }
            return parents;
        }
    };

    avalon.component('ms-tree', {
        template: '<ul class="tree">' + rootTpl + '</ul>',
        defaults: {
            nodes: [],//节点
            $nodeIcon: '',//节点是否带图标
            $checkbox: false,//节点是否带checkbox
            $checkedIcon: 'icon-check',//选中的复选框图标
            $uncheckedIcon: 'icon-unchecked',//没选中的复选框图标
            $expandIcon: 'icon-minus',//展开图标
            $collapseIcon: 'icon-plus',//收起图标
            $cascadeCheck: true,//是否级联检查
            $lastSelect: null,
            $getNodesTpl: function (el) {
                return nodesTpl;
            },
            toggleState: function (el) {
                if(el.state === 'collapse'){
                    if(this.onBeforeExpand(el) === false){
                        return;
                    }
                    el.state = 'expand';
                    this.onExpand(el);
                }else{
                    if(this.onBeforeCollapse(el) === false){
                        return;
                    }
                    el.state = 'collapse';
                    this.onCollapse(el);
                }
            },
            toggleCheck: function(el, checked){
                if(checked === undefined){
                    var _checked = el.checked;
                    if(_checked === 1){
                        checked = el.checked = 0;
                    }else{
                        checked = el.checked = 1;
                    }
                }else{
                    el.checked = checked;
                }
                checked === 1 && this.onCheck(el);
                if(this.$cascadeCheck){
                    if(el.nodes.length){
                        //勾选或反选所有子节点
                        tree.eachNode(el.nodes, function (node) {
                            node.checked = checked;
                        });
                    }
                    if(el.$path.length > 1){
                        var parents = tree.getParents(this.nodes, el);
                        if(checked === 1){
                            //如果是勾选 则将所有父节点置为预选状态
                            avalon.each(parents, function(i, node){
                                node.checked = 2;
                            });
                        }else{
                            avalon.each(parents.reverse(), function (i, node) {
                                var flag = 0;
                                //遍历所有父节点 查看其下所有子节点是否都没有勾选，若是则置为反选
                                tree.eachNode(node.nodes, function (n) {
                                    if(n.checked === 1){
                                        flag = 2;
                                        return false;
                                    }
                                });
                                node.checked = flag;
                            });
                        }
                    }
                }
            },
            toggleSelect: function(el){
                if(this.onBeforeSelect(el) === false){
                    return;
                }
                if(this.$lastSelect){
                    this.$lastSelect.selected = false;
                }
                if(this.$lastSelect === el) return;
                el.selected = true;
                this.onSelect(this.$lastSelect = el);
            },
            getNode: function(path){
                return tree.getNode(this.nodes, path);
            },
            getParents: function(target){
                return tree.getParents(this.nodes, target);
            },
            getSelected: function () {
                return this.$lastSelect;
            },
            //hook
            onInit: function (evt) {
                this.nodes.pushArray(tree.initTreeNode(this, [
                    {
                        'text': 'node1'
                    }, {
                        'text': 'node2',
                        'nodes': [{
                            'text': 'node21',
                            'nodes': [{
                                'text': 'node211'
                            },{
                                'text': 'node212'
                            }]
                        },{
                            'text': 'node22'
                        }]
                    }, {
                        'text': 'node3'
                    }
                ]));
            },
            onReady: function(evt){

            },
            //事件回调声明占位
            onBeforeSelect: avalon.noop,
            onSelect: avalon.noop,
            onBeforeExpand: avalon.noop,
            onExpand: avalon.noop,
            onBeforeCollapse: avalon.noop,
            onCollapse: avalon.noop,
            onBeforeLoad: avalon.noop,
            onLoadSuccess: avalon.noop,
            onLoadError: avalon.noop,
            onLoadComplete: avalon.noop,
            onCheck: avalon.noop
        }
    });
});