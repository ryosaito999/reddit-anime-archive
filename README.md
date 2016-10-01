# Reddit anime discussion thread archive

Simply enter a title into the search bar and the site will try to automatically find all discussion threads of the entered show. 

# Whats the point?

This started as a simple project to take on after finishing Facebook's react js tutorial ( https://facebook.github.io/react/docs/getting-started.html). This is also my first static javascript website as well. This was made as a challenge to see if I could replicate https://www.reddit.com/r/anime subreddit anime archive through the use of javascript, rather than using the subreddit's self entered archive. 

# Design
(Shoutouts to https://github.com/Antrikshy/The-MCU-Index for giving me an example) 

RADA is built as a static react js website. When the user enters a prompt into the serachbox, it uses reddit API to perform a search and filter out all non episode discussion threads as best it can. I run an additional regex parser to filter any non matching thread titles and return the rest to the user. 

The search box adapts typeahead, which is currently using a manually entered data set inside data.js. For now, update data.js to change the results typeahead will try to look for.
