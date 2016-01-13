var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h4 className="commentAuthor">
          {this.props.author}
        </h4>
        <p>{this.props.comment}</p>
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function () {
    return {data: [], author: "", comment: ""}
  },

  componentWillMount: function() {
    this.commentsDB = new Firebase('https://burning-fire-9280.firebaseio.com/comments');
    this.commentsDB.on("child_added", function(snap) {
      var nextData = this.state.data.concat(snap.val());
      this.setState(
        {data: nextData, comment: ""}
      )
    }.bind(this))
  },

  onAuthorChange: function(e) {
    e.preventDefault();
    this.setState({
      author: e.target.value
    });
  },

  onCommentChange: function (e) {
    e.preventDefault();
    this.setState({
      comment: e.target.value
    });
  },

  handleSubmit: function (e) {
    console.log("submit called");
    this.commentsDB.push({
      author: this.state.author, comment: this.state.comment, date: getEpoch()
    })
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onAuthorChange={this.onAuthorChange} onCommentChange={this.onCommentChange} state={this.state}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(entry) {
      return (
        <Comment author={entry.author} comment={entry.comment} key={entry.date}>
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input id="author-field" onChange={this.props.onAuthorChange} value={this.props.state.author} />
        <input id="comment-field" onChange={this.props.onCommentChange} value={this.props.state.comment} />
      </form>
    );
  }
});




ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);


