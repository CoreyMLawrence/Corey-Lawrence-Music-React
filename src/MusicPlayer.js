/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import LinearProgress from '@mui/material/LinearProgress';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';

import {
  App,
  MusicPlayerContainer,
  AlbumArt,
  ControlButton,
  iconStyles,
  CountUp,
  CountDown,
  TimeWrapper,
  SongArea,
  SongLine,
  Separator,
} from './styles.js';

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
    try {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error occurred while toggling play/pause:', error);
    }
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
  const isMounted = useRef(true);
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (isMounted.current) {
        setDuration(audioPlayerRef.current.duration);
      }
    };

    const audio = audioPlayerRef.current;
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [songIndex]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getProgressValue = () => {
    const progress = (currentTime / duration) * 100;
    return progress < 0 ? 0 : progress;
  };
  try {
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
            <Typography
              variant='h1'
              component='h1'
              sx={{
                width: '10em',
                fontWeight: 800,
                fontSize: '1.9em',
                margin: '1em 0em -0.5em 0em',
              }}
            >
              {song.title}
            </Typography>

            <Typography
              variant='h4'
              component='h2'
              sx={{
                fontWeight: 400,
                fontSize: '1.2em',
                margin: '1em 0em 2em 0em',
              }}
            >
              Corey Lawrence
            </Typography>
            <LinearProgress
              variant='determinate'
              value={getProgressValue()}
              sx={{
                width: '100%',
                height: 5,
                borderRadius: 2.5,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2.5,
                  backgroundColor: '#fff',
                },
              }}
            />
            <TimeWrapper>
              <CountUp id='count-up'>{formatTime(currentTime)}</CountUp>
              <CountDown id='count-down'>
                -{formatTime(duration - currentTime)}
              </CountDown>
            </TimeWrapper>
            <ButtonGroup
              className='control-button-group'
              variant='text'
              aria-label='music player controls'
              sx={{
                marginTop: '5em',
              }}
            >
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
            </ButtonGroup>
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
              {index !== songs.length - 1 && (
                <Separator className='separator' />
              )}
            </React.Fragment>
          ))}
        </SongArea>
      </App>
    );
  } catch (error) {
    console.error('An error occurred:', error);
    // You can return a fallback UI or handle the error in any other way here
    return null; // Or a fallback component
  }
}

export default MusicPlayer;
