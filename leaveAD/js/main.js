/**
 * 返回拦截+动态iframe
 */

(function (window) {

    var _InterceptBox = InterceptBox;

    //返回拦截原型
    function InterceptBox() {}

    InterceptBox.prototype.init = function (opt) {
        this.a1 = document.getElementById(opt.oDiv1);
        this.a2 = document.getElementById(opt.oDiv2);
        this.colseBox = document.getElementById(opt.otar);
        this.onedaytip = document.getElementById(opt.oinput);
        this.mustLeave = document.getElementById(opt.mustLeave);

        this.pushHistory();
        this.listBcak();
        this.closeBOX();
        this.historyBack();
    };

    //添加一个历史记录点
    InterceptBox.prototype.pushHistory = function () {
        if (!window.history.state) {
            window.history.pushState({
                title: document.title,
                url: location.href
            }, document.title, location.href);
        }
    };

    //监听历史记录点
    InterceptBox.prototype.listBcak = function () {
        var that = this;
        setTimeout(function laterTime() {
            window.addEventListener("popstate", function (e) {
                if (e.state) {
                    return false
                } else {
                    that.readTime();
                }
            }, false);
        }, 500)
    };

    //一点返回就读取存储
    InterceptBox.prototype.readTime = function (InterceptTime) {
        this.nowTimes = new Date().getTime();
        this.firtTime = localStorage.getItem('InterceptTime');
        this.dixTime = this.nowTimes - this.firtTime;
        //设置一天的毫秒数86400*1000
        if (!this.firtTime || this.dixTime > 86400000) {
            this.a1.style.display = 'block';
            this.a1.style.top = (document.documentElement.clientHeight - boxA1.offsetHeight) / 2 + 'px';
            this.a1.style.left = (document.documentElement.clientWidth - boxA1.offsetWidth) / 2 + 'px';
            this.a2.style.display = 'block';
        } else {
            this.a1.style.display = 'none';
            this.a2.style.display = 'none';
        }
        this.saveTheTime('InterceptTime');
        if (this.firtTime) {
            window.history.back();
        }
    };

    //今日不在提醒
    InterceptBox.prototype.saveTheTime = function (InterceptTime) {
        var that = this;
        this.onedaytip.onclick = function () {
            that.otheTime = parseInt(new Date().getTime());
            localStorage.setItem(InterceptTime, that.otheTime);
        };
    };

    //关闭盒子
    InterceptBox.prototype.closeBOX = function (InterceptTime) {
        var that = this;
        this.colseBox.onclick = function () {
            that.a1.style.display = 'none';
            that.a2.style.display = 'none';
        };
    };

    InterceptBox.prototype.historyBack = function () {
        this.mustLeave.onclick = function () {
            window.history.back(-1);
        };
    };

    window.InterceptBox = InterceptBox;

})(window);

+function () {
    var initBox = new InterceptBox();

    initBox.init({
        oDiv1: 'boxA1',
        oDiv2: 'boxA2',
        otar: 'closeBox',
        oinput: 'checkloster',
        mustLeave: 'mustLeave'
    });

}();


(function () {
    var _IframeBOX = Iframeopt();

    function Iframeopt() {}

    Iframeopt.prototype.init = function (dom, iframeId, src,vw,vh) {
        this.dom = document.getElementById(dom);
        var iframe = document.createElement("iframe");

        //设置iframe的属性
        iframe.setAttribute('id', iframeId);
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('marginheight', '0');
        iframe.setAttribute('marginwidth', '0');
        iframe.src = src;

        //设置iframe的样式
        iframe.style.width = vw;
        iframe.style.height = vh';
        iframe.style.border = 'none';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.zIndex = '9';
        iframe.style.margin = '0';
        iframe.style.padding = '0';
        iframe.style.marginLeft = '0';
        iframe.style.position = 'absolute';
        iframe.style.overflow = 'hidden';
        iframe.style.overflowY = 'hidden';
        this.dom.appendChild(iframe);
        return iframe;
    };

    window.Iframeopt = Iframeopt;

})();

~function () {
    var IframeBOX = new Iframeopt();
    IframeBOX.init('nm', 'abc', 'https://mdianying.baidu.com/','100vw','100vh');
}();
