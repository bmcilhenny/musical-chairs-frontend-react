
## To run on your computer..

Clone down, run `npm install` then `npm start`.

Defaults to opening at [http://localhost:3000](http://localhost:3000), open to view it in the browser.

App will automatically prompt you to accept permissions for changing your spotify playback before first and only before first use. After that you'll be automatically logged in forever. Will eventually add a log out feature so multiple users can log in from your device. 

## How to play musical cheers
Best with 5+ players. However many players will be playing, place that many solo cups around the table. Then pour about a 1/5 of beer into each cup. Choose your playlist, your players, your device (make sure spotify is open on either your laptop or phone at all times, otherwise those devices won't appear in the set up game screen), and begin round. Users ~~walk~~ dance around the table till the music stops, then it's flip cup time. The last person to flip their cup is out. Remove that cup from the table. Refill, then play the next round until one guzzler remains standing. Rinse. Repeat. Enjoy.

##Features to add
- error handling for when automatically logged out
    - show user confirmation message showing them they logged out on purpose
        - another good reason to look into context, with the hack below there's no way to differentiate without context
    - look into react context
        - currently logs out user without message, should present message on login screen
            - hack would be to look at react router, see if the last url was /home and localStorage is empty meaning they were loggedout by the system
- [ ] FUTURE
    - [ ] add a backend that saves a user’s settings (how many players they want to play with, preferred duration of max and min for rounds”
        - [ ] perhaps eventually add a favorite playlist
        - [ ] add a leaderboard for playlists getting the most amount of plays to the home page
        - [ ] disable or enable hey hey hey
            - [ ] or add a custom song to be played in between rounds
        - [ ] time in between rounds


