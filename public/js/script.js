/**
 * Created by Ibrahim on 16/09/2017.
 */
$(document).ready(function () {
    setHijriDay();
    setPrayerTimes();
    setMadrasahSubmenu();
    setCalendar();
});

function getCurrentTime() {
    var currentTime = moment().format('MMMM Do YYYY');

    $('.subtitle').html(currentTime)
}

function setHijriDay() {
    var currentTime = moment().format('dddd • Do MMMM YYYY');
    var hijriDateFormat = moment().format('DD-MM-YYYY');
    var hijriApiUrl = 'https://api.aladhan.com/gToH?date=' + hijriDateFormat;

    $.getJSON(hijriApiUrl, function (response) {
        var hijriDay = response['data']['hijri']['day'];
        var hijriMonth = response['data']['hijri']['month']['en'];
        var hijriYear = response['data']['hijri']['year'];

        $('.subtitle').html(currentTime + ' • ' + hijriDay + ' ' + hijriMonth + ' ' + hijriYear)
    });
}

function setPrayerTimes() {
    var prayerTimesUrl = 'http://api.aladhan.com/timings/1398332113?latitude=51.508515&longitude=-0.1254872&timezonestring=Europe/London&method=2';
    $.getJSON(prayerTimesUrl, function (response) {
        var timings = response['data']['timings'];

        $('#prayer-times').html(
            '<table class="table is-narrow">' +
            '<tr>' +
            '<td>Fajr</td><td>Sunrise</td><td>Dhuhr</td><td>Asr</td><td>Maghrib</td><td>Isha</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + timings['Fajr'] +'</td>' + '<td>' + timings['Sunrise'] +'</td>' + '<td>' + timings['Dhuhr'] +'</td>' + '<td>' + timings['Asr'] +'</td>' +
            '<td>' + timings['Maghrib'] +'</td>' + '<td>' + timings['Isha'] +'</td>' +
            '</tr>'
        );

    })
}

function setMadrasahSubmenu() {
    $('#madrasah-link').click(function () {
        toggleSubmenu('#madrasah-submenu');
    })
}

function toggleSubmenu(elem) {
    if ($(elem).css('display') === 'none') {
        $(elem).slideDown();
    } else {
        $(elem).slideUp();
    }
}

function setCalendar() {
    var calendarUrl = 'http://api.aladhan.com/gToHCalendar/9/2017';
    var months = ['Sun', 'Mon', 'Tue', 'Thu', 'Fri', 'Sat'];
    var monthsHtml = '';
    var startIndex = 0;
    var firstWeek = '';

    $.getJSON(calendarUrl, function (response) {
        var allDays = response.data;

        for (var i = 0; i < allDays.length; i++) {
            var day = allDays[i]['gregorian']['weekday']['en'];

            if (i === 0) {
                startIndex = months.indexOf(day.slice(0, 3));
            }
        }
    });

    for (var m = 0; m < months.length; m++) {
        monthsHtml += '<td>' +  months[m] + '</td>';
        if (m === startIndex) {
            firstWeek += '<td>' + months[startIndex] + '</td>'
        } else if (m < startIndex) {
            firstWeek += '<td></td>';
        }
    }

    $('#islamic-calendar').html(
        /*'<table class="table is-narrow">' +
        '<tr>' + monthsHtml +
        '</tr>' +
        '<tr>' +
        '</tr>' +
        '</table>'*/
    )
}