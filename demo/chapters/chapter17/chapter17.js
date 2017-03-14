define(['avalon', 'text!./chapter17.html', './accordion'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter17',
        accordionConfig: {
            is: 'ms-accordion',
            id: 'myaccordion',
            //$multiple: false,
            data: [{
                title: 'a1',
                icon: 'icon-bell-alt',
                nodes: [{
                    text: 'a1-1'
                },{
                    text: 'a1-2' ,
                    icon: 'icon-bookmark'
                }]
            },{
                title: 'a2' ,
                nodes: [{
                    text: 'a2-1',
                    icon: ' icon-book'
                },{
                    text: 'a2-2'
                }]
            },{
                title: 'content' ,
                content: '<h1>testtest</h1>'
            }]
        },
        getSelected: function () {
            avalon.log(avalon.vmodels.myaccordion.getSelected());
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter17'] = tpl;
    root.page = tpl;
});