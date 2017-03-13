define(['avalon', 'text!./chapter16.html', './tree'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter16',
        treeConfig: {
            is: 'ms-tree',
            id: 'mytree',
            $checkbox: true,
            $nodeIcon: 'icon-bookmark',
            $checkedIcon: 'icon-ok-sign',//选中的复选框图标
            $uncheckedIcon: 'icon-ok-circle',//没选中的复选框图标
            $expandIcon: 'icon-chevron-down',//展开图标
            $collapseIcon: 'icon-chevron-right'//收起图标
        },
        getSelected: function () {
            avalon.log(avalon.vmodels.mytree.getSelected());
        },
        getParents: function () {
            var mytree = avalon.vmodels.mytree;
            var selected = mytree.getSelected();
            if(selected){
                avalon.log(mytree.getParents(selected));
            }
        },
        path: '100',
        getNode: function () {
            avalon.log(avalon.vmodels.mytree.getNode(this.path));
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter16'] = tpl;
    root.page = tpl;
});