define(['avalon', 'text!./chapter14.html', './tabs'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter14',
        tabsConfig: {
            id: 'mytabs'
        }
    });
    
    var root = avalon.vmodels.root;
    root.$templateCache['chapter14'] = tpl;
    root.page = tpl;
});