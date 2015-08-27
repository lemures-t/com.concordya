(function(){

    var Concordya = function(){
        this.router = {};
        this.fpOptions = {
            // anchors:['first','second','third','fourth'],
            // menu:'#menu',
            slidesNavigation:true,
            afterRender: function () {
                  setInterval(function () {
                      $.fn.fullpage.moveSlideRight();
                  }, 3000);
            },
            continuousVertical:true,
            controlArrows:false,
            verticalCentered:false,
            // verticalCentered: true,
            paddingTop:68,
            scrollingSpeed:700,
            autoScrolling:false,

            // fitToSection:false,
            // navigationTooltips: ['firstSlide', '随手记'],
            // navigation: true,
            // afterResize: adaption,
            // sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000']
            onLeave: Concordya.changeFeatureBG
        };
    };
    /* Static Method that control the condition of feautre-bg when scrolling*/
    Concordya.changeFeatureBG = function(index, nextIndex){
        var leavingSectionBG = $('.feature-icon-bg',this);
        if (nextIndex > index){
            if (Concordya.select(index-1) !== undefined){
                setTimeout(function(){
                    Concordya.toggleFeatureBG(Concordya.select(index-1));    
                },700);
            }
        }
        else{
            if (Concordya.select(nextIndex-2)!==undefined){
                setTimeout(function(){
                    Concordya.toggleFeatureBG(Concordya.select(nextIndex-2));
                },700);
            }
        }
        if (leavingSectionBG.length !== 0){
            setTimeout(function(){
                Concordya.toggleFeatureBG(leavingSectionBG);
            },700);
        }
    };
    /* Static Method that control the basic circle condition of feature-bg when it is scrolled to*/
    Concordya.toggleFeatureBG = function(ele){
            var w = $(window).width();
            var h = $(window).height();
            var diameter_icon_bg = 550;
            if (ele.hasClass('active')){
                ele.removeClass('active');
                if (ele.parent().hasClass('odd')){
                    ele.css({"left" : (w-960)/2,"top":(h+68-diameter_icon_bg)/2});
                }
                else{
                    ele.css({"right" : (w-960)/2,"top":(h+68-diameter_icon_bg)/2});
                }
            }
            else{
                ele.addClass('active');
                if (ele.parent().hasClass('odd')){
                    ele.css({'left':-450,'top':-600});
                }
                else{
                    ele.css({'right':-450,'top':-600});   
                }
            }
        };
    Concordya.select = function(nextIndex){
        return Concordya.featureBG[nextIndex];
    };
    Concordya.featureBG = [$('#feature-suishouji-bg'),$('#feature-suishoushen-bg'),$('#feature-suishouchu-bg'),$('#feature-suishoukong-bg')];
    Concordya.prototype = {
        constructor: Concordya,
        fpInit: function(options){
            if ($('#fullpage').length!==0){
                $('#fullpage').fullpage(options);    
            }
        },
       
        /* METHOD OF TOGGLING FEATUREBG OR THE BACKGROUND CIRCLE 'S CONDITION */
        scrollBack: function(ele){
            return $(ele).offset().top;
        },
        getRoot: function(){
            return $(document.body).scrollTop()? $(document.body) : $(document.documentElement);
        },
        /*RIPPLE EFFECTS*/
        ripple_Handler : function(e){
            e.preventDefault();
            var r = $(this).find('.ripple');
            var that = $(this);
            r.addClass('clicked');
            setTimeout(function(){
                if(r.hasClass('clicked')){
                    r.removeClass('clicked');
                }
                window.location.href = that.attr("href");
            },300);
        },
        addListener : function(obj,event,handler){
            var _obj;
            if (typeof obj == 'string'){
                _obj = $(obj);
            }
            if (obj instanceof $){
                _obj = obj;
            }
            _obj.each(function(index,ele){
                $(ele).on(event,handler);
            });
        },
        routerHash : function(pageName,hash,deft,handler){
            if (!this.router[pageName]){
                this.router[pageName] = [];
            }
            if (typeof hash == 'string'){
                this.router[pageName].push(hash);    
            }
            else if ( hash instanceof Array){
                this.router[pageName] = this.router[pageName].concat(hash);
            }
            if (typeof deft == 'string'){
                this.router[pageName].push(deft);   
            }

            var rep = new RegExp(pageName);
            //handle hashchange
            $(window).on('hashchange',function(){
                if (rep.test(window.location.href)){
                    var _hash = window.location.hash.replace(/#_/,'');
                    if(_hash){
                        handler(_hash);
                    }
                    else{
                        _hash = deft.replace('_','');
                        handler(_hash);
                    }
                }
            });
            //handle the page with a hash url and the page is directed from other pages
            //resolve UA history problem
            $(window).on('load',function(){
                if (rep.test(window.location.href)){
                    var _hash = window.location.hash.replace(/#_/,'');
                    if(_hash){
                        handler(_hash);
                    }
                }
            });
        },
        routerView : function(url,deft,handler){
            this.router['default'] = this.router['default'] || [];
            if ( url instanceof Array){
                this.router['default'] = this.router['default'].concat(url);
            }
            var matched, _url,
                that = this;
            $(window).on('load',function(){
                matched = window.location.href.match(/(.*)\/(.*?)\.html/);
                if (!!matched){
                    _url = matched[2]; 
                }
                if (url.indexOf(_url) != -1){
                    handler(_url);
                } 
                else{
                    that.router['default'].push(deft);
                    handler(deft);
                }
            });
        },
        /*feature-icon-bg POSITION INITIAL*/
        posInit: function(){
            var odd_icon = $('.odd .feature-icon-bg');
            var even_icon = $('.even .feature-icon-bg');
            var diameter_icon_bg = 550;//get from @diameter-icon-bg in less
            if (odd_icon.length){
                var w = $(window).width();
                var h = $(window).height();
                odd_icon.css({"left" : (w-960)/2,"top":(h+68-diameter_icon_bg)/2});
                even_icon.css({"right" : (w-960)/2,"top":(h+68-diameter_icon_bg)/2});
            }
        },
        /* #FEEL EVENT*/
        toggleHover: function(target,trigger,triggerClass){
            var _trigger = $(trigger);
            var _target = $(target);
            _trigger.on('mouseover',function(){
                _target.addClass(triggerClass);
            });
            _trigger.on('mouseout',function(){
                _target.removeClass(triggerClass);
            });
        }
    };

    $(document).ready(function() {

        var web = new Concordya();

        web.fpInit(web.fpOptions);

        /*feature-icon-bg POSITION INITIAL*/
        web.posInit();

        /* #FEEL CLICK EVENT*/
        web.toggleHover('#top-nav .btn','#feel','hover');

        /* 
        * Ripple Menu <A /> and Ripple Tab <A />
        * WITH CHANGE OF HREF
        */
        web.addListener($.merge($('a','#menu'),$('a','.tab')),'click',web.ripple_Handler);

        /* SWITCH TAB-S CONTENT*/
        web.addListener('.tab-s > li','click',function(){
            var ele = $(this);
            var matched = ele.attr('class').match(/(.*?)\-tab/);
            var related;
            // handle click tab on top
            if (ele.parent().hasClass('top')){
                related = $('.bottom').find('.'+matched[0]);
                if (!related.hasClass('active')){
                    $('.bottom').find('.active').removeClass('active');
                    related.addClass('active');
                    if (!ele.hasClass('active')){
                        ele.parent().find('.active').removeClass('active');
                        ele.addClass('active');
                        var target = '#' + matched[1];
                        $(target).parent().find('.active').removeClass('active');
                        $(target).addClass('active');
                    }
                }
            }
            // handle click tab on bottom
            else{
                related = $('.top').find('.'+matched[0]);
                if (!related.hasClass('active')){
                    $('.top').find('.active').removeClass('active');
                    related.addClass('active');
                    // scrollback with animation and delay toggle of tab-content
                    // 68 is the fixed navbar height as well as the body padding-top value
                    var scrollback = $('.specs').offset().top - 68;

                    var root = $(document.body).scrollTop()?$(document.body):$(document.documentElement);
                    root.animate({scrollTop: scrollback},600).promise().done(function(){
                        setTimeout(function(){
                            if (!ele.hasClass('active')){
                                ele.parent().find('.active').removeClass('active');
                                ele.addClass('active');
                                var target = '#' + matched[1];
                                $(target).parent().find('.active').removeClass('active');
                                $(target).addClass('active');
                            }
                        },300);
                    });
                }
            }
        });

        /* SITEMAP SCROLLBACK */
        web.addListener('.sitemap .detail.more a','click',function(e){
            e.preventDefault();
            if ($('.tab').length!==0){
                var sb = web.scrollBack('.tab') - 88;
                setTimeout(function(){
                    web.getRoot().animate({scrollTop: sb},600);
                },200);    
            }
            window.location.href = $(this).attr('href');
        });

        /* Router BTW DIFFERENT VIEWS */
        web.routerView(['about-us','index','guidance'],'index',function(para_url){
            var direction = para_url+'.html';
            $('#menu').find('.active').removeClass('active');
            $('#menu a[href="'+ direction +'"]').parent().addClass('active');
        });

        /* Router BTW DIFFERENT HASH UNDER SAME PAGE */
        web.routerHash('about-us',['_news','_media','_contact','_log'],'_news',function(hash){
            var tab_content_id = hash;
            var tab_content = $("#"+tab_content_id);
            var tab = $("#"+tab_content_id+'-tab');
            //handle when in pages with class=tab
            if ($('.tab')){
                $('.tab').eq(0).find('.active').removeClass('active');
                tab.addClass('active');
                $('.tab_content').eq(0).find('.active').removeClass('active');
                tab_content.addClass('active');
            }
        });
    });
})($);