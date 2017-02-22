require(['avalon', "domReady!"], function() {
    avalon.define({
        $id: 'root',
        header: 'Avalon2学习',
        footer: '',
        navs: {
            chapter1:'初体验',
            chapter2:'模块化、ViewModel、作用域',
        },
        selected:'',
        page:'',
        router: function (chapter) {
            require(['./chapters/' + chapter + '/'+ chapter + '.js'], function() {//第三块，加载其他模块
                avalon.log(chapter + '加载其他完毕');
            });
            this.selected = chapter;
        }
    });
    avalon.scan(document.body);
    avalon.vmodels.root.router('chapter1');
});