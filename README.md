
# Reddit anime discussion thread archive

![Website](https://github.com/ryosaito999/reddit-anime-archive/blob/master/screenshots/screenshot1.png)

Enter a title into the search bar and the site will try to automatically find all past discussion threads of the entered show. 

# Whats the point?

This started as a simple project to take on after finishing Facebook's react js tutorial ( https://facebook.github.io/react/docs/getting-started.html). This is also my first static javascript website as well. This was made as a challenge to see if I could replicate https://www.reddit.com/r/anime subreddit anime archive through the use of javascript, rather than using the subreddit's self entered archive. 

# Weaknesses
Due to reddit's search algorithm being very error prone, I needed to run my own regex on top of the search API given. Thus certian episodes / titles maybe excluded from the search due to the catch all nature of the website. 
(please feel free to make an issue post if you see a title not work at all) 

Also, due to my lack of experience in javascript / React, it may not be up to FOSS standards, so feel free to make a pull request and clean up my spaghetti code sections as well.

# List of things left todo:
  - Have a script crawl through reddit to complete list of titles
  - Clean up titles with symbols
  - MAL compatability / Lookup ? 
  - Cleanup Readme

# Design
(Shoutouts to https://github.com/Antrikshy/The-MCU-Index for giving me an example) 

RAA is built as a static react js website. When the user enters a prompt into the serachbox, it uses reddit API to perform a search and filter out all non episode discussion threads as best it can. I run an additional regex parser to filter any non matching thread titles and return the rest to the user. 

The search box adapts typeahead/bloodhound, which is currently using a manually entered data set inside data.js. For now, update data.js to change the results typeahead will try to look for.
