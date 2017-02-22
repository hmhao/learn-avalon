require(['avalon', "domReady!"], function() {
    var model = avalon.define({
        $id: 'root',
        header: 'Avalon2学习',
        footer: '',
        navs: {
            chapter1:'初体验',
            chapter2:'模块化、ViewModel、作用域',
        },
        selected:'',
        code: '',
        page:'',
        router: function (chapter) {
            this.selected = chapter;
            var url = './chapters/' + chapter + '/'+ chapter + '.js';
            require(['text!'+url, url], function(code) {//第三块，加载其他模块
                avalon.log(chapter + '加载其他完毕');
                model.code = code;
            });
        }
    });
    avalon.scan(document.body);
    model.router('chapter2');
});