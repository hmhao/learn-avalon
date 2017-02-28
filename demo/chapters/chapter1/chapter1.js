var map = {
    "中国": ["江南四大才子", "初唐四杰", "战国四君子"],
    "日本": ["日本武将", "日本城堡", "幕府时代"],
    "欧美": ["三大骑士团", "三大魔幻小说", "七大奇迹"],
    "江南四大才子": ["祝枝山", "文征明", "唐伯虎", "周文宾"],
    "初唐四杰": ["王勃", "杨炯", "卢照邻", "骆宾王"],
    "战国四君子": ["楚国春申君黄歇", "齐国孟尝君田文", "赵国平原君赵胜", "魏国信陵君魏无忌"],
    "日本武将": ["织田信长", "德川家康", "丰臣秀吉"],
    "日本城堡": ["安土城", "熊本城", "大坂城", "姬路城"],
    "幕府时代": ["镰仓", "室町", "丰臣", "江户"],
    "三大骑士团": ["圣殿骑士团", "医院骑士团", "条顿骑士团"],
    "三大魔幻小说": ["冰与火之歌", "时光之轮", "荆刺与白骨之王国"],
    "七大奇迹": ["埃及胡夫金字塔", "奥林匹亚宙斯巨像", "阿尔忒弥斯月神殿", "摩索拉斯陵墓", "亚历山大港灯塔", "巴比伦空中花园", "罗德岛太阳神巨像"]
}
define(['avalon', 'text!./chapter1.html'], function(avalon, tpl) {
    var vm = avalon.define({
        $id: 'chapter1',
        firstName: 'Hello',
        lastName: 'World',
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
        checkedNum: 0,
        //
        first: ['中国', '日本', '欧美'],
        second: map['中国'].concat(),
        third: map['初唐四杰'].concat(),
        firstSelected: '中国',
        secondSelected: '初唐四杰',
        thirdSelected: '骆宾王'
    });
    vm.$watch('firstSelected', function (a) {
        vm.second = map[a].concat();
        vm.secondSelected = vm.second[0]
    });
    vm.$watch('secondSelected', function (a) {
        vm.third = map[a].concat();
        vm.thirdSelected = vm.third[0]
    });

    avalon.define({
        $id: "chapter1-a",
        name: "liger",
        color: "green"
    });
    avalon.define({
        $id: "chapter1-b",
        name: "sphinx",
        color: "red"
    });
    avalon.define({
        $id: "chapter1-c",
        name: "dragon" //不存在color
    });
    avalon.define({
        $id: "chapter1-d",
        name: "sirenia" //不存在color
    });

    var root = avalon.vmodels.root;
    root.$templateCache['chapter1'] = tpl;
    root.page = tpl;
});