var imgs = undefined;
var imgposs = [];
var imgzs = [];
var parallaxInterval;
var scrolly=0;
var scrolling = false;
var winh = window.innerHeight, winh2 = window.innerHeight/2;
window.onload = function(){
    scrolly=window.pageYOffset+winh2
    var pc=document.getElementById("pagecontainer");
    pc.style.height=""+pc.clientHeight+"px";
    pc.style.overflow="hidden";
window.onscroll=function(){if (!scrolling) initParallax();};
}
function initParallax(){
    winh = window.innerHeight;
    winh2 = window.innerHeight/2;
    if (imgs==undefined) {imgs=document.querySelectorAll(".scrolling");
        for (var i =0; i<imgs.length; i++) imgposs.push(getY(imgs[i])+imgs[i].clientHeight/2);
        for (var i =0; i<imgs.length; i++) {
            if (imgs[i].tagName=="IMG")
                imgzs.push((0-(imgs[i].height)/200*800/winh));
            else imgzs.push((-1)/10/winh*800);
        }
        console.log("IMGZS: "+imgzs.join("———"))
        console.log("IMGPOSS: "+imgposs.join(" ——— "))
    }
    parallaxInterval= setInterval(doParallax, 100);
    scrolling=true;
}

function doParallax(){
    for (var i =0; i<imgs.length; i++) {
        var ydiff = scrolly-imgposs[i];
        if (ydiff>winh2/8*7) ydiff-=winh2/8*7;
        else if (ydiff<0-winh2/8*7) ydiff+=winh2/8*7;
        else ydiff=0;
        if (ydiff!=0&&Math.abs(ydiff)<winh) imgs[i].style.transform="translate(0px, "+(ydiff*ydiff/20*imgzs[i])+"px)";
    }
    if (scrolly!=window.pageYOffset+winh2) scrolly=window.pageYOffset+winh2; else {clearInterval(parallaxInterval); scrolling = false;}
}






function getY(element) {
    var yPosition = 0;
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return yPosition;
}