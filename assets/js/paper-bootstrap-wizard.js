searchVisible = 0;
transparent = true;

        $(document).ready(function(){




            /*  Activate the tooltips      */
            $('[rel="tooltip"]').tooltip();

            // Code for the Validator
            var $validator = $('.wizard-card form').validate({
        		  rules: {
        		    firstname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    lastname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    email: {
        		      required: true
        		    }
                },
        	});

            // Wizard Initialization
          	$('.wizard-card').bootstrapWizard({
                'tabClass': 'nav nav-pills',
                'nextSelector': '.btn-next',
                'previousSelector': '.btn-previous',

                onNext: function(tab, navigation, index) {
                	var $valid = $('.wizard-card form').valid(); return;
                	if(!$valid) {
                		$validator.focusInvalid();
                		return false;
                	}
                },

                onInit : function(tab, navigation, index){

                  //check number of tabs and fill the entire row
                  var $total = navigation.find('li').length;
                  $width = 100/$total;
                  var $wizard = navigation.closest('.wizard-card');

                  $display_width = $(document).width();

                  if($display_width < 600 && $total > 3){
                      $width = 50;
                  }

                  var $current = index+1;



                   navigation.find('li').css('width',$width + '%');

                   $moving_div = $('<div class="moving-tab"/>');
                   $('.wizard-card .wizard-navigation').append($moving_div);


                    // first_li_icon = navigation.find('li:first-child a i').attr("class");
                    // $('.moving-tab').html(decodeURI('<i class="' + first_li_icon + '"></i>'));


                //    refreshAnimation($wizard, index);
                //    $('.moving-tab').css('transition','transform 0s');

               },

                onTabClick : function(tab, navigation, index){

                    var $valid = $('.wizard-card form').valid();

                    if(!$valid){
                        return false;
                    } else{
                        return true;
                    }

                },

                onTabShow: function(tab, navigation, index) {
                    var $total = navigation.find('li').length;
                    var $current = index+1;

                    var $wizard = navigation.closest('.wizard-card');

                    // If it's the last tab then hide the last button and show the finish instead
                    if($current >= $total) {
                        $($wizard).find('.btn-next').hide();
                        $($wizard).find('.btn-finish').show();
                    } else {
                        $($wizard).find('.btn-next').show();
                        $($wizard).find('.btn-finish').hide();
                    }

                    //button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                    icon_class = navigation.find('li:nth-child(' + $current + ') a i').attr('class');
                     $('.moving-tab').html(decodeURI('<i class="' + icon_class + '"></i>'));


                    refreshAnimation($wizard, index);

                }
          	});


            // Prepare the preview for profile picture
            $("#wizard-picture").change(function(){
                readURL(this);
            });

            $('[data-toggle="wizard-radio"]').click(function(){
                wizard = $(this).closest('.wizard-card');
                wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
                $(this).addClass('active');
                $(wizard).find('[type="radio"]').removeAttr('checked');
                $(this).find('[type="radio"]').attr('checked','true');
            });

            $('[data-toggle="wizard-checkbox"]').click(function(){
                if( $(this).hasClass('active')){
                    $(this).removeClass('active');
                    $(this).find('[type="checkbox"]').removeAttr('checked');
                } else {
                    $(this).addClass('active');
                    $(this).find('[type="checkbox"]').attr('checked','true');
                }
            });

            $('.set-full-height').css('height', 'auto');

        });



         //Function to show image before upload

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        $(window).resize(function(){
            $('.wizard-card').each(function(){
                $wizard = $(this);
                index = $wizard.bootstrapWizard('currentIndex');
                // refreshAnimation($wizard, index);

                // $('.moving-tab').css({
                //     'transition': 'transform 0s'
                // });
            });
        });

        function refreshAnimation($wizard, index){
            total_steps = $wizard.find('li').length;
            move_distance = $wizard.width() / total_steps;
            step_width = move_distance;
            move_distance = move_distance * index + step_width/2 - 35;

            console.log('fac cerc mic ');
            $('.moving-tab').css({
                'transform':' scale(0.3)',
                'left': move_distance

            });

            setTimeout(function(){
                $('.moving-tab').css({
                    'transform':' scale(1)',
                    'left': move_distance
                });

                console.log('sterg clasa');
            },1000);



        }

        function debounce(func, wait, immediate) {
        	var timeout;
        	return function() {
        		var context = this, args = arguments;
        		clearTimeout(timeout);
        		timeout = setTimeout(function() {
        			timeout = null;
        			if (!immediate) func.apply(context, args);
        		}, wait);
        		if (immediate && !timeout) func.apply(context, args);
        	};
        };
