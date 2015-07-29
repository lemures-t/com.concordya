$(document).ready(function() {
	
    var adaption = function(){
        /*slide 1*/
        var s0 = $('#section0'),
            section_height = s0.height(),
            section_width = s0.width(),
            padding_left = (section_width - 960)/2;
        

        var hat = $('.hat'),
            hat_top = (section_height - hat.height())/2;
        hat.css({left:padding_left, top: hat_top});

        var title =$('.title'),
            title_2_hat_dis = (hat.height() - title.height())/11,
            title_top = (section_height - title.height())/2 - title_2_hat_dis;
        title.css({left:250+padding_left,top:title_top});

        var subtitle =$('.subtitle'),
            subtitle_top = (section_height - subtitle.height())/2 + title.height()/3;
        subtitle.css({left:300+padding_left,top:subtitle_top});

      
        /* slide 2 */
        var wheel =$('.wheel');
        var s2 = $('#slide2');

        var wheel_w = 759,
            wheel_h = 716;

        var cloud_w = 615,
            cloud_h = 628,
            size_cloud = cloud_w + "px, " + cloud_h + "px";
        
        if(section_width > 1600){
            
            var wheel_left = (section_width - $('#section0 .wrap').eq(0).width())/2-150;

            wheel.css({width:wheel_w,height:wheel_h});
            
            s2.css({"background-size":size_cloud});
        }

        else if(section_width > 1366 && section_width <=1600 ){
            
            var wheel_left = (section_width - $('#section0 .wrap').eq(0).width())/2-150;

            var w = wheel_w/1.15,
                h = wheel_h/1.15;
            wheel.css({width:w,height:h});
            
            s2.css({"background-size":size_cloud});
        }

        else if( section_width <= 1366 && section_width>1100){
            
            var wheel_left = (section_width - $('#section0 .wrap').eq(0).width())/2-50;

            var w = wheel_w/1.2,
                h = wheel_h/1.2;
            wheel.css({width:w,height:h});

            var w = cloud_w/1.2,
                h = cloud_h/1.2;
                str = w + "px, " + h + "px";
            s2.css({"background-size":str });

        }
        else if(section_width<=1100){

            var wheel_left = (section_width - $('#section0 .wrap').eq(0).width())/2-30;

            var w = wheel_w/1.3,
                h = wheel_h/1.3;
            wheel.css({width:w,height:h});
            
            var w = cloud_w/1.7,
                h = cloud_h/1.7;
                str = w + "px, " + h + "px";
            s2.css({"background-size":str });
        }
        
        wheel_top = (section_height - wheel.height())/2;
        wheel.css({top:wheel_top,left:-wheel_left});

        /* slide 3 */

        var s3 = $('#slide3');

        var arrow_w = 351,
            arrow_h = 708;
            s3_height = s3.height()+options.paddingTop;
            // alert(section_height);
            // alert('aaa'+$(window).height());
        if (s3_height<=arrow_h){
            var w = arrow_w/1.1,
                h = arrow_h/1.1,
                str = w + "px, " + h + "px"; 
            s3.css({"background-size":str});
        }

        else if (s3_height>arrow_h && s3_height<=960){
            var w = arrow_w/0.8,
                h = arrow_h/0.8,
                str = w + "px, " + h + "px"; 
            s3.css({"background-size":str});
        }
        else if(s3_height>960){
            var w = arrow_w/0.68,
                h = arrow_h/0.68,
                str = w + "px, " + h + "px"; 
            s3.css({"background-size":str});
            // alert('111');
        }
        
        var star_w = 355,
            star_h = 144,
            star = $('.star'),
            star_wrap =$('.star_wrap');

        var youth_w = 352,
            youth_h = 145,
            youth = $('.youth');
            youth_wrap =$('.youth_wrap');

        var star_news = $('.star_news');
        var youth_news = $('.youth_news');

        var link = $('.link');

        var words = $('span','.news');
        var news = $('.news',s3);

        /*
        * To reset the elements width and height since they have been changed
        * after viewport width is or resized smaller than 1100
        * value is hacked
        */

        // var reset = function(){
        //     // alert(init_value.words_fs);
        //     star.css({width:star_w,height:star_h});
        //     youth.css({width:youth_w,height:youth_h});
        //     link.css({width:36,height:36});
        //     words.css({'font-size':'20px'});
        //     news.css({'line-height':'36px','padding-top':'40px'});
        // }


        if(section_width > 1600){
            youth_wrap.css({top:'50%',right:300});
            star_wrap.css({bottom:'50%',left:300});
            // reset();
        }

        else if(section_width > 1366 && section_width <=1600 ){
            youth_wrap.css({top:'50%',right:120});
            star_wrap.css({bottom:'50%',left:120});
            // reset();

        }

        else if(section_width <= 1366 && section_width>1100){
            youth_wrap.css({top:'50%',right:80});
            star_wrap.css({bottom:'50%',left:60});
            // reset();
        }
        else if(section_width<=1100){

            var w = star_w/1.5,
                h = star_h/1.5;
            star.css({width:w,height:h});
            star_wrap.css({bottom:'50%',left:80});
            
            var w = youth_w/1.5,
                h = youth_h/1.5;
            youth.css({width:w,height:h});
            youth_wrap.css({top:'50%',right:80});

            var link_w = link.width(),
                link_h = link.height();
            var w = link_w/1.4,
                h = link_h/1.4;
            link.css({width:w,height:h});
            words.css({'font-size':15});
            news.css({'line-height':w+'px','padding-top':'15px'});
        }

        /* 
        * slide 4 
        */
        var s4 = $('#slide4'),
            release = $('.release_wrap',s4);
        
        var mac_w = 1554,
            mac_h = 660;
        var rel_w = release.width(),
            rel_h = release.height(),
            rel_2_left = (section_width - rel_w)/2;

        release.css({left:rel_2_left});
        release.css({bottom:'60px'});

        if(section_width > 1600){
            var w = mac_w/0.85,
                h = mac_h/0.85;
            str = w + "px, " + h + "px";
            s4.css({"background-size":str });
            release.css({bottom:'100px'});
        }

        else if(section_width > 1366 && section_width <=1600 ){

            var w = mac_w/1.1,
                h = mac_h/1.1;
            str = w + "px, " + h + "px";
            s4.css({"background-size":str });
                
        }
        else if( section_width <= 1366 && section_width > 1100){
            
            var w = mac_w/1.5,
                h = mac_h/1.5;
            str = w + "px, " + h + "px";
            s4.css({"background-size":str });
            // release.css({bottom:'60px'})
        }
        else if(section_width<=1100){
            var w = mac_w/1.8,
                h = mac_h/1.8;
            str = w + "px, " + h + "px";
            s4.css({"background-size":str });
        }
    };

    var options = {
			// anchors:['first','second','third','fourth'],
	    	// menu:'#menu',
	    	slidesNavigation:true,
	    	afterRender: function () {
	            setInterval(function () {
	                $.fn.fullpage.moveSlideRight();
	            }, 4000);
	        },
	        // continuousVertical:true,
	        autoScrolling:true,
            controlArrows:false,
	        verticalCentered:false,
	        paddingTop:68,
	        // fitToSection:false
            // navigationTooltips: ['firstSlide', '随手记'],
            // navigation: true,
            // afterResize: adaption,
            // sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000']

	};
    
    $('#fullpage').fullpage(options);
    /* initial adaption*/
    adaption();
});