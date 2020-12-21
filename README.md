# plotly-challenge
UNC Data Analytics Bootcamp
By Ai-Jiuan Wu

Deployment link:  https://ajwu100.github.io/plotly-challenge/

The files/folder that are in this repository include the following: 

1. index.html: Some modifications were made to the initial code which was provided with the assignment.  The layout of the html page was modified.  An unordered list was added to update the demographic information on the page.  This script was used to write the app.js code.
2. samples.json:  JSON data file provided with the assignment.  No modifications were made.  Used to write the app.js code (see below).  
3. 'static' folder:  Contains the app.js file.
    a. app.js: Wrote JavaScript code to build an interactive dashboard using Plotly to make 3 different graphs, including a bar chart, a bubble chart and the gauge chart (Optional assignment).  The test subject's demographic data also is displayed dynamically depending on user's choice.  The code also takes the subject id selected by the user in a dropdown menu field and "listens" for the change of the subject ID.  This change initiates the filtering of all data using the subject ID, and displays the filtered data using the 3 graphs and 1 list on the webpage.  Clicking on another ID on the dropdown menu on the top left corner of the page will refresh and a new search can begin and results displayed.   
    
All development work was performed in local server (python -m http.server - run in terminal) before using GitHub to host the page.
