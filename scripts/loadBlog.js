// load blog from medium
$(function () {
    var mediumPromise = new Promise(function (resolve) {
    var $content = $('#jsonContent');
    var data = {
        rss: 'https://medium.com/feed/@blueprint-magnify'
    };
    $.get('  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40blueprint-magnify', data, function (response) {
        if (response.status == 'ok') {
            $("#logo").append(`<img src="${response.feed["image"]}" class="rounded mx-auto d-block">`)
            var display = '';
            $.each(response.items, function (k, item) {
                // display+=`<div class = "row">`;
                display+=`<div class = "column" width: 70%; margin-left: auto; margin-right: auto">`;
                display += `<div class="card h-100 mb-3 mx-auto mr-5" style ="width: 100%;">`;
                // style="width: 20rem;";
                var src = item["thumbnail"];
                display += `<a href="${item.link}"><img src="${src}" class="blog-img-hover card-img-top"><p class="blog-read">Read More</p></a>`;
                display += `<div class="card-body d-flex flex-column ">`;
                display += `<h5 class="card-title"><a href="${item.link}">${item.title}</a></h5>`;
                var yourString = item.description.replace(/<img[^>]*>/g,"");
                yourString = yourString.replace('h4', 'p');
                yourString = yourString.replace('h3', 'p');
                var maxLength = 190; // maximum number of characters to extract
                //trim the string to the maximum length
                var trimmedString = yourString.substr(0, maxLength);
                //re-trim if we are in the middle of a word
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                display += `<p class="card-text">${trimmedString}...</p>`;

                /* display += `<div class="card-footer">
                <a href="${item.link}" target="_blank" class="blog-btn btn btn-primary btn-lg shadow-none mt-auto" >Read More</a>
                </div>`; */
                display += '</div></div></div>';
                return k < 10;
            });

            resolve($content.html(display));
        }
    });
    });

mediumPromise.then(function()
    {
        //Pagination
        pageSize = 20;

        var pageCount = $(".card").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".card").hide();
            $(".card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});

var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

// List View
function listView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "100%";
  }
}

// Grid View
function gridView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "33.33%";
  }
}
