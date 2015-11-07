# Angular UBB Generator

Generates UBB code used at the Movie topic on gathering.tweakers.net

## Changelog
07-11-2015: Fixed the multi review layout. Added reviewservice and directives
28-10-2015: Little refactoring and UI changes. Multiple reviews are now displayed in a list and the way code is generated is
			the same for the list as for a single review.
27-10-2015: Implemented multi review generation. You can now generate multiple reviews after each other.
26-10-2015: Added clipboard functionality. It is now possible to copy the content of the UBB text area directly to the clipboard.
04-10-2015: When searching for movies on omdb api our api wrapper returns an empty search array when omdb returns an error.
04-10-2015: Using curl instead of file_get_contents. 
03-10-2015: Added backup of images. Refering to imdb servers returned 403's
