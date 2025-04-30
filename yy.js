function redirectToLanguagePage() {

    var userLang = navigator.language || navigator.userLanguage;


    var langPrefix = userLang.substr(0, 2).toLowerCase();


    switch (langPrefix) {
        case 'es':
            window.location.href = '/index/index/index/lang/xby-cn.html';
            break;
            /*    case 'ko':
               window.location.href = '/index/index/index/lang/hkr-cn.html';
               break;*/
        case 'ja':
            window.location.href = '/index/index/index/lang/jp-cn.html';
            break;
        case 'pt':
            window.location.href = '/index/index/index/lang/pt-cn.html';
            break;
        case 'fa':
            window.location.href = '/index/index/index/lang/bs-cn.html';
            break;
        case 'ar':
            window.location.href = '/index/index/index/lang/alb-cn.html';
            break;
        case 'de':
            window.location.href = '/index/index/index/lang/dg-cn.html';
            break;
        case 'ru':
            window.location.href = '/index/index/index/lang/els-cn.html';
            break;
        case 'pl':
            window.location.href = '/index/index/index/lang/bl.html';
            break;
        case 'it':
            window.location.href = '/index/index/index/lang/it.html';
            break;
        case 'el':
            window.location.href = '/index/index/index/lang/el.html';
            break;
        default:

            window.location.href = '/index/index/index/lang/en-cn.html';
    }
}


if (!sessionStorage.getItem('languageRedirected')) {
    redirectToLanguagePage();

    sessionStorage.setItem('languageRedirected', 'true');
}