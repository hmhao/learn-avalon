define(['avalon', 'text!./chapter5.html'], function(avalon, tpl) {
    var vmodel = avalon.define({
        $id: 'chapter5',
        //ms-if
        curIndex: 0, //默认显示第一个
        buttons: ['tab1', 'tab2', 'tab3'],
        panels: ['<a class="btn btn-primary">面板1</a>', '<p>面板2</p>', '<p><strong>面板3</strong></p>'],
        //ms-active和ms-hover
        array: avalon.range(0, 8),
        array2: [{arr: [1,2,3]},{arr: [4,5,6]},{arr: [7,8,9]}],
        limit: 2,
        order: -1,
        dataForRendered: function (event) {
            //如果指令中(html)不传参，默认第一个参数为事件对象
            // 类型type为rendered， target为当前循环区域的父节点，这里为 ul 元素
            // 回调中的this指向vm
            event.target;
        },
        styles: {
            width: 200,
            height: 200,
            borderWidth: 1,
            borderColor: 'red',
            borderStyle: 'solid',
            backgroundColor: 'gray'
        },
        header: ['name','age','sex'],
        list: [],
        renderTime:0
    });

    var interval = new function (vm) {
        var sexMap = {
                'true': '男',
                'false': '女'
            },
            genData = function (n){
                var ret = [];
                for(var i =0 ; i< n; i++){
                    ret.push({
                        name: Math.random(),
                        age: 3+ Math.ceil((Math.random() *30)),
                        sex: sexMap[1-Math.random() > 0.5],
                        desc: Math.random()
                    })
                }
                return ret
            };
        var _interval;
        return {
            run: function () {
                _interval = setInterval(function() {
                    var t = Date.now();
                    vm.list = genData(100);
                    vm.renderTime = Date.now() - t;
                }, 50);
            },
            stop: function () {
                clearInterval(_interval);
            }
        }
    }(vmodel);

    var root = avalon.vmodels.root;
    root.$templateCache['chapter5'] = tpl;
    root.page = tpl;
    root.$watch('page', function (newValue, oldValue) {
        if(newValue == tpl){
            interval.run()
        }else{
            interval.stop();
        }
    });
    interval.run();
});