define(['avalon', 'text!./chapter12.html', './modal'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter12',
        modalShow: function(){
            this.modalConfig.isShow = true;
        },
        modalConfig: {
            id: 'mymodal',//组件实例id
            title:'这是测试',
            content: '<p>弹窗的内容</p><p>弹窗的内容</p><p>弹窗的内容结束!</p>',
            isShow: false,
            onCancel: function(){
                avalon.log('cancel');
            },
            onOk: function(){
                avalon.log('ok');
            },
            onInit: function(){
                //组件的是单向数据流，通过$watch同步父组件的状态。
                this.$watch('isShow',function(val){
                    //当前回调中的this指向子组件
                    vm.modalConfig.isShow = val;
                })
            }
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter12'] = tpl;
    root.page = tpl;
});