// this is working

var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.firebaseRef.push(this.state.text);
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://todokyz.firebaseio.com/items");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      var nextItems = this.state.items.concat([
        {text: dataSnapshot.val(), id: Date.now()}
      ])
      //this.items.push(dataSnapshot.val());
      this.setState({
        items: nextItems,
        text: ""
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<TodoApp />, document.getElementById("main"));
