define(['avalon', 'text!./chapter15.html', './grid'], function(avalon, tpl) {
    function random2D() {
        var iLen = 1 + Math.floor(Math.random() * 30);
        var jLen = 3;
        var array = [], arr;
        for(var i = 0; i < iLen; i++){
            arr = [];
            for(var j = 0; j < jLen; j++){
                arr.push(Math.floor(Math.random() * 1000))
            }
            array.push(arr);
        }
        return array;
    }
    var vm = avalon.define({
        $id: 'chapter15',
        gridConfig: {
            is: 'ms-grid',
            id: 'mygrid',
            title: 'test',
            $url: './chapters/chapter15/array.json',
            //$url: './chapters/chapter15/object.json',
            columns: [
                {field: 'a1',title: 'a1', sort: true},
                {field: 'a2',title: 'a2'},
                {field: 'a3',title: 'a3'}
            ],
            /*$frontPageData: [
                {
                    a1: 'rgwrtwrwerewrewrwerewrwerewr',
                    a2: 21212
                }, {
                    a1: 1544
                }, {
                    a1: 11
                }, {
                    a1: 233577
                }, {
                    a1: 123
                }, {
                    a1: "wefgf324"
                }, {
                    a1: 234
                }, {
                    a1: 33345
                }, {
                    a1: 234535
                }, {
                    a1: 32343
                }, {
                    a1: 3345
                }, {
                    a1: 3643
                }, {
                    a1: 3387
                }, {
                    a1: 345345435
                }, {
                    a1: 34533
                }, {
                    a1: 3382
                }, {
                    a1: 345345
                }, {
                    a1: 33356
                }, {
                    a1: 32133
                }, {
                    a1: 3378
                }, {
                    a1: 234234234
                }, {
                    a1: 33
                }
            ],*/
            //$frontPageData: random2D(),
        },
        getSelected: function () {
            avalon.log(avalon.vmodels.mygrid.getSelected());
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter15'] = tpl;
    root.page = tpl;
});