define(['avalon', 'text!./chapter3.html'], function(avalon, tpl) {
    var vmodel = avalon.define({
        $id: 'chapter3',
        //ms-attr
        'attrA':1,
        'attrB':2,
        'attrC':3,
        'attrD':4,
        'fn': function (c, d) {
            return c + d;
        },
        'attrObj': {title: '普通对象', algin: 'left'},
        title:'',
        active: {title: '激活'},
        attrToggle: false,
        //ms-style
        fs: 24,
        cssObj: {backgroundColor: '#3bb0d0',width:300, height:50, 'text-align': 'center'},//属性名带-,必须用引号括起
        percent: 0,
        imgs: [{
            url:'./chapters/chapter3/directives1.png',
            show:true
        }, {
            url:'./chapters/chapter3/directives2.jpg',
            show:false
        }],
        //ms-visible
        visibleToggle: true
    });

    var interval = new function (vm) {
        var flag = true;
        var _interval;
        return {
            run: function () {
                _interval = setInterval(function() {
                    if (flag) {
                        vm.percent < 100 ? vm.percent++ : flag = false;
                    } else {
                        vm.percent > 0 ? vm.percent-- : flag = true;
                    }
                }, 100);
            },
            stop: function () {
                clearInterval(_interval);
            }
        }
    }(vmodel);

    var root = avalon.vmodels.root;
    root.$templateCache['chapter3'] = tpl;
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