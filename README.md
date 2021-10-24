# Museum Louvre
Museum Louvre
Deploy: https://museumlouvre.netlify.app

This pet project represents the website of the famous museum in Paris - the Louvre.

Used technologies: html, scss, javaScript, mapbox.api, swipper.js.
Adaptive.

## Header
Header has 3 breakpoints on which the menu display changes.
- Till 1024px - ordinary menu.
- From 1024px to 768px - burger menu. Items appear from the left side. An appearance of elements is implemented using asynchronous function.
- Less then 768 - mobile menu. After click on menu item or another place on the screen it dissapers.
## Welcome
Custom slider. Support arrow's, grab's, bullet's switch. 
## Visiting
Grid layout. Hover effect.
After click redirects to google map(360).
## Explore
The slider shows the picture before and after the restoration.
Use clip: rect() for hidding.
## Video
Custom videoplayer. 
Stylized ranges and bullets.
You can move, click range.
Each icon can be clicked (pause, volume, fullscreen).
Control with keyboard:
  - Space - play/pause.
  - M - off/on volume.
  - F - fullscreen.
  - -> +5sec.
  - <- -5sec.
  - \> increas video's speed.
  - < decreas video's speed.
### Video slider
Swiper slider.
Posters load insted of youtube videos. When you click on poster video starts loads on page.
Only one video can be played at a time. When you start another, current will be stopped.
## Gallery
Masonry style. 
Less then 768px - 2 columns, otherwise - 3. Pictures are responsive.
Js control slowly appearance of pictures.
## Tickets
If you choose something on main page it will be changed in form.
Cost depends on tickets type. Total and tickets' cost are changed automaticlly.
Each input is checked with validation after click on button book(exept data and time, they are checked immediatly.
After successful form comlete the corresponding message will appear on the screen.
## Contacts
Used mapbox.api(style and marks).
