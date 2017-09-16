/**
 * Created by Ibrahim on 16/09/2017.
 */
$(document).ready(function () {
  var currentTime = moment().format('dddd • Do MMMM YYYY');

  var hijriDateFormat = moment().format('DD-MM-YYYY');
  var hijriApiUrl = 'https://api.aladhan.com/gToH?date='+hijriDateFormat;

  $.getJSON(hijriApiUrl, function (response) {
    var hijriDay = response['data']['hijri']['day'];
    var hijriMonth = response['data']['hijri']['month']['en'];
    var hijriYear = response['data']['hijri']['year'];

    $('.subtitle').html(currentTime + ' • ' + hijriDay + ' ' + hijriMonth + ' ' + hijriYear)
  });



});

function getCurrentTime() {
  var currentTime = moment().format('MMMM Do YYYY');

  $('.subtitle').html(currentTime)
}