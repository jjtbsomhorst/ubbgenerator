# Angular UBB Generator

Generates UBB code used at the Movie topic on gathering.tweakers.net

## Changelog

09-10-2015: Removed the 'meukje.com' referels in the images. 
04-10-2015: Start using config file instead of hardcoded settings in api.php
04-10-2015: When searching for movies on omdb api our api wrapper returns an empty search array when omdb returns an error.
04-10-2015: Using curl instead of file_get_contents. 
03-10-2015: Added backup of images. Refering to imdb servers returned 403's


## Issues
- Uses images from 'meukje' domain. Have to be replaced by custom files
- When adding text to review text area it's size explodes