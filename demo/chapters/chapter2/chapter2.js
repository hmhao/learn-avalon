define(['avalon', 'text!./chapter2.html'], function(avalon, tpl) {
    var model = avalon.define({
        $id: 'chapter2',
        firstName: '司徒',
        lastName: '正美',
        $computed: {
            //fullName依赖于firstName与lastName
            fullName: {
                set: function(val) {//里面必须用this指向scope，不能使用scope
                    var array = (val || '').split(' ');
                    this.firstName = array[0] || '';
                    this.lastName = array[1] || '';
                },
                get: function() {
                    return this.firstName + ' ' + this.lastName;
                }
            },
            //firstMark只依赖于firstNaem
            firstMark: function(){
                return this.firstName+'!!';
            }
        },
        data: [
            {label:'aaa', checked: false},
            {label:'bbb', checked: false},
            {label:'ccc', checked: false},
            {label:'ddd', checked: false}
        ],
        allchecked: false,
        checkAll: function (e) {
            var checked = e.target.checked;
            this.checkedNum = checked ? this.data.length : 0;
            this.data.forEach(function (el) {
                el.checked = checked;
            })
        },
        checkOne: function (e) {
            var checked = e.target.checked;
            if (checked === false) {
                this.allchecked = false;
            } else {//avalon已经为数组添加了ecma262v5的一些新方法
                this.allchecked = this.data.every(function (el) {
                    return el.checked;
                })
            }
            checked ? this.checkedNum++ : this.checkedNum--;
        },
        checkedNum: 0
    });
    avalon.vmodels.root.page = tpl;
});