import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css'; // Add your CSS here

const songs = [
  { title: 'Waubash Cannonball', fileName: 'waubash.aac' },
  { title: 'Windy & Warm', fileName: 'windy-and-warm.aac' },
  { title: 'Freight Train', fileName: 'freight-train.aac' },
  { title: 'Cannonball Rag', fileName: 'cannonball-rag.aac' },
  { title: "Doc's Guitar", fileName: 'docs-guitar.aac' },
];

function MusicPlayer() {
  const [songIndex, setSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayerRef = useRef(null);

  const song = songs[songIndex];

  const togglePlayPause = () => {
    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    const newIndex = (songIndex + 1) % songs.length;
    setSongIndex(newIndex);
  };

  const skipBack = () => {
    const newIndex = (songIndex - 1 + songs.length) % songs.length;
    setSongIndex(newIndex);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayerRef.current.currentTime);
  };

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = song.fileName;
      if (isPlaying) {
        audioPlayerRef.current.play();
      }
    }
  }, [songIndex, song.fileName]);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioPlayerRef.current.duration);
    };

    const audio = audioPlayerRef.current;
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='music-player'>
      <img id='album-art' src='./album-art-1024.jpg' alt='album art' />
      <audio ref={audioPlayerRef} />
      <div className='middle-area'>
        <h1 id='title'>{song.title}</h1>
        <h4 id='artist'>Corey Lawrence</h4>
        <div className='progress'>
          <div
            className='progress-bar'
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className='time'>
          <div id='count-up'>{formatTime(currentTime)}</div>
          <div id='count-down'>-{formatTime(duration - currentTime)}</div>
        </div>
        <div className='controls'>
          <button className='control-button skip-button' onClick={skipBack}>
            <img
              className='no-zoom'
              style={{ height: '2.2em' }}
              src='skipback.png'
              alt='Skip'
            />
          </button>
          <button
            className='control-button play-button'
            onClick={togglePlayPause}
          >
            <img
              className='no-zoom'
              id='playPauseImg'
              style={{ height: '6em' }}
              src={isPlaying ? './pause.png' : './play.png'}
              alt='Play'
            />
          </button>
          <button className='control-button skip-button' onClick={skipForward}>
            <img
              className='no-zoom'
              style={{ height: '2.2em' }}
              src='skipforward.png'
              alt='Skip'
            />
          </button>
        </div>
      </div>
      <div id='song-area'>
        {songs.map((song, index) => (
          <React.Fragment key={index}>
            <a
              href='#'
              className='song'
              onClick={(e) => {
                e.preventDefault();
                setSongIndex(index);
                setIsPlaying(true);
              }}
            >
              <p style={{ float: 'left' }}>{song.title}</p>
              <p style={{ float: 'right' }}>1:35</p>
            </a>
            <div className='separator' />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default MusicPlayer;
