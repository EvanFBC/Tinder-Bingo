/** @jsx React.DOM */

var Board = React.createClass({
  getDefaultProps: function(){
    return {
      size: 5
    };
  },
  getInitialState: function(){
    return {
      squares: _.chain([ 'no pictures', 'strong hair preferences', 'tigers or elephants, oh my!', 'hockey jersey', 'foodie',
                         'gym time', 'in town for a month-ish', 'BB PIN: 55723284', 'shirtless', '2+ common interests',
                         'height stats', 'moody guitar shot', 'find me on IG!', 'black and white', 'big acetate glasses',
                         'diacritic', 'only half the face fit', 'Hallowe’en!', 'at da clubb!', 'all selfies all the time',
                         'vegan', 'junkie or addict', 'me and my pet vs. the world', 'race bib', 'swiping instructions' ])
                        .shuffle()
                        .first(this.props.size*this.props.size)
                        .value()
    };
  },
  handleBingo: function() {
    alert("It's a bingo!");
  },
  render: function(){
    var squares = _.map(this.state.squares, function(square){
      return (<Square name={square} />);
    });
    return (<div className="board">{squares}</div>);
  }
});
  
var Square = React.createClass({
  getInitialState: function(){
    return {
      active: false
    };
  },
  handleClick: function(){
    this.setState({active: !this.state.active});
  },
  render: function(){
    var cx = React.addons.classSet;
    var classes = cx({
      'square': true,
      'active': this.state.active
    });
    return (<div className={classes} onClick={this.handleClick}><span>{this.props.name}</span></div>);
  }
});

FastClick.attach(document.body);
React.render(
  <Board />,
  document.getElementById("bingo")
);
