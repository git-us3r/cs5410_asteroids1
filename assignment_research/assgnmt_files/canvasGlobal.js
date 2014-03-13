//Global JS File

////////////////////////
//Add Button to Header//
////////////////////////
(function() {
	var menu = $('#menu');
	if (!menu.length) return;
	//Menu Item Support

	var researchHelp = $('<li/>', {
		'class': 'menu-item',
		html: '<a class="menu-item-title" href="/">Research Help&nbsp;<span class="menu-item-title-icon"></span><i class="icon-mini-arrow-down"></i><div class="menu-item-drop"><table cellspacing="0"><tbody><tr><td class="menu-item-drop-column">'+
		'<span id="test" class="menu-item-heading" >Resources</span><ul class="menu-item-drop-column-list">'+
		//List items
		'<li><a href="http://libguides.usu.edu/magazines" target="_blank"><span class="name ellipsis">Finding Magazine/Newspaper Articles</span></a></li>'+
		'<li><a href="http://libguides.usu.edu/peer-review" target="_blank"><span class="name ellipsis">What is a Peer-Reviewed Article?</span></a></li>'+
		'<li><a href="http://libguides.usu.edu/citations" target="_blank"><span class="name ellipsis">Citing Your Sources</span></a></li>'+
		'<li><a href="http://libguides.usu.edu/research" target="_blank"><span class="name ellipsis">Getting Started with Research</span></a></li>'+
		//Ending
		'</ul></td></tr></tbody></table></div>'
	});

	var support = $('<li/>', {
		'class': 'menu-item',
		html: '<a class="menu-item-title" href="/">Support&nbsp;<span class="menu-item-title-icon"></span><i class="icon-mini-arrow-down"></i></a><div class="menu-item-drop"><table cellspacing="0"><tbody><tr><td class="menu-item-drop-column">'+
		//Title in dropdown menu
		'<span id="test" class="menu-item-heading" >Support Resources</span><ul class="menu-item-drop-column-list">'+
		//List items
		'<li><a href="https://training.instructure.com/courses/347469/" target="_blank"><span class="name ellipsis" target="_blank">Canvas Orientation for Students</span></a></li>'+
		'<li><a href="https://training.instructure.com/courses/1157710/" target="_blank"><span class="name ellipsis" target="_blank">Canvas Orientation for Instructors</span></a></li>'+
		'<li><a href="http://it.usu.edu"><span class="name ellipsis" target="_blank">Technical Support</span></a></li>'+
		//'<li><a href="https://elearn.usu.edu/support/computerSupport.html" target="_blank" ><span class="name ellipsis">Computer Support</span></a></li>'+
		//'<li><a href="http://passwords.usu.edu" target="_blank"><span class="name ellipsis" target="_blank" >Change Strong Password</span></a></li>'+
		'<li><a href="https://canvas.usu.edu/support/academicResources.cfm" target="_blank"><span class="name ellipsis">Academic Resource Center</span></a></li>'+
		'<li><a href="http://distance.usu.edu/online_courses/proctored.cfm" target="_blank"><span class="name ellipsis">Proctored Exams Support</span></a></li>'+
		//Ending
		'</ul></td></tr></tbody></table></div>'
	});

	menu.append(researchHelp).append(support);
})();

//////////////////////////////////////////////////////////////////
//Parse Course Number - It is stored in the variable "coursenum"//
//////////////////////////////////////////////////////////////////
var coursenum = null;
(function() {
	var matches = location.pathname.match(/\/courses\/(.*)/);
	if (!matches) return;
	coursenum = matches[1];
	var killspot = coursenum.indexOf("/",0); 
	if (killspot >= 0) {
		coursenum = coursenum.slice(0, killspot);
	}
}());

/////////////////////////////////////////////////////
//Where called for, include custom css or jqlibrary//
/////////////////////////////////////////////////////

//If we are on a wiki page, include the stylesheet.
if ($("#usu-custom-css").length>0 || $(".usu-custom-css").length>0 || $("#custom-css").length>0){
	var customcssurl = "/courses/" + coursenum + "/file_contents/course%20files/global/css/style.css";
	var coursecss = document.createElement('link');
	coursecss.type = "text/css";
	coursecss.rel = "stylesheet";
	coursecss.href = customcssurl;

	if ($("#usu-custom-css").length>0){
		document.getElementById("usu-custom-css").appendChild(coursecss);
	}
	if ($(".usu-custom-css").length>0){
		$(".usu-custom-css").appendChild(coursecss);
	}
	if ($("#custom-css").length>0){
		$("head").append(coursecss);
	}
	//document.getElementById("wiki_body").innerHTML = '<link type=\"text/css\" rel=\"stylesheet\" href=\"/courses/' + coursenum + '/file_contents/course%20files/global/css/style.css\" />'+document.getElementById("wiki_body").innerHTML;
}




if ($("#usu-jqlibrary").length>0 || $(".usu-jqlibrary").length>0){
	$.getScript("https://elearn.usu.edu/canvas_branding/js/jqlibrary.js", function(){
		//alert("Script Loaded.");
	});

}

if ($("#usu-jqexpander").length>0){
	$.getScript("https://elearn.usu.edu/canvas_branding/js/jqexpander/jquery.expander.js", function(){
		//alert("Script Loaded.");
	});

}



//////////////////////////////////////////////////
//If user is a student, kill "Start a New Topic"//
//////////////////////////////////////////////////
 if (window.location.href.indexOf('discussion_topics')>0 && window.location.href.indexOf('groups')<0 && $('a.settings').length<=0 && $('nav a:contains(Canvas Guides)').length<=0) {
    $( '<style>div.headerBar-right a.btn.btn-primary, div#content div a.btn.btn-large.btn-primary { display: none; }</style>' ).appendTo( "head" )
}



////////////////////////////////////
//Disable auto-complete in quizzes//
////////////////////////////////////

if ($("#submit_quiz_form").length>0)
{
	$("#submit_quiz_form").attr("autocomplete","off");
}

///////////////////////////////////////////////////////////////
//Fix forgot password form to include A-number password reset//
///////////////////////////////////////////////////////////////
if(window.location.href.indexOf("login") > 0)
{
	if($("#forgot_password_form").length > 0)
	{
	$("#forgot_password_form").prepend('<div><h3>If you login using your A-number</h3><p>Visit <a href="https://id.usu.edu/Password/Forgot">https://id.usu.edu/Password/Forgot</a> for instructions on how to reset your password.</p></div><h3>If you login using your email address</h3>');
	$('#forgot_password_form > p:contains("Enter")').html("<span>Enter your email and we'll send you a link to change your password.</span>");
	$('.placeholder[for="pseudonym_session_unique_id_forgot"]').html("<span>Email</span>");
	}
}

////////////////////////////////////////////////////////
//Add maxlength to Adobe Connect option in Conferences//
///////////////////////////////////////////////////////
if(window.location.href.indexOf("conferences") > 0){
	$(document).ready(function() {
		if($(".new-conference-btn").length > 0){
			$('.new-conference-btn').click(function(){
				setTimeout(function(){
					$('select>option:eq(1)').prop('selected', true);
					$("#web_conference_title").attr('maxlength','30');
					$("#web_conference_title").after('<br><small>Limit of 30 characters</small>');
					var todaysDate = new Date();
					var displayDate = todaysDate.toString('MM-dd-yyyy');
					$("#web_conference_title").val(displayDate+" Conference");
				}, 300);
			});	
		}
	});

}

/////////////////////////////////////////////////////
// Canvas Guides search bar - Queries Screensteps  //
////////////////////////////////////////////////////

$(document).ready(function(){
	//Creates space in the identity bar for the search bar, still retaining the "help" link.
	var searchBarSpace = document.createElement("li");
	searchBarSpace.id = "searchBar";
	searchBarSpace.innerHTML = '<form id="screenstepslive-search" action=""><input type="text" id="screenstepslive-search-field" value="Search Canvas Help" name="text" size="20" onfocus="searchFieldOnFocus();" /></form>';
	document.getElementById("identity").appendChild(searchBarSpace);
	
	//Creates search results box that is independent of search bar, as not to interfere with its container.
	var searchBarBox = document.createElement("div");
	searchBarBox.id = "search_results";
	document.body.appendChild(searchBarBox);
});

//Removes search field's value so user can type in their search.
function searchFieldOnFocus() {
	if(document.getElementById("screenstepslive-search-field").value == "Search Canvas Help") document.getElementById("screenstepslive-search-field").value="";
}

//Closes search results box when user clicks on the box's "x" button.
function closeSearchResults() {
	document.getElementById("search_results").className = "makeMeInvisible";
}


////////////////////////////////////////////////
// Canvas Guides Search Bar Top-rt Navigation //
////////////////////////////////////////////////

function GetScreenStepsLiveLessonsForTag(tag_name) {
  jQuery.ajax({
    type: "GET",
    url: MakeSpaceTagsUrl(),
    dataType: 'json',
    data: {
      tag:tag_name,
      username: ScreenStepsLiveTagOptions.username,
      password: ScreenStepsLiveTagOptions.password
    }
  })
}

function SearchScreenStepsLiveSpace(string) {
  jQuery.ajax({
    type: "GET",
    url: MakeSpaceSearchUrl(),
    dataType: 'json',
    data: {
      text:string,
      username: ScreenStepsLiveSearchOptions.username,
      password: ScreenStepsLiveSearchOptions.password
    }
  })
}

function MakeSpaceSearchUrl() {
  ScreenStepsLiveSearchOptions.use_ssl == true ? protocol = 'https://' : protocol = 'http://';
  url = protocol + ScreenStepsLiveSearchOptions.domain + "/spaces/" + ScreenStepsLiveSearchOptions.space + "/searches.json?callback=?";
  return url;
}

function MakeSpaceTagsUrl() {
  ScreenStepsLiveTagOptions.use_ssl == true ? protocol = 'https://' : protocol = 'http://';
  url = protocol + ScreenStepsLiveTagOptions.domain + "/spaces/" + ScreenStepsLiveTagOptions.space + "/tags.json?callback=?";
  return url;
}


function DisplayScreenStepsLiveSearchResults(data) {
  if (data.errors == undefined) {
    jQuery('#' + ScreenStepsLiveSearchOptions.update_element).html(render_lesson_results(data.lessons));
  } else {
    jQuery.each(data.errors, function(error) { alert(error); })
  }
}

function DisplayScreenStepsLiveLessonsForTag(data) {
  if (data.errors == undefined) {
    result ='<ul>';
	  jQuery.each(data.lessons, function(index, l) { result += '<li><a href="' + l.url + '" class="search-result" target="_blank">' + l.title + '</a></li>' });	
	  jQuery('#' + ScreenStepsLiveTagOptions.update_element).html(result);
	} else {
	  jQuery.each(data.errors, function(error) { alert(error); })
	}
}

render_lesson_results = function(lessons) {
  var results_count = 0;
  if (lessons != null) {
    results_count = lessons.length;
  }
  result = '<h4>' + results_string(results_count) + "<a class='close-link' id='close_search_results' href='#' onclick='closeSearchResults();'>&nbsp;</a></h4>";
  if (results_count > 0) {
    result +='<ul>';
  	jQuery.each(lessons, function(index, l) { result += '<li><a href="' + l.url + '" class="search-result" target="_blank">' + l.title + '</a></li>' });
  }
	if (jQuery('#search_results').hasClass('makeMeInvisible')) {
		jQuery('#search_results').removeClass('makeMeInvisible');
		jQuery('#search_results').addClass('makeMeVisible');
	}
	return result;
}

function results_string(lessons_count) {
  if (lessons_count > 0) {
    var lessons_found_text = ScreenStepsLiveSearchOptions.results_text || "matching lessons found.";
    return lessons_count + " " + lessons_found_text;
  } else {
    var no_results_text = ScreenStepsLiveSearchOptions.no_results_text || "No lessons were found";
    return no_results_text;
  }
}

ScreenStepsLiveSearchOptions = {
	domain: "canvas.screenstepslive.com",
	space: "2204",
	update_element: "search_results",
	username: "canvassearch",
	password: "canvasrocks",
	use_ssl: true
}

jQuery();
jQuery(document).ready(function($) {
	jQuery('#screenstepslive-search').submit(function(e){
		e.preventDefault();
		search_string = jQuery('#screenstepslive-search input#screenstepslive-search-field').val();
		SearchScreenStepsLiveSpace(search_string);
	});
});

///////////////////////////////////
// Kenneth's Custom Canvas Tools //
///////////////////////////////////

(function() {
	// Path to where the canvasCustomTools folder is located
	toolsPath = "https://elearn.usu.edu/canvasCustomTools";
	globalCSSPath = "https://elearn.usu.edu/canvas_branding/css/canvasGlobal.css";

	//Parse Course Number - It is stored in the variable "coursenum"//
	coursenum = null;
	var matches = location.pathname.match(/\/courses\/(.*)/);
	if (!matches) return;
	coursenum = matches[1];
	var killspot = coursenum.indexOf("/",0); 
	if (killspot >= 0) {
		coursenum = coursenum.slice(0, killspot);
	}

	// Get Current UserID
	var userID = $(".user_id").text();

	// Front Page Custom banner image
	if($("#usu-home-img").length>0){
		$('head').prepend('<style>#usu-home-img {background: url(/courses/' + coursenum + '/file_contents/course%20files/global/css/images/homePageBanner.jpg) no-repeat center center; }</style>')
	}
	// Comma seperated list of courses to allow custom tools access
	var courseArray = [
		"231389", // PE-1527-Louviere-Build
		"266760", // Fa13 COMD-4450-LO1
		"267080", // Research Financial Administration Series Training (RFAST)
		"267425", // Template Example Course
		"269405", // Sp14 ENVS-4700 BUILD
		"269738", // TEAL 5230
		"269964", // Portfolio
		"280337", // Sp14 NDFS-6780-LO1
		"280338", // Sp14 NDFS-6900-LO1
		"282484", // Sp14 ITLS 6350-LO1
		"282537", // Sp14 POLS-5400-LO1
		"282602", // COMD-4920 Sp14 BUILD - Radford
		"282879", // HR Training-New Hires
		"291235", // Sp14 MIS-2100-TB1
		"305032", // Higher Education Accessibility Tools  (George)
		"303744", // Punkworks
		"305257", // JS Tools Sandbox #1 (George)
		"305258", // JS Tools Sandbox #2 (George)
		"305259", // JS Tools Sandbox #3 (George)
		"305260", // JS Tools Sandbox #4 (George)
		"305261", // JS Tools Sandbox #5 (George)
		"307244", // JS Tools Sandbox #6 (George)
		"307245", // JS Tools Sandbox #7 (George)
		"307246", // JS Tools Sandbox #8 (George)
		"307247", // JS Tools Sandbox #9 (George)
		"307248", // JS Tools Sandbox #10 (George)
		"305568", // Snow College template draft (George)
		"304601" // Sp14 ITLS 6350-001
		];
	// Comma seperated list of users to allow custom tools access
	var userArray = [
		"5", // John Louviere
		"9", // Neal Legler
		"103461", // Travis Thurston
		"102610", // Jared Woolstenhulme
		"55110", // George Joeckel
		"99779", // Carrie Finlinson
		"834467", // Amy Carpenter
		"53751", // Shane Thomas
		"61018", // Elisa Taylor
		"678526", // Debbie Pearson
		"56139", // Curtis Radford
		"112489", // Jennifer Paskett
		"711999", // Tyler Clair 
		"57274", // Victor Lee
		"1248441", // Sarah Brasiel
		"54921", // Yanghee Kim
		"825210", // Rachel Williams
		"54753", // Steve Laing
		"54807", // Janice Radcliff
		"57275", // Anne Diekema
		"53218", // Sheri Haderlie
		"53821", // David Farrelly
		"53890", // Kevin Reeve
		"315867", // Diantha Smith
		"54379", // Ronda Callister (AEE Dec '13)
		"95110", // Dennis Hinkamp (AEE Dec '13)
		"558936", // Roslynn Brain (AEE Dec '13)
		"53179", // Maria Spicer-Escalante (AEE Dec '13)
		"55480", // Stacy Bevan (AEE Dec '13)
		"905800", // Rebecca Charlton (AEE Dec '13)
		"576998", // Elizabeth Preston (AEE Dec '13)
		"305077", // Clayton Brown (AEE Dec '13)
		"1219826", // Tammy Proctor (AEE Dec '13)
		"58206", // Li Guo (AEE Dec '13)
		"58325", // Ronald Welker (AEE Dec '13)
		"1252260", // Scott Hammond (AEE Dec '13)
		"446295", // Michael Whitesides (AEE Dec '13)
		"1248890", "799637", //Kenneth Larsen
		"54030" //Alan Warnick	
		];

	// If the course or user are in the arrays above, load the tools
	if($.inArray(coursenum, courseArray) != -1 || $.inArray(userID, userArray) != -1){
		
		// Identify if it is a wiki-page or an assignment page
		if ($("#wiki_edit_view_main").length>0 || $("#edit_assignment_wrapper").length>0){
			var timestamp =  +(new Date()); 
			// Check to see if it is the front-page, otherwise load wiki-page tools
			if($(".wizard_popup_link").length>0 || $("#breadcrumbs .ellipsible:last").text() == "Front Page"){
				$.getScript(toolsPath+"/js/tools_front.js", function(){
					console.log("tools_front loaded");
				});
			} else {
				$.getScript(toolsPath+"/js/tools_wiki.js?"+timestamp, function(){
					console.log("tools_wiki loaded");
				});
			}
		}
		// Include Font-Awesome icons
		$("head").append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css?"+timestamp }));

		// Syllabus Tools
		if ($("#course_syllabus").length>0){
			$.getScript(toolsPath+"/js/tools_syllabus.js", function(){
				console.log("tools_syllabus loaded");
			});
		}
	} else {
		// Add styling to tinyMCE editors
		// wiki-page
		$(".edit_link").click(function(){
			setTimeout(function(){
				if($("#wiki_page_body_ifr").length>0){
					addStyletoIframe("#wiki_page_body_ifr");
				}
				if($("a[title='USU Template Wizard'").length>0){
					$("a[title='USU Template Wizard'").hide();
				}
			}, 300);
		});
		// syllabus page
		$(".edit_syllabus_link").click(function(){
			setTimeout(function(){
				if($("#course_syllabus_body_ifr").length>0){
					addStyletoIframe("#wiki_page_body_ifr");
				}
				if($("a[title='USU Template Wizard'").length>0){
					$("a[title='USU Template Wizard'").hide();
				}
			}, 400);
		});
		function addStyletoIframe(mceInstance){
			var $head = $(mceInstance).contents().find("head");
			var timestamp =  +(new Date());                
			$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasMCEEditor.css?"+timestamp, type: "text/css" }));
			$head.append($("<link/>", { rel: "stylesheet", href: globalCSSPath+"?"+timestamp, type: "text/css" }));
			$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasTemplates.css?"+timestamp, type: "text/css" }));
			$head.append($("<link/>", { rel: "stylesheet", href: "/assets/common.css?1376338847", type: "text/css" }));
			$(mceInstance).contents().find("body").css('background-image', 'none').addClass("mce-visualSections");
			if($(mceInstance).contents().find("#usu-custom-css").length>0 || $(mceInstance).contents().find("#custom-css").length>0){
				$head.append($("<link/>", { rel: "stylesheet", href: "/courses/" + coursenum + "/file_contents/course%20files/global/css/style.css", type: "text/css" }));
			}
		}
	}

	// Make styling and tools available for all courses created with custom tools
	if($('#template-wrapper').length>0 || $("#studentVerification").length>0 || $("#course_syllabus").length>0){
		// Live view for tools
		$.getScript(toolsPath+"/js/tools_liveView.js", function(){
			// console.log("Script Loaded.");
		});
	}
	
	// add css for font-awesome if a course is using any of their icons
	if ($(".fa").length>0){
		var timestamp =  +(new Date()); 
		$("head").append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css?"+timestamp }));
		// console.log('Font Awesome added');
	}

	// The following provides the tooltip instructions for updating grade scheme
	function getURLParameter(name) {
		return decodeURI(
			(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		);
	}
	var task = getURLParameter("task");
	if(task == "setGradeScheme"){
		setTimeout(function(){
			$(".edit_course_link").get(0).scrollIntoView();
			$("#course_details_tabs").tabs("option", "active", 0);
			$(".edit_course_link").attr({"data-tooltip":"top","title":"Click Here"}).trigger('mouseenter').click(function (){
				setTimeout(function(){
					$(".grading_standard_checkbox").get(0).scrollIntoView();
					$(".grading_standard_checkbox").attr({"data-tooltip":"top","title":"Check this box"}).trigger('mouseenter').change(function(){
						setTimeout(function(){
							$(".edit_letter_grades_link").attr({"data-tooltip":"top","title":"Click this link"}).trigger('mouseenter').click(function(){
								setTimeout(function(){
									$(".edit_grading_standard_link").attr({"data-tooltip":"top","title":"Click this link if you want to make changes."}).trigger('mouseenter');
									$(".display_grading_standard .done_button").attr({"data-tooltip":"top","title":"When you are finished, click here."}).trigger('mouseenter').click(function(){
										$(".edit_letter_grades_link").trigger("mouseout");
										$(".edit_grading_standard_link").trigger("mouseout");
										setTimeout(function(){
											$(".coursesettings .form-actions .btn-primary").get(0).scrollIntoView();
											$(".coursesettings .form-actions .btn-primary").attr({"data-tooltip":"top","title":"Next Steps:<ol><li>Click this button to save changes.</li><li>Wait for the page to save.</li><li>Close this tab.</li></ol>"}).trigger('mouseenter');
										}, 600);
									});
								}, 600);
							});
						}, 600);
					});
				}, 600);
			});
		}, 1000);
	}
	
	// Change text for add users dialogue.
	setTimeout(function(){
		if($("#addUsers").length>0){
			$("#addUsers").click(function(){
				$("#user_list_textarea").attr("placeholder", "A01234567, A07654321");
				$("#create-users-step-1 p:first").text("Type or paste a list of A#'s below:");
			});
		}
	}, 300);
	// Add title attribute to Resume Quiz button
	if($(".take_quiz_button").length>0){
		$(".take_quiz_button").find("a").attr("title", "Resume Quiz");
	}
	// Hide Start Enrollment link for Flex courses
	if($("a:contains('Start Enrollment')").length>0){
		if($("#masquerade_bar").length>0){
			$("a:contains('Start Enrollment')").parents(".section").show();
		} else {
			$("a:contains('Start Enrollment')").parents(".section").hide();
		}
	}
	// Make Unpublished message stick out more
	if($(".reminder:contains('This Course is Unpublished')").length>0){
		$("body").prepend('<style>.reminder {border: 2px solid #a34140;}.reminder h2 {background-color: #FFEAEA; color: #a34140; border-bottom: 2px solid #a34140;font-weight:bold;}</style>')
	}

	// Add extra space between turnitin check box and cancel button
	if($(".turnitin_pledge").length>0){
		$(".turnitin_pledge").parent('div').css('margin-bottom','30px');
	}

}());

