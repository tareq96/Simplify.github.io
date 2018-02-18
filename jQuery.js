var posts, comments, users;
var postsIds = [];
var postsPage;
var detailsPage;
var images = ["tea.jpg", "strawberry.jpg", "delicious.jpg", "vintage.jpg", "pizza.jpg", "Creamy_Fruit_Salad.jpg", "Grilled.jpg"];

$.when(
    $.get("https://jsonplaceholder.typicode.com/posts", function(data){
        posts = data;
    }),
    $.get("https://jsonplaceholder.typicode.com/users", function(data){
        users = data;
    }),
    $.get("https://jsonplaceholder.typicode.com/comments", function(data){
        comments = data;
    })
).then(function(){
    console.log(posts);
    console.log(users);
    console.log(comments);
    displayPosts(0, 9);
    postsIds.every(function(id){
        $("#"+id).click(function(){
            postsPage.hide();
            detailsPage.show();
            loadDetails(id, getUserId(id));
        });
        return true;
    });
});

// function makeAjaxCall(url){
//     return new Promise(function(resolve, reject){
//         $.ajax({
//             url: url,
//             type: 'GET',
//             success: function(Odata){
//                 resolve (Odata);
//             }
//         });
//     });
// }
// makeAjaxCall("https://jsonplaceholder.typicode.com/posts").then(processUserDetailsResponse, errorHandler);
// function processUserDetailsResponse(userData){
//     posts = userData;
//     console.log("render user details", userData);
// }
// function errorHandler(statusCode){
//     console.log("failed with status", status);
// }   

// $.ajax({
//     url: "https://jsonplaceholder.typicode.com/posts",
//     type: 'GET',
//     async: false,
//     success: function(Odata){
//         posts = Odata;
//     }
// });
// $.ajax({
//     url: "https://jsonplaceholder.typicode.com/users",
//     type: 'GET',
//     async: false,
//     success: function(Odata){
//         users = Odata;
//     }
// });
// $.ajax({
//     url: "https://jsonplaceholder.typicode.com/comments",
//     type: 'GET',
//     async: false,
//     success: function(Odata){
//         comments = Odata;
//     }
// });

function displayPosts(start, finish) {
    var index, body;
    for (index = finish; index >= start; index--) {
        postsIds.push(posts[index].id);
        if (posts[index].body.length > 100) {
            body = posts[index].body.substring(0, 65) + "<br>" + posts[index].body.substring(65, 100);
       } else {
           body = posts[index].body;
       }
       var user = getUser(posts[index].userId).username;
       var cont = new content_left(images[index % images.length], posts[index].title, posts[index].id, user, null, null, body);
       $(".section-left").prepend(cont.getString());
    }
    
}
function getUser(id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i];
        }
    }
    return "Not Found";
}
function getUserId(postId) {
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].id == postId) {
            return posts[i].userId;
        }
    }
    return -1; // if the user not found
}
function loadDetails(postId, userId) {
    var user = getUser(userId);
    var cont = new details_cont("tea.jpg", postId, posts[postId-1].title, posts[postId-1].body, user.username, user.email, user.address.street, user.address.suite, user.address.city, user.address.zipcode, user.address.geo.lat, user.address.geo.lng, getComments(postId));
    detailsPage.prepend(cont.getString());
    listen();
}
function getComments(postId) {
    var result = "";
    for (var i = 0; i < comments.length ; i++) {
        if (comments[i].postId == postId) {
            result += ("<b>Name:    </b>" + comments[i].name + "<br>");
            result += ("<b>Email:   </b>" + comments[i].email + "<br>");
            result += ("<b>Body:    </b>" + comments[i].body + "<br>");
            result += "<p>______________________________________________________________________________________</p>";
        }
    }
    return result;
}
function listen() {
    $("#goBack").click(function(){
        detailsPage.empty();
        postsPage.show();
        detailsPage.hide();
    });
}
function content_left(img, header, id, p1, p2, p3, details) {
    this.opening_section = "<section class=\"cont-left\">";
    this.img = "<img class=\"image pull-left cursorPointer\" src=\"Images/" + img + "\" alt=\"tea with cookies\">";
    this.header = "<h3 id=\"" + id + "\" class=\"cursorPointer positionRel positionRel\">" + header + "</h3>";
    this.icon1 = "<i id=\"icon\" class=\"fa fa-user pull-left colorGray\" aria-hidden=\"true\"></i>";
    this.p1 = "<p class=\"desc margin0 pull-left positionRel colorGray\">" + p1 + "</p>";
    this.icon2 = "<i id=\"icon\" class=\"fa fa-calendar-o pull-left colorGray\" aria-hidden=\"true\"></i>";
    this.p2 = "<p class=\"desc margin0 pull-left positionRel colorGray\">5/26/2016</p>";
    this.icon3 = "<i id=\"icon\" class=\"fa fa-comments-o pull-left mobileDisplayNone colorGray\" aria-hidden=\"true\"></i>";
    this.p3 = "<p class=\"desc mobileDisplayNone margin0 pull-left positionRel colorGray\">5 Comments</p>";
    this.details = "<p class=\"details mobileDisplayNone pull-left positionRel colorGray\">" + details + "</p>";
    this.closing_section = "</section> <section class=\"borderTop width100\"></section>";
    this.getString = function() {
        return this.opening_section + " " + this.img + this.header + this.icon1 + this.p1 +
         this.icon2 + this.p2 + this.icon3 + this.p3 + this.details + this.closing_section;
    }
}
function details_cont(img, id, header, details, name, email, street, suite, city, zipcode, lat, lng, comment) {
    this.opening_section = "<section class=\"cont-left\">";
    this.open_div1 = "<div class=\"image-cont\">";
    this.img = "<img class=\"image pull-left cursorPointer\" src=\"Images/" + img + "\" alt=\"tea with cookies\">";
    this.header = "<h3 id=\"" + id + "\" class=\"cursorPointer positionRel positionRel\">" + header + "</h3>";
    this.details = "<p class=\"details mobileDisplayNone pull-left positionRel colorGray\">" + details + "</p>";
    this.close_div1 = "</div>";
    this.open_div2 = "<div class=\"pull-left AuthorInformation\">";
    this.author = "<h3>Author Information</h3>";
    this.name = "<p>name:   " + name + "</p>";
    this.email = "<p>email:  " + email + "</p>";
    this.address = "<b>address:</b>";
    this.street = "<p>street:    " + street + "</p>";
    this.suite = "<p>suite:    " + suite + "</p>";
    this.city = "<p>city:    " + city + "</p>";
    this.zipcode = "<p>zipcode:    " + zipcode + "</p>";
    this.lat = "<p>lat:    " + lat + "</p>";
    this.lng = "<p>lng:    " + lng + "</p>";
    this.close_div2 = "</div>";
    this.open_div3 = "<div class=\"pull-left Comments\">";
    this.comments = "<h3>Comments</h3>";
    this.comment = "<p>" + comment + "</p>";
    this.close_div3 = "</div>";
    this.button = "<button id=\"goBack\" class=\"pull-left Back\">Back</button>";
    this.closing_section = "</section>";
    this.getString = function() {
        return this.opening_section + " " + this.open_div1 + this.img + this.header + this.details +
         this.close_div1 + this.open_div2 + this.author + this.name + this.email + this.address +
         this.street + this.suite + this.city + this.zipcode + this.lat + this.lng +
          this.close_div2 + this.open_div3 + this.comments + this.comment  + this.close_div3 + this.button +
           this.closing_section;
    }
}

$(function(){
     postsPage = $(".section-left");
     detailsPage = $(".section-left-details");
    
    // for dynamic binding
    // $(".section-left-details").on("click", ".cont-left", function(){
    //     alert("clicked");
    // });
});