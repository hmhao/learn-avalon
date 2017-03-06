define(['avalon', 'text!./chapter13.html', './pager'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter13',
        pagerConfig1: {
            totalPages: 20,
            size: 'large',
            firstText: avalon.filters.escape('<<'),
            prevText: avalon.filters.escape('<'),
            nextText: avalon.filters.escape('>'),
            lastText: avalon.filters.escape('>>')
        },
        pagerConfig2: {
            showPages: 7,
            totalPages: 25,
            currentPage: 9,
            align: 0,
            firstText: '<i class="icon-fast-backward"></i>',
            prevText: '<i class="icon-step-backward"></i>',
            nextText: '<i class=" icon-step-forward"></i>',
            lastText: '<i class="icon-fast-forward"></i>'
        },
        pagerConfig3: {
            size: 'small',
            align: 1,
            firstText: '首页',
            prevText: '上一页',
            nextText: '下一页',
            lastText: '末页'
        },
        pagerConfig4: {
            size: 'mini',
            align: 1
        },
        pagerConfig5: {
            firstText: '<i class="icon-double-angle-left icon-large"></i>',
            prevText: '<i class="icon-angle-left icon-large"></i>',
            nextText: '<i class="icon-angle-right icon-large"></i>',
            lastText: '<i class="icon-double-angle-right icon-large"></i>'
        }
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter13'] = tpl;
    root.page = tpl;
});