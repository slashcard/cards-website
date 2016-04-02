$(document).foundation();

// Not the best code - needs some CSS refactoring me thinks
function cardwidth() {
  $(".flip-container").each(function() {
    $(this).css("width", "");
    $(this).css("height", "");

    var $front = $(this).find("div.front");
    var $frontWidth = $front.outerWidth();
    var $frontHeight = $front.outerHeight();

    $(this).css("width", $frontWidth + "px");
    $(this).css("height", $frontHeight + "px");
  });
}
cardwidth();

$(window).resize(function() {
  cardwidth();
});

$("#rolodex-form").submit(function(event) {
  event.preventDefault();

  var form_json = {
    'name': $("#name-input").val(),
    'email': $("#email-input").val(),
    'twitter': $("#twitter-input").val(),
  }

  $.ajax({
    url: "https://formspree.io/dwight@dwightgunning.com",
    method: "POST",
    data: form_json,
    dataType: "json"
  })
    .done(function(data) {
      $("#rolodex-submission-confirmed-modal").foundation("open");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      $("#rolodex-form-submit-error").show();
    });
});
