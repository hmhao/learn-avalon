define(['avalon', 'text!./chapter2.html'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter2',
        a: 11,
        aa:'',
        b: {
            c: 11,
            d: 22
        },
        first: 'prev',
        last: 'next',
        $computed: {
            full: function(){
                return this.first+'... '+this.last;
            }
        },
        arr: [1,2,3]
    });
    vm.$watch('a', function(newValue, oldValue){
        vm.aa = 'a旧值：' + oldValue + ', 新值：' + newValue;
    });
    setTimeout(function () {
        vm.a = '22'
    }, 1000);
    setTimeout(function () {
        vm.b = {
            e: 33,
            f: 44,
            g: 55
        }
    }, 1000);

    var root = avalon.vmodels.root;
    root.$templateCache['chapter2'] = tpl;
    root.page = tpl;
});