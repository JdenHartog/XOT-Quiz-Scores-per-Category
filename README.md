# XOT-Quiz-Scores-per-Category
This JavaScript can be used to provide different scores for different categories in a Quiz in Xerte Online Toolkit

# Intro
The Quiz item in Xerte Online Toolkit (XOT) https://github.com/thexerteproject/xerteonlinetoolkits can only provide one score for the entire Quiz. It is presented as *number of correct answers / number of questions*. By copy pasting the script from **script.js** to the script property of the Quiz item, you will be able to provide different scores for different categories. The script automatically creates categories using the question Labels. The Labels should be formatted like *Category A # Question 1* etc. Take the following 4 question Labels for example:

- Category A # Question 1<BR>
- Category A # Question 2<BR>
- Category B # Question 1<BR>
- CategoryB # Question 2<BR>
 
Depending on the answers given, the final feedback could look like:

Overall: You scored 2/4<BR>
Category A: You scored 1/2<BR>
Category B: You scored 0/1<BR>
CategoryB: You scored 1/1<BR>

Note "Category B " and "CategoryB " will be treated as two different categories because of the missing space!

# How to use
Click the **script.js** file and click Raw. This will open the Raw Code in your browser to easily copy the code (Ctrl+A & Ctrl+C). Now add a Quiz item to your project and Script to it from the Optional Properties. Paste (Ctrl+V) the script we just copied into the Script field. Make sure all Questions have a Label with a 'Category # Question' layout and that all Labels are unique. You're good to go!

You Can also click the green *Clone or download* button to download this project including the working **Example_offline.zip** to either test in a web browser by unpacking and opening the index.htm inside or importing it into your XOT environment. You can do this by selecting your Workspace folder and clicking the *i* Properties button and selecting the *Import* tab etc.

# Use score first submit only
The script also makes sure only the first submit is used to calculate the final score, when *Show Feedback* is enabled. The standard Xerte Quiz *without* the script will take the last submitted answer to calculate the end score. This allows the participant to read the feedback and change the answer to the correct one getting a perfect Quiz score.

To use the *score first submit only* functionally without using multiple categories you can just create one category and set `hideOverallScore` to `true` on [line 2](https://github.com/JdenHartog/XOT-Quiz-Scores-per-Category/blob/master/script.js#L2). When you have 10 questions and you use "Result #" as a prefix to all 10 question Labels, the script will work.<BR>
If half the first submitted questions where correct the final feedback would look like: *Result : You scored 5 / 10*

# Notes
- You can still use the *You scored {i} out of {n} marks* option to change the default judge text from *You scored {i} / {n}* to *You answered {i} out of {n} answers correctly* for example.
- You can still use the Optional Property: *Score Position* to place the score above or below the feedback.
- You can use the variable `overallText` on [line 3](https://github.com/JdenHartog/XOT-Quiz-Scores-per-Category/blob/master/script.js#L3) to change that text to your own language.
- This JavaScript is tested with Xerte version 3.7.4

 
