if (!Date.now) {//fix 旧式IE
    Date.now = function() {
        return new Date - 0;
    }
}

require(['avalon', "domReady!"], function() {
    var model = avalon.define({
        $id: 'root',
        $templateCache:{},
        header: 'Avalon2学习',
        footer: '',
        navs: {
            chapter1:'初体验',
            chapter2:'vm',
            chapter3:'attr | css | visible',
            chapter4:'class | active | hover',
            chapter5:'if | for',
            chapter6:'on',
            chapter7:'duplex',
            chapter8:'rules | validate',
            chapter9:'widget',
            chapter10:'effect',
            chapter11:'过滤器',
            chapter12:'组件:弹出层',
            chapter13:'组件:分页',
            chapter14:'组件:切换标签页'
        },
        selected:'',
        code: '',
        showCode: false,
        page:'',
        router: function (chapter) {
            this.selected = chapter;
            var url = './chapters/' + chapter + '/'+ chapter + '.js';
            require(['text!'+url, url], function(code) {//第三块，加载其他模块
                avalon.log(chapter + '加载其他完毕');
                model.code = code;
                model.page = model.$templateCache[chapter];
            });
        }
    });
    avalon.scan(document.body);
    model.router('chapter14');
});