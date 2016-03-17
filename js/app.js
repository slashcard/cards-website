$(document).foundation();

// Not the best code - needs some CSS refactoring me thinks
function cardwidth() {
	$(".flip-container").each(function() {
		$(this).css('width', '');
		$(this).css('height', '');

		var $front = $(this).find("div.front");
		var $frontWidth = $front.outerWidth();
		var $frontHeight = $front.outerHeight();

		$(this).css('width', $frontWidth + 'px');
		$(this).css('height', $frontHeight + 'px');
	});
}
cardwidth();

$(window).resize(function() {
	cardwidth();
});
