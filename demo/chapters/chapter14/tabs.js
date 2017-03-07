define(['avalon', 'text!./tabs.html'], function(avalon, tpl) {
    avalon.isArray = function( obj ) {
        return avalon.type( obj ) === 'array';
    };
    avalon.isNumeric = function( obj ) {
        // parseFloat NaNs numeric-cast false positives (null|true|false|"")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        // adding 1 corrects loss of precision from parseFloat (#15100)
        var realStringObj = obj && obj.toString();
        return !avalon.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
    };
    //获取所有子元素，非文本节点
    avalon.fn.children = function(index){
        var children = [];
        avalon.each(this[0].childNodes,function(i,node){
            node.nodeType === 1 && children.push(node);
        });
        if(index === undefined){
            return children;
        }else{
            return children[index];
        }
    };
    var defaultHeader = {
        title : '',
        href: 'javascript:void(0)',
        icon : '',
        closeable : false
    };
    var defaultContent = {
        html : ''
    };
    //需要修改源码fireComponentHook方法,去掉setTimeout
    avalon.component('ms-tabs', {
        template: tpl,
        defaults: {
            $removed: [],
            headers: [],
            contents: [],
            curIndex : 0,
            noContentTip : '暂无数据',
            add : function(obj, index){
                if(!obj) return;
                index = avalon.isNumeric(index) ? parseInt(index) : this.headers.length;
                this.headers.splice(index, 0, avalon.mix({}, defaultHeader,
                    avalon.type(obj.header)=='string'?{title: obj.header}:obj.header));
                this.contents.splice(index, 0, avalon.mix({}, defaultContent,
                    avalon.type(obj.content)=='string'?{html: obj.content}:obj.content));
                if(obj.selected){
                    this.curIndex = index;
                }
            },
            closeTab : function(evt,i){
                evt.stopPropagation();
                var header = this.headers.removeAt(i);
                var content = this.contents.removeAt(i);
                this.$removed.push({
                    header: header[0].$model,
                    content: content[0].$model
                });
                var len = this.headers.length;
                if(i === this.curIndex){
                    if(i === len){
                        var sel = len - 1;
                    }else{
                        sel = i;
                    }
                    if(this.curIndex === sel){
                        this.$fire('curIndex',sel);
                    }else{
                        this.curIndex = sel;
                    }
                }else if(i < this.curIndex){
                    this.curIndex--;
                }
                this.onClose();
            },
            onInit: function (evt) {
                var div = document.createElement('div');
                div.innerHTML = evt.target.innerHTML;
                var children = avalon(div).children();
                var headers = [];
                var contents = [];
                avalon.each(children,function(i,v){
                    var obj = {
                        title: v.getAttribute('title') || '',
                        href: v.getAttribute('data-href') || 'javascript:void(0)',
                        icon: v.getAttribute('data-icon') || '',
                        closeable: v.getAttribute('data-closeable') !== null
                    };
                    headers.push(obj);
                    contents.push({
                        html : v.innerHTML
                    });
                });
                evt.vmodel.contents = contents;
                evt.vmodel.headers = headers;
            },
            //事件回调声明占位
            onSelect : avalon.noop,
            onClose : avalon.noop
        }
    });
});