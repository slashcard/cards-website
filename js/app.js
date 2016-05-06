$(document).foundation();

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
