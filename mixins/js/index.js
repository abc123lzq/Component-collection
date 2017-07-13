/**
 * Created by lzq on 2017/7/13.
 * 事件元素拖动
 */

(function (window, undefined) {
    var Drangd_ = Drang;

    function Drang() {
        this.obj = null;
        this.disX = 0;
        this.dixY = 0;
        this.settings = {
            event: 'touchstart'
        }
    }

    Drang.prototype.init = function (opt) {
        extend(this.settings, opt);//配置赋给默认
        this.obj = document.getElementsByClassName(opt.id)[0];
        this.objs = document.getElementsByClassName(opt.ids)[0];
        var that = this;
        this.obj.addEventListener(this.settings.event, function (ev) {
            that.show(ev, that)
        });
    };
    Drang.prototype.show = function (ev, that) {
        var ev = ev || window.event;
        that.fuDown(ev);
        that.fnmoves = function (ev) {
            that.fnMove(ev);
        };
        that.fnups = function (ev) {
            that.fnUp(ev);
            return false
        };
        document.addEventListener('touchmove', that.fnmoves, false);

        document.addEventListener('touchend', that.fnups, false);
    };
    Drang.prototype.fuDown = function (ev) {
        this.disX = ev.touches[0].pageX - this.obj.offsetLeft;
        this.offWidths = this.obj.offsetWidth;
    };
    Drang.prototype.fnMove = function (ev) {
        var that = this;
        var disLeft = ev.touches[0].pageX - this.disX;
        //设置超出距离
        disLeft < -(this.offWidths - that.objs.offsetWidth) ? this.obj.style.left = -(this.offWidths - that.objs.offsetWidth) + "px" : disLeft > 0 ? this.obj.style = 0 + 'px' : this.obj.style.left = disLeft + 'px';
    };
    Drang.prototype.fnUp = function () {
        var that = this;
        document.removeEventListener('touchmove', that.fnmoves, false);
        document.removeEventListener('touchend', that.fnups, false)
    };

    function extend(obj1, obj2) {
        for (var attr in obj2) {
            obj1[attr] = obj2[attr];
        }
    }

    window.Drang = Drang;
})(window, undefined);

// 调用处

(function (Drang) {
    var Drangd1 = new Drang();
    Drangd1.init({   //配置参数 opt
        ids: 'db', //父级
        id: 'dv',//滚动条
        event: 'touchstart'//事件
    });

})(Drang);


/***
 * lzq 限制条数显示更多
 */
+function () {
    var astrict_ = astrict;

    function astrict() {
        this.settings = {
            event: 'touchstart'
        }
    }


    astrict.prototype.init = function (opt) {
        var that = this;
        that.createGM = document.getElementsByClassName('create-gm');
        that.oDiv = document.getElementsByClassName(opt.oDiv);
        that.sbb = null;
        that.aul = [];
        that.ali = [];
        that.count = opt.count - 1;

        that.hideInit();
        that.creatMore();

        for (var i = 0; i < that.oDiv.length; i++) {
            +function (ali, i) {
                that.changeSlide(ali, i)
            }(that.ali, i);
        }


    };

    astrict.prototype.creatMore = function () {
        var that = this;
        for (var i = 0; i < that.oDiv.length; i++) {
            var getMore = document.createElement('p');
            getMore.style.textAlign = 'center';
            getMore.style.width = '100%';
            getMore.style.height = '22px';
            getMore.style.fontSize = '14px';
            getMore.setAttribute('class', 'create-gm');
            getMore.setAttribute('on', 'true');
            getMore.style.lineHeight = '22px';
            getMore.style.marginTop = '10px';
            getMore.innerHTML = '加载更多';
            that.oDiv[i].appendChild(getMore);
        }


    };


    astrict.prototype.hideInit = function () {
        var that = this;
        for (var i = 0; i < that.oDiv.length; i++) {
            that.aul.push(that.oDiv[i].getElementsByTagName('ul')[0]);
            that.oli = that.aul[i].getElementsByTagName('li');
            that.ali.push(that.aul[i].getElementsByTagName('li'));
            for (var j = 0; j < that.oli.length; j++) {
                if (j > that.count) { //参数
                    that.oli[j].style.display = 'none';
                }
            }
        }

    };

    astrict.prototype.changeSlide = function (ali, i) {
        var that = this;
        that.createGM[i].onclick = function () {
            for (var j = 0; j < ali[i].length; j++) {
                if (j > that.count && this.getAttribute('on') === 'true') { //参数
                    ali[i][j].style.display = '';
                    if (j >= (ali[i].length) - 1) {
                        this.setAttribute('on', 'false');
                        this.innerHTML = '收起内容';
                    }
                } else if (j > that.count && this.getAttribute('on') === 'false') {
                    ali[i][j].style.display = 'none';
                    if (j >= (ali[i].length) - 1) {
                        this.innerHTML = '加载更多';
                        this.setAttribute('on', 'true');
                    }
                }
            }
        }


    };


    window.astrict = astrict;

}();

(function (astrict) {
    var astrict1 = new astrict();
    astrict1.init({
        oDiv: 'game-match-tab-con',//ul父级div{className}
        count: '3'//限制超出多少个隐藏

    });
})(astrict);


/**
 * tab选项卡
 */
(function () {
    var Tab_ = Tab();

    function Tab() {
        this.obj = null;
    }

    Tab.prototype.init = function (opt) {
        this.obj = document.getElementById(opt.oul);
        this.oLi = this.obj.getElementsByTagName('li');
        this.oDiv = document.getElementsByClassName(opt.odiv);
        this.changeStyle();
    };

    Tab.prototype.changeStyle = function () {
        for (var i = 0; i < this.oLi.length; i++) {
            this.oLi[i].index = i;
            var that = this;
            this.oLi[i].onclick = function () {
                that.revertStyle(that);
                if (that.oDiv.length > 1) {
                    that.oDiv[this.index].style.display = 'block';
                }
                this.className = 'hover';
            }
        }
    };

    Tab.prototype.revertStyle = function (that) {
        for (var j = 0; j < that.oLi.length; j++) {
            that.oDiv[j].style.display = 'none';
            that.oLi[j].className = '';
        }
    };
    window.Tab = Tab;
})();


(function (Tab) {
    var TAB1 = new Tab();
    TAB1.init({
        oul: 'tabUl2',
        odiv: 'game-match-tab-con'
    });

})(Tab);




