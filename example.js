var firebaseData = new Firebase('https://burning-fire-9280.firebaseio.com');
var commentsDB = firebaseData.child("comments");

var getEpoch  = function() {
  return (new Date()).getTime();
}

var epochToDate = function(epoch) {
  var d = new Date(0);
  d.setUTCMilliseconds(epoch);
  return d;
}


var handleCommentKeypress = function (e) {
  if (e.keyCode == 13) {
    var author = $("#author-field").val();
    var comment = $("#comment-field").val();
    if (author && comment) {
      var date = new Date();
      date = date.toString();
      commentsDB.push(
        {author: author, comment: comment, date: getEpoch()}
      );
    } else {
      alert("Author and Comment are required fields!");
    }
  }
};

commentsDB.on("child_added", function (snap) {
  var entry = snap.val();
  var entryLI = $("<li></li>").text(
    entry.author + ": " + entry.comment + " [ " + epochToDate(entry.date).toString() + " ] "
  )
  $("#comments-list").append(entryLI);
  $("#comment-field").val("");
})

$("#comment-field").keypress(handleCommentKeypress)
//$("#author-field").keypress(handleCommentKeypress)

var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
ref.orderByChild("height").on("child_added", function (snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});

