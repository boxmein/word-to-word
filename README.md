# word-to-word

![inspiration #2](http://imgs.xkcd.com/comics/s_keyboard_leopard.png)

Goes across all your fancy little web pages and changes every occurrence of 
[specified word/phrase/string 1] to [speficied word/phrase/string 2]. Like the 
great and powerful cloud-to-butt extension, only it doesn't only change clouds 
to butts. Call it more generic. 


## Usage

I've produced different ways of using them akin to the old cloud-to-butt, of which
one should at least fit to your niche hipster browser.

### As userscript

There's a Greasemonkey-compatible user script inside userscript/. To modify your
list of replacements, you must directly modify the Javascript `replacements`
array with key-value pairs, like `{from: "cloud", to: "butt"}`

### As Chrome extension

There's a valid unpacked Chrome extension under chrome-ext/, and you can use it
by either loading the folder as an unpacked extension under
chrome://extensions/ with  Developer Mode toggled on, or alternatively you can
use it by the CRX file I've  provided under this repo's releases.

### More to come maybe


## Credits

Inspired by [panicsteve/cloud-to-butt](https://github.com/panicsteve/cloud-to-butt)

Created by boxmein. Free to use by anyone and anything. The code is public domain, 
except parts _stolen_ from panicsteve which are under whatever he serves them
under.
