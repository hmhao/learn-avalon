define(['avalon', 'text!./chapter6.html'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter6',
        //默认回调传参
        hoverStatus: '',
        hover: function(e) {
            //默认,事件回调的第一个参数是事件对象,并进行标准化处理
            //this指向vm, 元素本身可以直接从e.target中取得
            this.hoverStatus = e.type
        },
        inputField: '',
        inputcheck: function(e) {
            this.inputField = e.target.value + '  ' + e.type
        },
        //自定义回调传参
        firstName: 'Hello',
        array: ['aaa', 'bbb', 'ccc'],
        customClick: function(e, a, b) {
            //html指令中使用$event标识符就是事件对象
            alert([].slice.call(arguments).join(' '));
        },
        loopClick: function(a, e) {
            alert(a + '  ' + e.type);
        },
        //表达式
        isError:false,
        //一个元素绑定多个同种事件的回调
        str1: '1', str2: '2', str3: '3', count:0,
        click0: function() { vm.str1 = 'xxxxxxxxx' + (vm.count++);},
        click1: function() { vm.str2 = 'xxxxxxxxx' + (vm.count++);},
        click2: function() { vm.str3 = 'xxxxxxxxx' + (vm.count++);},
        //回调执行顺序
        cbStatus: '',
        cb: function() {this.cbStatus += 'cb > ';},
        cb1: function() {this.cbStatus += 'cb1 > ';},
        cb2: function() {this.cbStatus += 'cb2 > ';},
        //mousewheel事件
        wheelText: '',
        onMousewheel: function(e) {
            this.wheelText = e.wheelDelta + '  ' + e.type;
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter6'] = tpl;
    root.page = tpl;
});