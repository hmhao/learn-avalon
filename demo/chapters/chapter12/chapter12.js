define(['avalon', 'text!./chapter12.html', './modal'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter12',
        modalShow: function(){
            avalon.vmodels.mymodal.isShow = true;
        },
        modalConfig: {
            id: 'mymodal',//组件实例id
            title:'这是测试',
            onCancel: function(){
                avalon.log('cancel');
            },
            onOk: function(){
                avalon.log('ok');
            }
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter12'] = tpl;
    root.page = tpl;
});