-Fetching weather data using forecast.io and assign them in real-time to levels of different audio effects.

-The audio effects are connected to the output of a 16 step-sequencer with predetermined
and maybe interchangeable set of sounds using Tone.js

-The user only ‘draw’ his melody by selecting the steps he want in the sequencer.

-The user could send his creation by email with  a little memo that says :

“John” created this melody for you on ‘’date and time” while it was “sunny” and the humidity level was “70%” in “Montreal” 



——————————————————————————      ----------------------
Real-time weather data       &     Associated effects
——————————————————————————      -----------------------

Sunny---------------------      Lowpass filter all UP (all the highs) and a sound set in major key
Cloudy————————————--------      Lowpass Filter DOWN (less highs)
Temperature-Hot(celcius)——      bpm UP
Temperature-Cold(celsius)—      bpm DOWN
Rain or Snow probability(%)     Delay and a sound set in minor key if > 75%
Humidity level (%)—————---      Envelope filter level (auto-wah)
Wind Speed km/h—————------      White noise level or Flanger level
Pressure(kPa)—————————----      Compression level
Visibility(km) —————————--      Chorus level
Air Quality(IQA)————————--      Overdrive level
Thunder Alert———————------      Distortion level


The output of the effect chain could be connected to some sound visualisation tools from p5.js
to animate the page in real-time