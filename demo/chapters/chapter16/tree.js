define(['avalon', 'text!./tree.html', 'css!./tree.css', './mmRequest'], function(avalon, tpl) {
    var rootTpl = tpl.replace('MS_FOR',':for="($index,el) in @nodes"');
    var nodesTpl = tpl.replace('MS_FOR',':for="($index,el) in el.nodes"');
    var tree = {
        defaultTreeNode: {
            nodes: [],
            $path: '',
            nodeIcon: false,
            checkbox: false,
            expandIcon: '',
            collapseIcon: '',
            checkedIcon: 'icon-check',
            uncheckedIcon: 'icon-unchecked',
            text: '',
            loading: false,
            checked: 0,
            selected: false,
            active: false,
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
        eachParents: function(nodes, target, cb){//遍历target的所有父节点，若传入回调则执行回调
            var path = target.$path.split('');
            for(var i = 0, len = path.length, index, node; i < len - 1; i++){
                index = path[i];
                node = nodes[index];
                cb && cb(node);
                nodes = node.nodes;
            }
        }
    };

    avalon.component('ms-tree', {
        template: '<ul class="tree">' + rootTpl + '</ul>',
        defaults: {
            nodes: [],//节点
            nodeIcon: 'icon-bookmark',//节点是否带图标
            checkbox: true,//节点是否带checkbox
            expandIcon: 'icon-minus',//展开图标
            collapseIcon: 'icon-plus',//收起图标
            $cascadeCheck: true,//是否级联检查
            $lastSelect: null,
            getNodesTpl: function (el) {
                return nodesTpl;
            },
            toggleState: function (el) {
                el.state = el.state == 'collapse' ? 'expand' : 'collapse';
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
                if(this.$cascadeCheck){
                    if(el.nodes.length){
                        //勾选或反选所有子节点
                        tree.eachNode(el.nodes, function (node) {
                            node.checked = checked;
                        });
                    }
                    if(el.$path.length > 1){
                        //如果是勾选 则将所有父节点置为预选状态
                        tree.eachParents(this.nodes, el, function(node){
                            node.checked = checked === 1 ? 2 : 0;
                        });
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
            onBeforeSelect : avalon.noop,
            onSelect : avalon.noop,
            onBeforeExpand : avalon.noop,
            onExpand : avalon.noop,
            onBeforeCollapse : avalon.noop,
            onCollapse : avalon.noop,
            onBeforeLoad : avalon.noop,
            onLoadSuccess : avalon.noop,
            onLoadError : avalon.noop,
            onLoadComplete : avalon.noop,
            onCheck: avalon.noop
        }
    });
});