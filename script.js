// JavaScript / jQuery
var hideOverallScore = false;
var overallText = "Overall: ";
var arLabels = [];
var arCounters = [];
var arScores = [];
var feedback = x_currentPageXML.getAttribute("feedback"); // store here because attribute will be overwritten in showResults()
var arQuestions = []; //array of questions to store only first submit (sadly Xerte allows multiple submits when Show Feedback
			//is enabled)

//Note the final feedback for the Categories is displayed in the order they were first presented. So if the Question Order is
// set to Random the final feedback per Category will appear in that same random order.

// Do some checks and alert if one fails.
$(x_currentPageXML).children().each(function(i) { // loops through all child nodes
	if (this.getAttribute("name").indexOf("#") == -1)
		window.alert("No 'Category # Question' layout as question Label\nThis script needs a 'Category # Question' \
			Label layout\n(Category and Question may contain spaces)");
	if (this.getAttribute("name").split("#")[0].length < 2)
		window.alert("Category length should be 2 or more characters\nCategory (and Question) may contain spaces");
	if(this.getAttribute("type")!="Single Answer")
		window.alert("Quiz-Scores-per-Category script only works if\n'Question Type' is 'Single Answer' for all questions");
	if (arQuestions.indexOf(this.getAttribute("name")) == -1)
		arQuestions.push(this.getAttribute("name"));
	else
		window.alert("Quiz-Scores-per-Category script only works if\nall question names (Labels) are unique");
	if(i==$(x_currentPageXML).children().length-1)
		arQuestions.length = 0; //clear array after last item
});

// Monkey patch startQs function to reset arrays
quiz.startQsORIGINAL = quiz.startQs;
quiz.startQs = function() {
	arLabels.length = 0;
	arCounters.length = 0;
	arScores.length = 0;
	arQuestions.length = 0;
	quiz.startQsORIGINAL();
}

// Monkey patch showFeedBackandTrackResults function to track results
quiz.showFeedBackandTrackResultsORIGINAL = quiz.showFeedBackandTrackResults;
quiz.showFeedBackandTrackResults = function() {
	var questionName = $(x_currentPageXML).children()[quiz.questions[quiz.currentQ]].getAttribute("name");
	if (arQuestions.indexOf(questionName) == -1){ // only handle first submit
		arQuestions.push(questionName);
		var questionCat = questionName.split("#")[0].trim();
		if (arLabels.indexOf(questionCat) == -1){
			arLabels.push(questionCat);
			arCounters.push(1);
			if (quiz.currentAnswers[$("#optionHolder input:checked").parent().index()].correct == "true")
				arScores.push(1);
			else
				arScores.push(0);
		}else {
			arCounters[arLabels.indexOf(questionCat)] += 1;
			if (quiz.currentAnswers[$("#optionHolder input:checked").parent().index()].correct == "true")
				arScores[arLabels.indexOf(questionCat)] += 1;
		}
	}
	quiz.showFeedBackandTrackResultsORIGINAL();
}

// Monkey patch showResults function to show results
quiz.showResultsORIGINAL = quiz.showResults;
quiz.showResults = function() {
	var judge = x_currentPageXML.getAttribute("judge");
	// set judge to false as script below will be showing results (not showResultsOLD funtion)
	x_currentPageXML.setAttribute("judge","false");
	if (judge != "false") {
		function addFeedbackFunction(item, index) {
			feedbackAndJudge +=  "<p>" + item + ": " +  x_currentPageXML.getAttribute("score").replace("{i}",
				arScores[index]).replace("{n}", arCounters[index]) + "</p>";
		};
		feedbackAndJudge = "";
		if (!hideOverallScore) {
			var myScore = 0;
			for (var i=0; i<quiz.myProgress.length; i++) {
				if (quiz.myProgress[i] == true) {
					myScore++;
				}
			}
			feedbackAndJudge += "<p>" + overallText +  x_currentPageXML.getAttribute("score").replace("{i}",
				myScore).replace("{n}", quiz.questions.length) + "</p>";
		}
		arLabels.forEach(addFeedbackFunction);
		if (x_currentPageXML.getAttribute("scorePos") == "Above") {
			feedbackAndJudge = feedbackAndJudge + feedback;
		} else {
			feedbackAndJudge = feedback + feedbackAndJudge;
		}
		x_currentPageXML.setAttribute("feedback",feedbackAndJudge);
	}
	quiz.showResultsORIGINAL();
	// set judge back to original value (because quiz.currentAnswers[].correct isn't updated if judge is false)
	x_currentPageXML.setAttribute("judge",judge);
}
