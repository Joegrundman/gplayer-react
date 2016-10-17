###gplayer

This is a skin for **html5 audio player** to meet a challenge requirement.

This version is done using **react** and the **audioContext** object and **NOT** the **<Audio/>** tag  

This is tested in *Chrome* only

The challenge requires a skin for either html5 audio player or jquery jplayer  

The audio player must take a playlist and allow selection of tracks for the player

Since the challenge did not specify cross-browser support, this is only tested on Chrome


## playlist data
For the playlist format, in its current form it only accepts data from a single album, and not a 
collection of mixes with different artists. 

The accepted format of tracks is 

`{name: string, src: string}`

Obviously it is trivial to implement mixed-artist playlists.

Also, it is trivial to implement getting the data as json from a server. 

The musicData is therefore not hardcoded. Any musicData can be passed in or fetched as JSON from a server so long as it   
matches the shape of the hugsar sample. it will be merged into the playlistSelector function.




## externals
react
http://ionicons.com/


## app design

On top of the requirements this audio player also implements:

  skip forward, 
  skip back, 
  autoplay next track on end, 
  shuffle, 
  volume control,
  loop
  visualizer


  Not responsive! Tested only on laptop and with chrome due to time constraints

## music

Sample music playlist by **hugsar**

http://www.hugsar.uk

