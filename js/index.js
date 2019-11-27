/**
 * Created by 19715 on 2019/11/14.
 */
$(function () {
   // 1.监听游戏规则的点击
   $(".rules").click(function () {
       $(".rule").stop().fadeIn(100);
   });
//   2.监听关闭按钮的点击
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });
//  3.监听开始游戏按钮的点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
//    调用处理进度条的方法
        progressHandle();
        //调用开始拍打灰太狼的动画
        startWolfAnimation();
    });
    //4.监听重新开始按钮的方法
    $(".reStart").click(function () {
       // 让重新开始界面淡出
       $(".mask").stop().fadeOut(100);
       // 调用控制进度条方法
       progressHandle();
    //   调用灰太狼动画重新开始
        startWolfAnimation();
        //分数清零
        $(".score").text(0);

    });








    //处理游戏进度条的方法
    function progressHandle() {
        //重新定义进度条的长度
        $(".progress").css({
            width: 180
        });
        //开启定时器
        var timer = setInterval(function () {
            //获取进度条的长度
            var progressWidth = $(".progress").width();
            //让进度条长度递减
            progressWidth -= 1;
            //把新的进度条长度给进度条
            $(".progress").css({
                width: progressWidth
            });
            // 判断进度条有没有走完
            if(progressWidth <= 0){
                // 清除定时器
                clearInterval(timer);
                //让重新开始界面淡入
                $(".mask").stop().fadeIn(100);
            //    停止灰太狼动画
                stopWolfAnimation();
            }
        },100);
    }



    //专门处理拍打灰太狼的方法
    var wolfTimer;
    function startWolfAnimation() {
        //定义两个数组保存灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png',
            './images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png',
            './images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png',
            './images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png',
            './images/x9.png'];
        //定义一个数组保存图片可能出现的所有位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"},
        ];

    //    3.创建一个图片
        var $wolfImage = $("<img src='' class='wolfImage'>");
        //随机获取图片的位置
        var posIndex = Math.round(Math.random()*8);
        //设置图片显示的位置
        $wolfImage.css({
            position: "absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        //随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        //设置图片的内容
        //设为全局变量
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            if(wolfIndex>wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },300);
        //添加图片到界面上
        $(".container").append($wolfImage);
    //    调用处理游戏规则的方法
        gameRules($wolfImage);
    }

    //创建游戏规则加减分的方法
    function gameRules($wolfImage) {
        $wolfImage.one("click",function () {

            //修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            //拿到当前点击图片的地址
            var $src = $(this).attr("src");
            //根据图片地址判断是否是灰太狼
            var flag = $src.indexOf("h") >= 0;
            //根据点击的图片类型增减分数
            if(flag){
            //    +10
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
            //    -10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        })
    }
    

    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }

});