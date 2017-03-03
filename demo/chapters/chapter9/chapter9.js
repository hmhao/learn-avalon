define(['avalon', 'text!./chapter9.html'], function(avalon, tpl) {
    avalon.component('ms-pager', {
        template: '<div class="input-append">' +
                        '<input type="text" ms-duplex-number="@num"/>' +
                        '<button class="btn" type="button" ms-on-click="@onPlus">+</button>' +
                    '</div>',
        defaults: {//组件VM的属性与方法，与template中的@对应
            num: 1,
            onPlus: function () {
                this.num++;
            }
        }
        //soleSlot 表示组件只有一个插槽,会将组件容器的所有孩子都移到这里来 ,可选
    });
    avalon.component('ms-slot',{
        template:'<div class="view"><slot name="content" /></div>',
        defaults: {
            content: ''
        }
    });
    avalon.component('ms-sole-slot', {
        template: '<button type="button" class="btn btn-info"><span><slot /></span></button>',
        defaults: {
            buttonText: 'button'//组件没有传入soleSlot时的默认值
        },
        soleSlot: 'buttonText'
    });
    var vm = avalon.define({
        $id: 'chapter9'
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter9'] = tpl;
    root.page = tpl;
});