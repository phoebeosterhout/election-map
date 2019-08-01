var makePolitician = function(name, partyColor) {

  var politician = {};
  politician.name = name;
  politician.electionResults = null;
  politician.totalVotes = 0;
  politician.partyColor = partyColor;

  return politician;
};

var joe = makePolitician("Joe Biden",  [132, 17, 11]);
var bernie = makePolitician("Bernie Sanders", [245, 141, 136]);

joe.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];
bernie.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

joe.electionResults[9] = 1;
bernie.electionResults[9] = 28;

joe.electionResults[4] = 17;
bernie.electionResults[4] = 38;

joe.electionResults[43] = 11;
bernie.electionResults[43]= 27;

joe.tallyVotes = function() {

  this.totalVotes = 0;

  for (var i=0; i < this.electionResults.length; i++) {
    this.totalVotes = this.totalVotes + this.electionResults[i]
  };

  return this.totalVotes;
};

bernie.tallyVotes = function() {

  this.totalVotes = 0;

  for (var i=0; i < this.electionResults.length; i++) {
    this.totalVotes = this.totalVotes + this.electionResults[i];
  };

  return this.totalVotes;
};


var setStateResults = function(state) {
  theStates[state].winner = null;

  if (joe.electionResults[state] > bernie.electionResults[state]) {
    theStates[state].winner = joe;
  } else if (bernie.electionResults[state] > joe.electionResults[state]) {
    theStates[state].winner = bernie;
  }

  var stateWinner = theStates[state].winner;

  if (stateWinner != null) {
    theStates[state].rgbColor = stateWinner.partyColor;
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  }


  var joeVoteTotal = joe.tallyVotes();
  var bernieVoteTotal = bernie.tallyVotes();

  var winner = "?";

  if (joeVoteTotal > bernieVoteTotal) {
      winner = joe.name;
  } else if (joeVoteTotal < bernieVoteTotal) {
      winner = bernie.name;
  } else if (joeVoteTotal == bernieVoteTotal) {
      winner = "DRAW";
  };


  var countryResults = document.getElementById("countryResults");
  var row = countryResults.children[0].children[0];

  row.children[0].innerText = joe.name;
  row.children[1].innerText = joeVoteTotal;
  row.children[2].innerText = bernie.name;
  row.children[3].innerText = bernieVoteTotal;
  row.children[5].innerText = winner;


  var stateResults = document.getElementById("stateResults");
  var header = stateResults.children[0].children[0];
  var body = stateResults.children[1];

  var stateName = header.children[0];
  var stateAbbrev = header.children[1];
  var name1 = body.children[0].children[0];
  var results1 = body.children[0].children[1];
  var name2 = body.children[1].children[0];
  var results2 = body.children[1].children[1];
  var winnerName = body.children[2].children[1];

  stateName.innerText = theStates[state].nameFull;
  stateAbbrev.innerText = theStates[state].nameAbbrev;
  name1.innerText = joe.name;
  results1.innerText = joe.electionResults[state];
  name2.innerText = bernie.name;
  results2.innerText = bernie.electionResults[state];

  if (stateWinner == null) {
    winnerName.innerText = "DRAW";
  } else {
    winnerName.innerText = stateWinner.name;
  }
};
