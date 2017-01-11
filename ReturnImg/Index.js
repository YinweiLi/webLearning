/**
 * Created by yinwei on 2017/1/11.
 */
var oBigimg = document.getElementById("big-img");
var aBigImg = oBigimg.getElementsByTagName("img");
var oPrev = document.getElementById("prev");
var oNext = document.getElementById("next");
var oSmall = document.getElementById("small-img");
var aSmall = oSmall.getElementsByTagName("img");
var oInfo = document.getElementById("info");
var oArrows = document.getElementById("arrows");
var oCurrentPage = document.getElementById("current-page");
var oContainer = document.getElementById("container");
var No = 0;
var zIndex = 9;
var T;

oPrev.onmouseover = oNext.onmouseover = function(){
    animate(this,{opacity:100});
};
oPrev.onmouseout = oNext.onmouseout = function(){
    animate(this,{opacity:0});
};
for(var i = 0;i<aSmall.length;i++){
    aSmall[i].style.opacity = .3;
    aSmall[i].style.filter = "alpha(opacity = 30)";
}
aSmall[0].style.opacity = 1;
aSmall[0].style.filter = "alpha(opacity = 100)";
oPrev.onclick = oNext.onclick = function(){

    if(this == oPrev){

        No--;
        if(No == -1){
            No = aSmall.length-1;
        }
    }else{
        No++;
        if(No == aSmall.length){
            No = 0;
        }
    }
    imgChange();
};
for(var i = 0 ; i < aSmall.length ; i++){
    aSmall[i].N = i;
    aSmall[i].onmouseover = function(){
        if(No != this.N){
            No = this.N;
            imgChange();
        }

    };
}
play();
oContainer.onmouseover = function(){
    clearInterval(T);
};
oContainer.onmouseout = function(){
  play();
};
function  play(){
   T = setInterval(function(){
       oNext.onclick();
   },1000)
}
function imgChange(){

    zIndex++;
    aBigImg[No].style.opacity = 0;
    aBigImg[No].style.filter = "alpha(opacity = 0)";
    aBigImg[No].style.zIndex = zIndex;
    oInfo.style.zIndex = zIndex;
    oArrows.style.zIndex = zIndex;
    animate(aBigImg[No],{opacity:100});
    oCurrentPage.innerHTML = No+1;
    for(var i = 0 ;i < aSmall.length;i++){
        aSmall[i].style.opacity = .3;
        aSmall[i].style.filter = "alpha(opacity = 30)";
    }
    aSmall[No].style.opacity = 1;
    aSmall[No].style.filter = "alpha(opacity = 100)";

    var left;
    if(No == 0||No == 1){
        left = 0;
    }else{if(No == aSmall.length-1 || No == aSmall.length-2){
        left = aSmall.length/2;
    }else{
        left = No - 1;
    }
    }
    animate(oSmall,{
        left:-left*aSmall[0].offsetWidth
    });
//    这里没有改，改的是padding，是width包含边框


}