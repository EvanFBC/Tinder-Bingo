/** @jsx React.DOM */

var Board = React.createClass({
  getDefaultProps: function(){
    return {
      size: 5
    };
  },
  getInitialState: function(){
    // Grab random squares
    var squares = _.chain(['no pictures', 'strong hair preferences', 'tigers or elephants, oh my!', 'hockey jersey', 'foodie',
                           'gym time', 'in town for a month-ish', 'BB PIN: 55723284', 'shirtless', '2+ common interests',
                           'height stats', 'moody guitar shot', 'find me on IG!', 'black and white', 'big acetate glasses',
                           'diacritic', 'only half the face fit', 'Hallowe’en!', 'at da clubb!', 'all selfies all the time',
                           'vegan', 'junkie or addict', 'me and my pet vs. the world', 'race bib', 'swiping instructions'])
                          .shuffle()
                          .first(this.props.size*this.props.size)
                          .value();

    return {
      squares: _.map(squares, function(square){ return { name: square, active: false }; }),
    };
  },
  componentDidMount: function() {
    var squares = this.state.squares;
    var that = this;

    // Calculate all the possible winning combinations
    var rows = _.chain(squares).groupBy(function(square, i){
        return Math.floor(i/that.props.size);
      }).toArray().value();
    var cols = _.chain(squares).groupBy(function(square, i){
        return i % that.props.size;
      }).toArray().value();
    var ltr = [_.chain(rows).map(function(row, i){ return row[i]; }).value()];
    var rtl = [_.chain(rows).map(function(row, i){ return row[that.props.size - 1 - i]; }).value()];
    this.winners = rows.concat(cols, ltr, rtl);
  },
  handleClick: function(key){
    this.state.squares[key].active = !this.state.squares[key].active;
    this.forceUpdate();
    this.checkForBingo();
  },
  checkForBingo: function() {
    var active = _.where(this.state.squares, { active: true });
    var that = this;

    // Look for a winner
    var winner = _.find(this.winners, function(combo, i){
      if(_.intersection(_.pluck(combo, 'name'), _.pluck(active, 'name')).length === 5){
        // If we find it, remove it
        that.winners.splice(i,1);
        return true;
      }
    });

    // We have our winner
    if(winner){
      alert("It's a bingo!");
    }
  },
  render: function(){
    var squares = this.state.squares.map(function(square, i){
      return (<Square i={i} toggleSquare={this.handleClick} name={square.name} active={square.active} />);
    }, this);
    return (<div className="board">{squares}</div>);
  }
});
  
var Square = React.createClass({
  handleClick: function(){
    this.props.toggleSquare(this.props.i);
  },
  render: function(){
    var cx = React.addons.classSet;
    var classes = cx({
      'square': true,
      'active': this.props.active
    });
    return (<div className={classes} onClick={this.handleClick}><span>{this.props.name}</span></div>);
  }
});

FastClick.attach(document.body);
React.render(
  <Board />,
  document.getElementById("bingo")
);
