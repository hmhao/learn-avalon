define(['avalon', 'text!./chapter5.html'], function(avalon, tpl) {
    var vmodel = avalon.define({
        $id: 'chapter5',
        //ms-if
        curIndex: 0, //默认显示第一个
        buttons: ['tab1', 'tab2', 'tab3'],
        panels: ["<a class='btn btn-primary'>面板1</a>", "<p>面板2</p>", "<p><strong>面板3</strong></p>"],
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
            borderColor: "red",
            borderStyle: "solid",
            backgroundColor: "gray"
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter5'] = tpl;
    root.page = tpl;
});