define(['avalon', 'text!./chapter7.html'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter7',
        textInput: 'aaa',
        passwordInput: 'bbb',
        textareaInput: 'ccc',
        radio: '33',
        checkbox: [22],
        radio2: false,
        checkbox2: false,
        select1: 'bbb',
        select2: ['bbb','ccc'],
        //
        selected: 'name',
        options: ['name', 'size', 'date'],
        trend: 1,
        data: [
            {name: 'aaa', size: 213, date: Date.now() + 20},
            {name: 'bbb', size: 4576, date:Date.now() - 4},
            {name: 'ccc', size: 563, date: Date.now() - 7},
            {name: 'eee', size: 3713, date: Date.now() + 9},
            {name: '555', size: 389, date: Date.now() - 20}
        ]
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter7'] = tpl;
    root.page = tpl;
});