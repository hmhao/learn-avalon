define(['avalon', 'text!./pager.html'], function(avalon, tpl) {
    avalon.component('ms-pager', {
        template: tpl,
        defaults: {
            $disable:{},//存放first, last, prev, next的disabled状态
            showPages: 5,//要显示出来的页数
            pages: [],
            totalPages: 15,//总页数
            currentPage: 1,//当前页
            size: '',//尺寸 '' | 'large' | 'small' | 'mini'
            align: -1,//对齐 -1:左 | 0:中 | 1:右
            rpage: /(?:#|\?)page\-(\d+)/,
            firstText: 'First',
            prevText: 'Previous',
            nextText: 'Next',
            lastText: 'Last',
            isDisabled: function (name, page) {
                return this.$disable[name] = (this.currentPage === page);
            },
            cbProxy: function (evt, p) {
                var cur = this.toPage(p);
                if (this.$disable[p] || p === this.currentPage) {
                    evt.preventDefault();
                    return; //disabled, active不会触发
                }
                this.render(cur);
                return this.onPageClick(evt, p);
            },
            render: function (cur) {/*更新页码*/
                var obj = this.getPages(cur);
                this.currentPage = obj.currentPage;
                this.pages = obj.pages;
            },
            toPage: function (p) {
                var cur = this.currentPage;
                var max = this.totalPages;
                switch (p) {
                    case 'first':
                        return 1;
                    case 'prev':
                        return Math.max(cur - 1, 1);
                    case 'next':
                        return Math.min(cur + 1, max);
                    case 'last':
                        return max;
                    default:
                        return p;
                }
            },
            getPages: function(currentPage) {//中间显示页数的计算
                var pages = [];
                var s = this.showPages;
                var total = this.totalPages;
                var half = Math.floor(s / 2);
                var start = currentPage - half + 1 - s % 2;
                var end = currentPage + half;

                // handle boundary case
                if (start <= 0) {
                    start = 1;
                    end = s;
                }
                if (end > total) {
                    start = total - s + 1;
                    end = total;
                }

                var itPage = start;
                while (itPage <= end) {
                    pages.push(itPage);
                    itPage++
                }

                return {currentPage: currentPage, pages: pages};
            },
            getHref: function (href) {
                return '#page-' + this.toPage(href);
            },
            getTitle: function (title) {
                return title;
            },
            onInit: function (evt) {
                var cur = this.currentPage;
                var rpage = this.rpage;
                //直接从地址栏得到当前页参数
                var match = (avalon.type(rpage)=='regexp'?rpage:new RegExp(rpage)).exec(location.href);
                if (match && match[1]) {
                    cur = ~~match[1];
                    if (cur < 0 || cur > this.totalPages) {
                        cur = 1;
                    }
                }
                this.render(cur);
            },
            onPageClick: avalon.noop//事件回调声明占位,让用户重写
        }
    });
});