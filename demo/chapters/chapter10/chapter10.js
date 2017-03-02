define(['avalon', 'text!./chapter10.html'], function(avalon, tpl) {
    avalon.effect('animate');//注册特效
    avalon.effect('wave', {
        enterClass: 'wave-left',
        enterActiveClass: 'wave-left-active',
        leaveClass: 'wave-right',
        leaveActiveClass: 'wave-right-active'
    });
    avalon.component('ms-button', {
        template: '<button type="button"><span><slot name="buttonText"></slot></span></button>',
        defaults: {
            buttonText: 'button'
        },
        soleSlot: 'buttonText'
    });
    avalon.effect('zoom', {
        enter: function (el, done) {
            avalon(el).css({width: 50, height: 50}).animate({
                width: 100, height: 100
            }, 1000, done);
        },
        leave: function (el, done) {
            avalon(el).animate({
                width: 50, height: 50
            }, 1000, done);
        }
    });
    var vm = avalon.define({
        $id: 'chapter10',
        animateAction: 'enter',
        waveAction: 'enter',
        enterCb: function(){
            avalon.log('动画完成');
        },
        leaveCb: function(){
            avalon.log('动画回到原点');
        },
        //
        arr: [1,2,3],
        aaa: 222,
        toggle: true
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter10'] = tpl;
    root.page = tpl;
});

avalon.fn.mix({
    getStyle: function (prop) {
        var elem = this.element;
        var style = elem.currentStyle || window.getComputedStyle(elem, '');
        if (elem.style.filter) {
            return elem.style.filter.match(/\d+/g)[0];
        }
        return style[prop];
    },
    setStyle: function (prop, val) {
        var elem = this.element;
        switch (prop) {
            case 'opacity':
                elem.style[prop] = val;
                elem.style.filter = 'alpha(opacity=' + val * 100 + ')';
                break;
            default:
                elem.style[prop] = val + 'px';
                break;
        }
    },
    animate: function (prop, duration, fn) {
        var $animate = this.$animate;
        if(!$animate){
            this.$animate = $animate = {};
        }else{
            clearInterval($animate.timer);
        }
        $animate.elem = this.element;
        $animate.prop = prop;
        $animate.duration = duration || 1000;
        $animate.tween = function(t, b, c, d) {
            return t * c / d + b;
        };
        $animate.fps = 60;
        $animate.curframe = 0;
        $animate.frames = Math.ceil($animate.duration * $animate.fps/1000);
        $animate.state = {};
        var from, to;
        for (var p in prop) {
            from = parseFloat(this.getStyle(p));
            to = parseFloat(prop[p]);
            $animate.state[p] = {
                from: from,
                to: to,
                diff: to - from
            };
        }
        $animate.timer = setInterval(function(){
            var $animate = this.$animate,
                state = $animate.state;
            if ($animate.curframe >= $animate.frames) {
                for(var prop in state) {
                    this.setStyle(prop, state[prop].to);
                }
                clearInterval($animate.timer);
                return fn && fn();
            }
            $animate.curframe++;
            var ds;
            for(var prop in state) {
                ds = $animate.tween($animate.curframe,
                    state[prop].from,
                    state[prop].diff,
                    $animate.frames).toFixed(2);
                this.setStyle(prop, ds);
            }
        }.bind(this), 1000 / $animate.fps);
    }

});
