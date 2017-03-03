define(['avalon', 'text!./modal.html', 'css!./modal.css'], function(avalon, tpl) {
    avalon.effect('modal');
    avalon.component('ms-modal', {
        template: tpl,
        defaults: {
            title: 'modal',
            isShow: false,
            cbProxy: function (ok) {
                var cbName = ok ? 'onOk' : 'onCancel';
                if (this.hasOwnProperty(cbName)) {
                    var ret = this[cbName]();
                    if (ret !== false || (ret && typeof ret.next === 'function')) {
                        this.isShow = false;
                    }
                } else {
                    this.isShow = false;
                }
            },
            enterDone: function (elem) {
            },
            leaveDone: function (elem) {
                avalon(elem).css('display', 'none');
            },
            onReady: function () {
                this.$watch('isShow', function (value) {
                    if(value){
                        avalon(this.$element).css('display', '');
                        document.body.style.overflow = 'hidden';
                    }else{
                        document.body.style.overflow = '';
                    }
                });
            },
            //事件回调声明占位，否则外部事件方法不会合并到当前vm，也就上面cbProxy中的hasOwnProperty判断总是假
            onCancel: avalon.noop,
            onOk: avalon.noop
        },
        soleSlot: 'content'
    });
});