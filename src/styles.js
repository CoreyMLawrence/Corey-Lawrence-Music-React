import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const App = styled.div`
  min-height: 138vh;
  position: relative;
  background-color: black;
  display: flex;
  justify-content: center;
  flex-direction: row;
  overflow-x: hidden;
`;

export const MusicPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: linear-gradient(#163264, #050e1e);
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
  height: 100svh;
  z-index: 1;
  position: relative;
`;

export const AlbumArt = styled.img`
  margin-top: 4svh;
  border-radius: 2em;
  width: 84vw;
  max-width: 22em;
`;

export const Title = styled.h1`
  font-size: 1.9em;
  margin: 1em 0em -0.5em 0em;
`;

export const Artist = styled.h4`
  font-weight: 500;
  font-size: 1.2em;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8svh 0.5vw 8svh 0.5vw;
  width: 100%;
`;

export const ControlButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 8em;
`;

export const iconStyles = css`
  color: white;
  font-size: 4.5em;
`;

export const BaseProgressBar = styled.div`
  background-color: white;
  width: 100%;
  height: 5px;
  z-index: 999;
  position: relative;
  left: 0;
  border-radius: 2.5px;
`;

export const ProgressBar = styled(BaseProgressBar)`
  width: 100%;
  height: 5px;
  border-radius: 2.5px;
  background-color: white;
  position: relative;
  z-index: 1;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 2.5px;
  overflow: hidden;
  position: absolute;
  margin-top: -5px;
`;

export const ProgressBarPlaceHolder = styled(BaseProgressBar)`
  opacity: 0.5;
`;

export const CountUp = styled.div`
  text-align: left;
  position: relative;
  left: 0;
`;

export const CountDown = styled.div`
  text-align: right;
  position: relative;
  right: 0;
`;

export const TimeWrapper = styled.div`
  padding-top: 0.25em;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: -3svh;
  margin-bottom: -2em;
  font-size: 0.75em;
  font-weight: 100;
  opacity: 0.75;
`;

export const SongArea = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: black;
  padding: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 0;
  padding: 1em 0 1em 0;
`;

export const SongLine = styled.button`
  background-color: transparent;
  border: none;
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #111; /* Very dark gray, close to black */
  }
`;

export const Separator = styled.div`
  border-bottom: solid #ffffff 1px;
  border-radius: 0.5px;
  width: 85%;
  opacity: 0.5;
`;
