# XOT-Quiz-Scores-per-Category
This JavaScript can be used to provide different scores for different categories in a Quiz in Xerte Online Toolkit

# Intro
The Quiz item in Xerte Online Toolkit (XOT) https://github.com/thexerteproject/xerteonlinetoolkits can only provide one score for the entire Quiz. It is presented as *number of correct answers / number of questions*. By copy pasting the script from **script.js** to the script property of the Quiz item you will be able to provide different scores for different categories. The script automatically creates categories using the question Labels. The Labels should be formatted like *Category A # Question 1* etc. Take the following 4 question Labels for example:

Category A # Question 1
Category A # Question 2
Category B # Question 1
CategoryB # Question 2

Note "Category B " and "CategoryB " will be treated as two different categories because of the missing space!

