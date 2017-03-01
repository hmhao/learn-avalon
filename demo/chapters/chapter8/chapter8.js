define(['avalon', 'text!./chapter8.html'], function(avalon, tpl) {
    var validate = {
        onSuccess: function (reasons) {
            reasons.forEach(function (reason) {
                var elem = avalon(reason.element);
                elem.parent('.control-group').removeClass('error').addClass('success');
                elem.sibling('.help-inline').html('');
            });
        },
        onError: function (reasons) {
            reasons.forEach(function (reason) {
                var elem = avalon(reason.element);
                elem.parent('.control-group').removeClass('success').addClass('error');
                elem.sibling('.help-inline').html(reason.getMessage());
            });
        },
        onValidateAll: function (reasons) {
            if (reasons.length) {
                vm.validate.onError(reasons);
            } else {
                console.log('全部通过');
            }
        }
    };
    var vm = avalon.define({
        $id: 'chapter8',
        aaa: '',
        bbb: '',
        ccc: '',
        validate: validate,
        //
        firstname: 'Hello',
        lastname: '',
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        agree: false,
        topic: [],
        toggle: false,
        validate2: validate
    });

    avalon.validators.checked = {
        message: '必须勾上',
        get: function (value, field, next) {
            next(value);
            return value
        }
    };
    avalon.validators.selecttwo = {
        message: '至少选择两个',
        get: function (value, field, next) {
            next(!vm.toggle || value.length >= 2);
            return value
        }
    };

    var root = avalon.vmodels.root;
    root.$templateCache['chapter8'] = tpl;
    root.page = tpl;
});
var matchExpr = /^([.#])?([\w-]*)$/;
avalon.fn.mix({
    is: function (expr) {
        var isMatch = false;
        var match = matchExpr.exec(expr);
        if(match){
            switch (match[1]){
                case '.': isMatch = this.hasClass(match[2]);break;
                case '#': isMatch = this.attr('id') == match[2];break;
                default: isMatch = new RegExp(match[2], 'i').test(this.element.tagName);
            }
        }
        return isMatch;
    },
    parent: function (selector) {
        var elem = this.element,
            msElem;
        if(elem){
            while((elem = elem.parentNode ) && elem.nodeType !== 9) {
                if ( elem.nodeType === 1 ) {
                    msElem = avalon(elem);
                    if(!selector || msElem.is(selector)){
                        return msElem;
                    }
                }
            }
        }
        return avalon(null);
    },
    sibling: function(selector) {
        var elem = this.element,
            n = elem,
            msElem;
        if(elem){
            for ( ; n; n = n.nextSibling ) {
                if ( n.nodeType === 1 && n !== elem ) {
                    msElem = avalon(n);
                    if(!selector || msElem.is(selector)){
                        return msElem;
                    }
                }
            }
        }
        return avalon(null);
    },
    html: function (value) {
        var elem = this.element;
        if(elem){
            elem.innerHTML = '' + value;
        }
        return this;
    }
});