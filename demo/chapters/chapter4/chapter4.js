define(['avalon', 'text!./chapter4.html'], function(avalon, tpl) {
    var vmodel = avalon.define({
        $id: 'chapter4',
        //ms-class
        classA: 'btn btn-primary',
        classB: ['btn', 'btn-info'],
        classC: 'btn-small',
        classD: 'inverse',
        classToggle: true,
        //ms-active和ms-hover
        array: avalon.range(0, 14)
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter4'] = tpl;
    root.page = tpl;
});