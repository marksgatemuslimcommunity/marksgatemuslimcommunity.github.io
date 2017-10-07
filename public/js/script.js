/**
 * Created by Ibrahim on 16/09/2017.
 */
$(document).ready(function () {
    setHijriDay();
    setPrayerTimes();
    setMadrasahSubmenu();
});

function getCurrentTime() {
    var currentTime = moment().format('MMMM Do YYYY');

    $('#date-header').html(currentTime)
}

function setHijriDay() {
    var currentTime = moment().format('dddd • Do MMMM YYYY');
    var hijriDateFormat = moment().format('DD-MM-YYYY');
    var hijriApiUrl = 'https://api.aladhan.com/gToH?date=' + hijriDateFormat;

    $.getJSON(hijriApiUrl, function (response) {
        var hijriDay = response['data']['hijri']['day'];
        var hijriMonth = response['data']['hijri']['month']['en'];
        var hijriYear = response['data']['hijri']['year'];

        $('#date-header').html(currentTime + ' • ' + hijriDay + ' ' + hijriMonth + ' ' + hijriYear)
    });
}

function setPrayerTimes() {
    var prayerTimesUrl = 'http://api.aladhan.com/timings/1398332113?latitude=51.508515&longitude=-0.1254872&timezonestring=Europe/London&method=2';
    $.getJSON(prayerTimesUrl, function (response) {
        var timings = response['data']['timings'];

        $('#prayer-times').html(
            '<table class="table is-narrow is-striped">' +
            '<tr>' +
            '<td>Fajr</td><td>Sunrise</td><td>Dhuhr</td><td>Asr</td><td>Maghrib</td><td>Isha</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + timings['Fajr'] +'</td>' + '<td>' + timings['Sunrise'] +'</td>' + '<td>' + timings['Dhuhr'] +'</td>' + '<td>' + timings['Asr'] +'</td>' +
            '<td>' + timings['Maghrib'] +'</td>' + '<td>' + timings['Isha'] +'</td>' +
            '</tr>' +
            '</table>'
        );

    })
}

function setMadrasahSubmenu() {
    $('#madrasah-link').click(function () {
        toggleSubmenu('#madrasah-submenu');
    });

    $('#aboutus-link').click(function () {
        toggleSubmenu('#aboutus-submenu');
    })
}

function toggleSubmenu(elem) {
    if ($(elem).css('display') === 'none') {
        $(elem).slideDown();
    } else {
        $(elem).slideUp();
    }
}

function setPopup() {
  $('.modal').addClass('is-active');
}

function removePopup() {
  $('.modal').removeClass('is-active');
}