define(['avalon', 'text!./chapter11.html'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter11',
        f1:'aaa',
        f2:'AAA',
        f3:'121323234324324',
        f4:'bbb-bbb',
        f5:'<b>123</b>',
        f6:'<script>var a = $("div").onclick(function(){})</script><a href="javascript:alert(123)">123</a>',
        f7:1234.56789,
        d1: new Date,
        d2: '2011/07/08',
        d3: '2011-07-08',
        d4: '01-01-2000',
        d5: '03 04,2000',
        d6: '3 4,2000',
        d7: 1373021259229,
        d8: '1373021259229',
        d9: '2014-12-07T22:50:58+08:00',
        d10: '\/Date(1373021259229)\/',
        //
        array1: [1, 2, 3, 4, 5, 6],
        object1: {a: 1, b: 2, c: 3, d: 4, e: 5},
        num: 3,
        array2: [{a: 1, b: 33},{a: 2, b: 22}, {a: 3, b: 11}],
        order: 'a',
        dir: -1,
        array3: ['aaaa', 'aab', 'acb', 'ccc', 'dddd'],
        object3: {a: 'aaaa', b: 'aab', c: 'acb', d: 'ccc', e: 'dddd'},
        search: 'a',
        searchFn1: function (el, i, arg1) {
            return i > 2;
        },
        searchFn2: function (el, i) {
            return el.length === 4;
        },
        searchFn3: function (el, i) {
            return i === 'b' || i === 1;
        },
        arr: [{name: 'wanglin', age: 11},
            {name: 'lin', age: 3},
            {name: 'Hunt', age: 22},
            {name: 'Joe', age: 33}],
        fn: function(a){//过滤数组中 name属性值带lin中的元素
            return  /lin/.test(a.name)
        },
        obj: {a: 'aaa', b: 'bbb', c: 'ccc', d: 'ddd', e: 'eee'},
        grid: [{a: 1, b: 2, c: 3}, {c: 11, b: 22, a: 33}, {b: 23, a: 44}],
        defaults: {
            a:'@@@',
            b:'$$$',
            c:'###'
        },
        eventFn1: function (evt) {
            avalon(evt.currentTarget).val('');
        },
        eventFn2: function (evt) {
            if(evt.type === 'keyup'){
                avalon(evt.currentTarget).val(evt.key);
            }else if(evt.type === 'click'){
                evt.currentTarget.innerHTML = evt.key;
            }
        },
        duplexChange: 123,
        duplexDebounce: 123
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter11'] = tpl;
    root.page = tpl;
});