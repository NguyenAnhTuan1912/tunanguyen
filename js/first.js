/*const headerName = document.getElementsByClassName("header__name__container");
const navi = document.getElementsByClassName("header__navigate__row-1__col");
const dotIndex = document.getElementsByClassName("indexdot__containner__dot");
const footerPageName = document.getElementsByClassName("footer__text__container__name");
const footerWebName = document.getElementsByClassName("footer__name__container__name");*/
const oneAwork = document.getElementsByClassName("artwork-svg");


const oneVideo = document.getElementById("one");
/*
//Sap xep vi tri ban dau cho ten cua header
headerName[0].style.transform = 'translateX(-120px)';

//Sap xep vi tri ban dau cho cac option cua navigator bar
navi[0].style.transform = 'translateY(-60px)';
navi[1].style.transform = 'translateY(-80px)';
navi[2].style.transform = 'translateY(-100px)';

//Sap xep vi tri ban dau cho cac dot
dotIndex[0].style.transform = 'translateX(60px)';
dotIndex[1].style.transform = 'translateX(60px)';
dotIndex[2].style.transform = 'translateX(60px)';

//Sap xep vi tri ban dau cho cac chu trong footer
footerPageName[0].style.transform = 'translateX(200px)';
footerWebName[0].style.transform = 'translateX(-300px)';

//An cac khoi body o duoi
document.getElementsByClassName("body__part-2")[0].style.display = 'none';
document.getElementsByClassName("body__part-3")[0].style.display = 'none';

//Phong to video
oneVideo.style.width = 640 + 'px';
oneVideo.style.height = 640 + 'px';

//Artwork
oneAwork[0].style.width = 640 + 'px';
oneAwork[0].style.height = 640 + 'px';
oneAwork[0].src = '../Main/IMAGE/SVG/temple_body-01.svg';
oneAwork[0].style.opacity = 0;

oneAwork[1].style.width = 640 + 'px';
oneAwork[1].style.height = 640 + 'px';
oneAwork[1].src = '../Main/IMAGE/SVG/temple_head-01.svg';
oneAwork[1].style.opacity = 0;
*/

oneAwork[0].style.opacity = 0;
oneAwork[0].style.width = 480 + 'px';
oneAwork[0].style.height = 480 + 'px';
oneAwork[0].src = '../Main/IMAGE/SVG/temple_body-01.svg';
oneAwork[1].style.opacity = 0;
oneAwork[1].style.width = 480 + 'px';
oneAwork[1].style.height = 480 + 'px';
oneAwork[1].src = '../Main/IMAGE/SVG/temple_head-01.svg';

oneVideo.onended = function() {
    oneAwork[0].style.opacity = 1;
    oneAwork[1].style.opacity = 1;
    
    setTimeout(function() {
        //An video
        oneVideo.style.opacity = 0;
        /*
        //Ten tren header
        headerName[0].style.transition = 'ease-in-out 0.2s';
        headerName[0].style.transform = 'translateX(0)';

        navi[0].style.transition = 'ease-in-out 0.2s';
        navi[1].style.transition = 'ease-in-out 0.2s';
        navi[2].style.transition = 'ease-in-out 0.2s';
        navi[0].style.transform = 'translateY(0)';
        navi[1].style.transform = 'translateY(0)';
        navi[2].style.transform = 'translateY(0)';

        //Hien file svg
        oneAwork[0].style.transition = 'ease-in-out 0.2s';
        oneAwork[1].style.transition = 'ease-in-out 0.2s';
        oneAwork[0].style.width = 480 + 'px';
        oneAwork[0].style.height = 480 + 'px';
        oneAwork[1].style.width = 480 + 'px';
        oneAwork[1].style.height = 480 + 'px';

        //Cham
        dotIndex[0].style.transition = 'ease-in-out 0.2s';
        dotIndex[1].style.transition = 'ease-in-out 0.2s';
        dotIndex[2].style.transition = 'ease-in-out 0.2s';
        dotIndex[0].style.transform = 'translateX(0)';
        dotIndex[1].style.transform = 'translateX(0)';
        dotIndex[2].style.transform = 'translateX(0)';

        //Ten duoi footer
        footerPageName[0].style.transition = 'ease-in-out 0.2s';
        footerWebName[0].style.transition = 'ease-in-out 0.2s';

        footerPageName[0].style.transform = 'translateX(0px)';
        footerWebName[0].style.transform = 'translateX(0px)';

        document.getElementsByClassName("body__part-2")[0].style.display = 'block';
        document.getElementsByClassName("body__part-3")[0].style.display = 'block';
        */
    }, 500);
}
