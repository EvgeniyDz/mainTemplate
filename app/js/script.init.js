//  /*================================================>  
//                                 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  INCLUDE AND INITIALIZE Plugins START  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//  <================================================*/





		var 	
				maxhheight 	= $("[data-mh]"),
				validate   	= $('.validate'),
				mask	   	= $('input[type="tel"]'),
				styler 		= $(".styler"),		   
				wow 		= $(".wow"),
				popup 		= $("[data-popup]");		


		$(document).ready(function(){


			/* ------------------------------------------------
			Inputmask START
			------------------------------------------------ */

			if(mask.length){

				mask.inputmask({
					"mask": "+7 (999) 999-9999",
					'showMaskOnHover': false,
					"clearIncomplete": true,
					'oncomplete': function(){ 
						// console.log('Ввод завершен'); 
					}, 
					'onincomplete': function(){ 
						// console.log('Заполнено не до конца'); 
					},
					'oncleared': function(){ 
						// console.log('Очищено'); 
					}
				});

			}

			/* ------------------------------------------------
			Inputmask END
			------------------------------------------------ */




			/* ------------------------------------------------
			Validate START
			------------------------------------------------ */

			if(validate.length){

				validate.validate({

					rules:{

						cf_name: {
							required: true,
							minlength: 2
						},

						cf_email: {
							required: true,
							email: true
						},

						cf_tel: {
							required: true
						},

					},

					messages:{

						cf_name: {
							required: "Поле обязательно для заполнения",
							minlength: 'Введите не менее 2 символов.'
						},

						cf_email: {
							required: "Поле обязательно для заполнения",
							email: "Не верный email."
						},

						cf_tel: {
							required: "Поле обязательно для заполнения",
							inlength: "Введите не менее 10 символов."
						},

					}

				});	

				// <form class="validate">
    //                 <input type="text" class="form_input" name="cf_name"> 
    //                 <input type="text" class="form_input" name="cf_email">
    //                 <input type="tel" class="form_input" name="cf_tel">   
    //                 <button class="form_btn btn_red_bd" data-btn-size="m">ОТПРАВИТЬ</button>
    //             </form>

			}

			/* ------------------------------------------------
			Validate END
			------------------------------------------------ */


			/* ------------------------------------------------
			FORMSTYLER START
			------------------------------------------------ */

					if (styler.length){
						styler.styler({
							// selectSmartPositioning: true
						});
					}

			/* ------------------------------------------------
			FORMSTYLER END
			------------------------------------------------ */


			/* ------------------------------------------------
			ANIMATE block START
			------------------------------------------------ */

					if(wow.length){
				        if($("html").hasClass("md_no-touch")){
							new WOW().init();	
						}
						else if($("html").hasClass("md_touch")){
							$("body").find(".wow").css("visibility","visible");
						}

					}

			/* ------------------------------------------------
			ANIMATE block END
			------------------------------------------------ */


		});

		
		$(window).on('load', (function(){

			

		}));




//  /*================================================>  
//                                 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  INCLUDE AND INITIALIZE Plugins END    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//  <================================================
