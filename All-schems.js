    /*#############################*/
    /*####### MICROMARKING ########*/
    /*#############################*/

    // https://docs.google.com/document/d/1rYyVXeqLi5h4DQeJ9SwQS8FSVmUtaoPvKi_NO6Ptlws/edit?pli=1
    // Инструкция для общего понимания...

    // Данный скрипт дропаем в футер сайта, и обязательно указываем атрибут defer ссылке

const URL_PAGE = document.location.pathname;  // URL данной стр
const URL_NOW = URL_PAGE.split('/');
const HEAD = document.getElementsByTagName('head')[0];
const TITLE = document.title;

    /*#############################*/
    /*########## WebSite ##########*/
    /*#############################*/


    function WebSite(URL) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": URL,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${URL}search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        });
        HEAD.appendChild(script);
    }


    /*#############################*/
    /*###### BreadcrumbList #######*/
    /*#############################*/


    function BreadcrumbList() {
        const wrapperBreadList = document.querySelectorAll('.breadcrumb__link'); // Выбираем хлебные крошки, берем родителя а далее > *
        let i = 1;
        if (wrapperBreadList.length > 0) { // Скрываем от главной и других одиночных страниц
            const breadArrey = Array.from(wrapperBreadList).map((e, i) => {
                return {
                    "@type": "ListItem",
                    "position": i++,
                    "name": e.innerText || "Главная",
                    "item": e.href || window.location.href
                };
            });
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadArrey
            });
            HEAD.appendChild(script);
        }
    }



    /*#############################*/
    /*## MedicalScholarlyArticle ##*/
    /*#############################*/

function MedicalScholarlyArticle() {


        let ARR_CATEGORY = ['stati']; // Если нужно что бы работало на определенной категории сайта, вставляем его URL
        let arr = document.querySelectorAll('.header-nav-list__content .header-nav-list__link'); // Получаем все категории где должно работать
        arr.forEach(el => {
            let urlLINK = el.href.split('/');
            ARR_CATEGORY.push(urlLINK[3]); // Пушим в массив URL категорий где выводить микроразметку
        });
        //console.log(ARR_CATEGORY);
        if (ARR_CATEGORY.includes(URL_NOW[1])) {
            // Далее подставляем нужные селекторы ...
            let urlDoc = document.querySelector('.inside-tips__container > p > i > a').href;
            let nameDoc = document.querySelector('.inside-tips__container > p > i > a').textContent;
            let dateModified = document.querySelector('.inside-tips__container > p:nth-child(6)').textContent;
            let headline = document.querySelector('h1');

            let objDoc =
                {
                    "@context": "http://schema.org",
                    "@type": "MedicalScholarlyArticle",
                    "audience": {
                        "@type": "Audience",
                        "url": "https://schema.org/Clinician"
                    },
                    "name": TITLE,
                    "headline": headline,
                    "dateModified": dateModified,
                    "author": {
                        "@type": "Person",
                        "url": urlDoc,
                        "name": nameDoc,
                        "jobTitle": "Психиатр-нарколог"
                    }
                }

            let scriptPrice = document.createElement('script')
            scriptPrice.type = 'application/ld+json'
            scriptPrice.textContent = JSON.stringify(objDoc);
            HEAD.appendChild(scriptPrice);
        }
    }


    /*#############################*/
    /*#### MedicalOrganization ####*/
    /*#############################*/

function MedicalOrganization() {
    const ADRES_DOC = document
        .querySelector('.header-location__text').textContent.toString(); // Подставляем селектор поля адресса
    const URL = `https://${document.domain}/netcat_template/template/17/build/static/img/logo-white.svg`; // URL логотипа
    // Остальные данные подставляем вручную по инструкции ...
    let obj =
    {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Наркологическая клиника «Ваш доктор»",
        "alternateName": "Narkologicheskaya klinika «Vash doktor»",
        "url": document.location.href,
        "telephone": "8 (499) 113-06-23",
        "email": "mailto:info@your-doc.moscow",
        "logo": {
            "@type":"ImageObject",
            "@id": URL,
            "url": URL
        },
        "image": URL,
        "aggregateRating": {
            "@type": "AggregateRating",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "11",
            "ratingValue": "4.9"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": ADRES_DOC,
            "addressLocality": ADRES_DOC,
            "addressCountry": "Россия"
        },
        "sameAs": [
            "http://t.me/moscow_doc_bot",
            "https://vk.com/public218729164",
            "https://ok.ru/group/70000002190224"
        ]
    }
    let scriptDoc = document.createElement('script');
    scriptDoc.type = 'application/ld+json';
    scriptDoc.textContent = JSON.stringify(obj);
    HEAD.appendChild(scriptDoc);
}


    /*#############################*/
    /*########## FAQPage ##########*/
    /*#############################*/

function FAQPage() {

    let ARR_FAQ = ['faq']; // Если нужно что бы работало на определенной категории сайта, вставляем его URL

    if (ARR_FAQ.includes(URL_NOW[1])) {
        // Подставляем нужные селекторы соответствущих полей
        let question = document.querySelectorAll('.panel-title_wrapper .panel-title');
        let answerMy = document.querySelectorAll('.collapse_text p');

        let headDoc = document.getElementsByTagName('head')[0];

        if (question.length > 0) {
            let object = {};
            for (let i = 0; i < question.length; i++) {
                object[question[i].textContent] = answerMy[i].textContent
            }
            let aa = {
                "@context": "http://schema.org",
                "@type": "FAQPage",
                "mainEntity": []
            };
            for (let item in object) {
                aa.mainEntity.push({
                    "@type": "Question",
                    "name": `${item}`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `${object[item]}`
                    }
                });
            }
            let scriptDoc = document.createElement('script');
            scriptDoc.type = 'application/ld+json';
            scriptDoc.textContent = JSON.stringify(aa);
            HEAD.appendChild(scriptDoc);
        }
    }
}

    /*#############################*/
    /*########## Product ##########*/
    /*#############################*/

function Product() {

    let ARR_PRICE = ['price'];
    let arr1 = document.querySelectorAll('.header-nav-list__content .header-nav-list__link');
    arr1.forEach(el => {
        let urlLINK = el.href.split('/');
        ARR_PRICE.push(urlLINK[3]); // Массив URL-лов категорий для вывода микроразметки
    });

    if (ARR_PRICE.includes(URL_NOW[1])) {
        // Подставляем нужные селекторы соответствущих полей
        let tablePirce = document.querySelectorAll('.table .name_prodict');
        let tableText = document.querySelectorAll('.table .price_prodict');

        let questionObjectDoc = {}
        for (let i = 0; i < tablePirce.length; i++) {
            questionObjectDoc[tablePirce[i].textContent] = tableText[i].textContent;
        }
        for (let item in questionObjectDoc) {
            let objDoc =
                {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "name": `${item}`,
                    "image": `https://${document.domain}/netcat_template/template/17/build/static/img/logo-white.svg`,
                    "description": `${item} в городе ${document.querySelector('.header-location__text').textContent.toString()}`,
                    "brand": {
                        "@type": "Brand",
                        "name": "Наркологическая клиника «Ваш доктор»"
                    },
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "RUB",
                        "price": Number(questionObjectDoc[item].replace(/[^+\d]/g, '')),
                        "availability": "https://schema.org/InStock",
                        "itemCondition": "https://schema.org/NewCondition"
                    }
                };
            let scriptPrice = document.createElement('script');
            scriptPrice.type = 'application/ld+json';
            scriptPrice.textContent = JSON.stringify(objDoc);
            HEAD.appendChild(scriptPrice);
        }
    }
}

    /*#############################*/
    /*######### Physician #########*/
    /*#############################*/

    let ARR_PHY = ['staff'];

    if (ARR_PHY.includes(URL_NOW[1]) && URL_NOW[2] !== '') {
        const NAME_DOC = document.querySelector('.personal-hero__name').textContent;
        const URL_DOC = document.location.href;
        const URL_FOTO_DOC = document.location.href;
        const DES_DOC = document.querySelector('.personal__text').textContent;
        const ADDRESS_DOC = document.querySelector('.header-location__text').textContent.toString();

        Physician(NAME_DOC, URL_DOC, URL_FOTO_DOC, DES_DOC, ADDRESS_DOC);
    } else {
        const NAME_DOC = document.querySelectorAll('.personal-hero__name');
        const URL_DOC = document.querySelectorAll('.personal-hero__name a');
        const URL_FOTO_DOC = document.querySelectorAll('.personal-hero__img');
        const DES_DOC = document.querySelectorAll('.personal-hero__descr');
        const ADDRESS_DOC = document.querySelector('.header-location__text').textContent.toString();

        if (NAME_DOC.length > 0) {
            for (let i = 0; i < NAME_DOC.length; i++) {
                Physician(NAME_DOC[i].textContent, URL_DOC[i].href, URL_FOTO_DOC[i].href, DES_DOC[i].textContent, ADDRESS_DOC);
            }
        }
    }

    function Physician(NAME_DOC, URL_DOC, URL_FOTO_DOC, DES_DOC, ADDRES_DOC) {
        let obj =
            {
                "@context": "http://www.schema.org",
                "@type": "Physician",
                "name": NAME_DOC,
                "url": URL_DOC,
                "image": URL_FOTO_DOC,
                "description": DES_DOC,
                "priceRange": "₽₽",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": ADDRES_DOC,
                    "addressLocality": ADDRES_DOC,
                    "addressRegion": "Москвовская область",
                    "addressCountry": "Россия"
                },
                "hasMap": "https://www.google.com/maps/place/…",
                "openingHours": "Mo, Tu, We, Th, Fr, 07:00-18:00",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "8(499)113-06-23",
                    "contactType": "Customer Support"
                }
            }

        let scriptDoc = document.createElement('script');
        scriptDoc.type = 'application/ld+json';
        scriptDoc.textContent = JSON.stringify(obj);
        HEAD.appendChild(scriptDoc);
    }

    /*#############################*/
    /*########### Review ##########*/
    /*#############################*/

    let ARR_REV = ['reviews'];

    if (ARR_REV.includes(URL_NOW[1])) {
        // Подставляем нужные селекторы соответствущих полей
        const AUTHOR = document.querySelectorAll('.review_slide .name');
        const AUTOR_AGE = document.querySelectorAll('.review_slide .age');
        const AUTOR_POST = document.querySelectorAll('.review_slide .subject');
        const AUTOR_DATE_PUB = document.querySelectorAll('.slide__text p i');

        function Review(AUTHOR, AUTOR_AGE, AUTOR_POST, AUTOR_DATE_PUB) {
            const URL = `https://${document.domain}/netcat_template/template/17/build/static/img/logo-white.svg`
            let obj1 =
                {
                    "@context": "https://schema.org/",
                    "@type": "Review",
                    "itemReviewed": {
                        "@type": "MedicalOrganization",
                        "name": "Наркологическая клиника «Ваш доктор»",
                        "priceRange": "₽₽",
                        "telephone": "8(499)113-06-23",
                    },
                    "reviewBody": AUTOR_POST,
                    "author": {
                        "@type": "Person",
                        "name": AUTHOR, AUTOR_AGE
                    },
                    "datePublished": AUTOR_DATE_PUB
                }

            let scriptDoc = document.createElement('script');
            scriptDoc.type = 'application/ld+json';
            scriptDoc.textContent = JSON.stringify(obj1);
            HEAD.appendChild(scriptDoc);
        }

        let count = document.querySelectorAll('.review_slide');

        if (count.length > 0) {
            for (let i = 0; i < count.length; i++) {
                Review(
                    AUTHOR[i].textContent,
                    AUTOR_AGE[i].textContent,
                    AUTOR_POST[i].textContent,
                    AUTOR_DATE_PUB[i].textContent
                );
            }
        }

    }
    /*#############################*/
    /*####### Initialization ######*/
    /*#############################*/


MedicalScholarlyArticle();
MedicalOrganization();
FAQPage();
Product();
WebSite(window.location.href);
BreadcrumbList();