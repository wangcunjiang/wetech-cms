$(function () {
    /*------------ scroll loading ------------*/
    var range = 50;             //距下边界长度/单位px
    var elemt = 500;           //插入元素高度/单位px
    var maxnum = 100;            //设置加载最多次数
    var num = 0;
    var totalheight = 0;
    var $main = $('#topicList');                     //主体元素
    var $loading = $('#loading');
    var done = true;

    function getData() {
        if (done == true) {
            done = false;
            $loading.append('<button class="am-btn am-btn-xs am-btn-default am-radius am-btn-block"> <span class="am-icon-spinner am-icon-spin"></span>&nbsp;&nbsp;加载中&nbsp;&nbsp;</button>');
            $.post(contextPath + '/scrollLoading', {start: num++, length: 20}, function (data) {
                $main.append(data);
                $.getScript(contextPath + '/resources/amazeui/assets/js/amazeui.min.js');
                done = true;
                $loading.children().remove();
            });
        }
    }

    getData(num); //第一次加载
    $(window).scroll(function () {
        var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
        // console.log('滚动条到顶部的垂直高度: ' + $(document).scrollTop());
        // console.log('页面的文档高度 ：' + $(document).height());
        // console.log('浏览器的高度：' + $(window).height());
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        if (($(document).height() - range) <= totalheight && num != maxnum) {
            getData();
        }
    });
});