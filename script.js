var len;
var results = '';

function changeBackground() {
  console.log("inide changeBackground");
  document.getElementById("body").style.backgroundImage = "url(./the1975alt.jpg)";
}

function startTime() {


}

function getTimeDisplay () {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  m = checkTime(m);
  var t = setTimeout(startTime, 500);

  $(function () {
    $("#timeDisplay").dialog({
        autoOpen: true,
        title: "Current Time:"
    });
    $("#timeBtn").click(function () {
        $("#timeDisplay").dialog("open");
    });
  });
  let html = `${h + ":" + m}`
  const timeBox = document.getElementById("timeDisplay").innerHTML = html;
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  //console.log(params.q);

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "4304d0775ed6452283917a7530950166");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      let results = '';
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
    
}