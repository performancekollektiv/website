//PARAMETERS:
//The middle has no parallax if the following is <1/2
var edgeheight = 22/45;

var imgs = undefined;
var imgposs = [];
var imgzs = [];
var parallaxInterval;
var scrolly=0;
var scrolling = false;
var winh = window.innerHeight, winh2 = window.innerHeight/2;
var pc;
var addingInterval;
window.onload = function(){
    scrolly=window.pageYOffset+winh2
    pc=document.getElementById("pagecontainer");
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
    }
    parallaxInterval= setInterval(doParallax, 100);
    addingInterval= setInterval(adding, 6000);
    scrolling=true;
}

function adding (){
    if (imgs.length>100) return;
    if (Math.random()>.95){
        var obj = imgs[parseInt(Math.random()*imgs.length)]
        console.log(obj+"+++++++");
        var newobj = obj.cloneNode(true)
       document.getElementById("bg").appendChild(newobj);
       newobj.style.transform="rotate("+parseInt(ran(360))+"deg)";
       clearInterval(addingInterval);
       initParallax();
    }
}

function doParallax(){
    for (var i =0; i<imgs.length; i++) {
        var ydiff = scrolly-imgposs[i];
        if (ydiff>winh2*edgeheight) ydiff-=winh2*edgeheight;
        else if (ydiff<0-winh2*edgeheight) ydiff+=winh2*edgeheight;
        else ydiff=0;
        if (ydiff!=0&&Math.abs(ydiff)<winh) imgs[i].style.transform="translate(0px, "+(ydiff*ydiff/20*imgzs[i])+"px)";
    }
    if (scrolly!=window.pageYOffset+winh2) scrolly=window.pageYOffset+winh2; else {clearInterval(parallaxInterval); scrolling = false;}
}






function getY(element) {
    var yPosition = 0;
    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop+ran(10));
        element = element.offsetParent;
    }
    return yPosition;
}

function ran(wid){
    return Math.random()*wid-wid/2;
}