$(document).ready(function() {
	
    /*feature-icon-bg POSITION INITIAL*/
    var odd_icon = $('.odd .feature-icon-bg');
    var even_icon = $('.even .feature-icon-bg');
    var diameter_icon_bg = 550;//get from @diameter-icon-bg in less
    if (odd_icon.length){
        var w = $(window).width();
        var h = $(window).height();
        odd_icon.css({"left" : (w-960)/2,"top":(h+68-diameter_icon_bg)/2});
        even_icon.css({"right" : (w-960)/2,"top":(h+68-diameter_icon_bg)/2});
    }
    /*RIPPLE EFFECTS*/
    var ripple_handler = function(e){
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
    };
    //ripple menu a
    $('a','#menu').each(function(index,ele){
        $(ele).on('click',ripple_handler);
    });
    //ripple tab a
    var a_tab = $('a','.tab');
    if(a_tab.length!=0){
        a_tab.each(function(index,ele){
            $(ele).on('click',ripple_handler);
        });
    }
    /* SWITCH TAB CONTENT*/
    var sub_a = $('a','#menu .sub');
    var tab_li = $('.tab >li a');
    var tab_content_access = $.merge(sub_a,tab_li);
    tab_content_access.each(function(index,ele){
        $(ele).on('click',function(){
            var href = $(this).attr('href');
            var matched = href.match(/(.*?)\#\_(.*)/);

            if (matched){
                var tab_content_id = matched[2];
                var tab_content = $("#"+tab_content_id);
                var tab = $("#"+tab_content_id+'-tab');
                //handle when in pages with class=tab
                if ($('.tab')){
                    $('.tab').eq(0).find('.active').removeClass('active');
                    tab.addClass('active');
                    $('.tab_content').eq(0).find('.active').removeClass('active');
                    tab_content.addClass('active');
                }
                //handle when in pages without class=tab
                    //else{}
                //direct to the tab hash address
                    //call ripple method
            }
        });
    });
    /* SWITCH TAB-S CONTENT*/
    $('.tab-s > li').each(function(index,ele){
        $(ele).on('click',function(){
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
    });
    /* #FEEL CLICK EVENT*/
    var feel = $('#feel');
    var btn = $('#top-nav .btn');
    feel.on('mouseover',function(){
        btn.addClass('hover');
    });
    feel.on('mouseout',function(){
        btn.removeClass('hover');
    });
    /*METHOD OF TOGGLING ELEMENT'S ACTIVE CONDITION*/
    var toggle = function(ele){
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
    var select = function(nextIndex){
        return names[nextIndex];
    };
    var names = [$('#feature-suishouji-bg'),$('#feature-suishoushen-bg'),$('#feature-suishouchu-bg'),$('#feature-suishoukong-bg')];

    var options = {
			// anchors:['first','second','third','fourth'],
	    	// menu:'#menu',
	    	slidesNavigation:true,
	    	afterRender: function () {
	              setInterval(function () {
	                  $.fn.fullpage.moveSlideRight();
	              }, 4000);
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
            onLeave: function(index, nextIndex, direction){
                var leavingSectionBG = $('.feature-icon-bg',this);
                var next;
                if (nextIndex > index){
                    if (select(index-1) !== undefined){
                        setTimeout(function(){
                            toggle(select(index-1));    
                        },700);
                    }
                }
                else{
                    if (select(nextIndex-2)!==undefined){
                        setTimeout(function(){
                            toggle(select(nextIndex-2));
                        },700);
                    }
                }
                if (leavingSectionBG.length !== 0){
                    setTimeout(function(){
                        toggle(leavingSectionBG);
                    },700);
                }
        }

	};
    if ($('#fullpage').length!==0){
        $('#fullpage').fullpage(options);    
    }
});