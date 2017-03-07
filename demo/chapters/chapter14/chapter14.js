define(['avalon', 'text!./chapter14.html', './tabs'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter14',
        tabsConfig: {
            id: 'mytabs'
        },
        addNew: function () {
            avalon.vmodels.mytabs.add({
                header: 'add',
                content: 'new add',
                selected: true
            }, 2);
        },
        addRemoved: function () {
            var tab = avalon.vmodels.mytabs.$removed[0];
            avalon.vmodels.mytabs.add(tab, 1);
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter14'] = tpl;
    root.page = tpl;
});