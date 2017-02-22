define(['avalon', 'text!./chapter1.html'], function(avalon, tpl) {
    avalon.define({
        $id: 'chapter1',
        username: '司徒正美',
        array: [11,22,33]
    });
    avalon.vmodels.root.page = tpl;
});