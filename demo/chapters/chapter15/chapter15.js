define(['avalon', 'text!./chapter15.html', './grid'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter15',
        gridConfig: {
            is: 'ms-grid',
            id: 'mygrid',
            title : 'test'
        },
        getSelected: function () {
            avalon.log(avalon.vmodels.mygrid.getSelected());
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter15'] = tpl;
    root.page = tpl;
});