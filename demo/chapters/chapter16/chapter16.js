define(['avalon', 'text!./chapter16.html', './tree'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter16',
        treeConfig: {
            is: 'ms-tree',
            id: 'mytree'
        },
        getSelected: function () {
            //avalon.log(avalon.vmodels.mytree.getSelected());
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter16'] = tpl;
    root.page = tpl;
});