/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import {
  App,
  MusicPlayerContainer,
  AlbumArt,
  Title,
  Artist,
  Controls,
  ControlButton,
  iconStyles,
  ProgressBar,
  ProgressBarWrapper,
  ProgressBarPlaceHolder,
  CountUp,
  CountDown,
  TimeWrapper,
  SongArea,
  SongLine,
  Separator,
} from './styles';

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
  }, [songIndex, song.fileName, isPlaying]);

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
  }, [songIndex]); // Ensure useEffect runs whenever songIndex changes

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <App>
      <MusicPlayerContainer>
        <AlbumArt id='album-art' src='./album-art-1024.jpg' alt='album art' />
        <audio
          ref={audioPlayerRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={skipForward}
        />
        <div className='middle-area'>
          <Title id='title'>{song.title}</Title>
          <Artist id='artist'>Corey Lawrence</Artist>
          <div
            className='progress'
            style={{
              paddingBottom: '4svh',
              width: '100%',
            }}
          >
            <ProgressBarPlaceHolder></ProgressBarPlaceHolder>
            <ProgressBarWrapper>
              <ProgressBar
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              />
            </ProgressBarWrapper>
          </div>
          <TimeWrapper>
            <CountUp id='count-up'>{formatTime(currentTime)}</CountUp>
            <CountDown id='count-down'>
              -{formatTime(duration - currentTime)}
            </CountDown>
          </TimeWrapper>
          <Controls>
            <ControlButton
              className='control-button skip-button'
              onClick={skipBack}
            >
              <SkipPreviousIcon css={iconStyles} />
            </ControlButton>
            <ControlButton
              className='control-button play-button'
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <PauseIcon css={iconStyles} />
              ) : (
                <PlayArrowIcon css={iconStyles} />
              )}
            </ControlButton>
            <ControlButton
              className='control-button skip-button'
              onClick={skipForward}
            >
              <SkipNextIcon css={iconStyles} />
            </ControlButton>
          </Controls>
        </div>
      </MusicPlayerContainer>
      <SongArea id='song-area'>
        {songs.map((song, index) => (
          <React.Fragment key={index}>
            <SongLine
              className='song'
              onClick={() => {
                setSongIndex(index);
                setIsPlaying(true);
              }}
            >
              <p>{song.title}</p>
              <p>1:35</p>
            </SongLine>
            {index !== songs.length - 1 && <Separator className='separator' />}
          </React.Fragment>
        ))}
      </SongArea>
    </App>
  );
}

export default MusicPlayer;
