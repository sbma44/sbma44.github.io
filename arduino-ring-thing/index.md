# Arduino thingy
I promised some microcontroller bits and bobs at the next legal offsite. Alas, I'm sitting this one out. But I thought I'd try to deliver the gadgetry anyway.

The device with the circular LED display and the `dc_large_conf` label on its back is actually a (very) minor piece of Mapbox history: back in the garage days our growing numbers meant that some folks developed an increasingly bad habit of seizing our very limited conference rooms for ad-hoc calls when other people had booked them. In a fit of passive aggressive inspiration, I built these little ring light LED status indicators to dissuade people from doing this right before a meeting was scheduled to start.

One of these sat atop each room's doorway and would read the room's shared calendar and provide a status indication showing whether it was free for use or had something coming up--and include some clues about how bump-able the meeting might be. [It is all more or less documented in this repo](https://github.com/mapbox/conference-room-sign).

As you might imagine, only about 2 other people bothered to learn what the colors meant, the system was ignored, and pretty soon we moved. Oh well! I hope the hardware can now go to a good home.

To show it off and provide a sample implementation, I have coded up an example sketch to set the colors. My aim was to make something that could be turned into a useful display for your raspberry pi projects without a ton of customization. HTTP calls to set individual LEDs is not _really_ the right way to control a display like this. But it should be quite easy to hook up to whatever fun thing you're doing with your Pi.

## Steps for playing around with this:

1. Plug it in, wait for the green animation to appear
2. Join the "hello legal team" wifi network
3. Point your browser at [http://192.168.4.1/](http://192.168.4.1/) -- note that's HTTP, *not* HTTPS
4. Use the UI to set pixels. Fun!(?). Look at the browser network inspector to see how the thing is being controlled.

## To customize it for your own use:

1. Check out the [Arduino code](mapbox_conf_sign.ino.txt)
2. Get your Arduino environment [set up for the ESP8266 chip family](https://arduino-esp8266.readthedocs.io/en/latest/installing.html).
3. Adapt the code to [join your preferred wifi network](https://www.learnrobotics.org/blog/connect-esp8266-wifi/) instead of making its own
4. Flash the new program to the Arduino (ok, technically it is an wifi-equipped Arduino clone, not a real Arduino--its proper name is `Wemos D1 R1`)
5. Figure out a way to give the Arduino a static IP (probably via your router's admin interface)
5. Issue HTTP commands to set pixels, e.g. `curl http://192.168.1.123/led?n=0&r=255&g=128&b=0`

The HTML interface is stored on the device using a now-deprecated technology called SPIFFS. You can have a look at it by using `View Source` in your browser if it's of interest, or by clicking [here](data.index.html.txt).

## Other stuff in the package
I included some components I had lying around which I hope you will either enjoy or pass along to someone who'll find them intriguing:
- a strip of WS2812s, aka neopixels. These work the same as the LED ring, they're just in a different form factor. You will probably need an external power supply if you want to light up more than a couple dozen at once, though (your computer may freak out if you ask its USB bus for too much juice).
- an ESP32, the newer cousin of the ESP8266, for when you want to add Bluetooth to the equation (this one has a camera module that I've never tried)
- a [tiny monochrome OLED display](https://www.instructables.com/Monochrome-096-i2c-OLED-display-with-arduino-SSD13/)
- a servo, for the visceral thrill of things moving (I have never found a real use for one)
- a GPS module. we work for a mapping company, after all. good chance to learn how serial communication works, which is probably what you'll want to base most of your Arduino/Pi frankensteins on
- a breadboard and some hookup wire, for connecting it all up