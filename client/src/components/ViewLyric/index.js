import React, { useEffect, useRef } from "react";
import { ViewLyricWrapper, Sentence, Button } from "./styled.js";
import useInterval from "../../hooks/useInterval";

function ViewLyric({ lyric, sec = 1500 }) {
  // function ViewLyric({ lyric, sec = 1500, isPlay, isPause }) {
  const splitLyric = lyric.split("\n");
  const lyricRef = useRef([]);
  const lyricIdx = useRef(0);

   
  
  const { reset, stop } = useInterval(() => {
 
    lyricRef.current[lyricIdx.current]?.scrollIntoView({
      behavior: "smooth",
    });
    if (splitLyric.length <= lyricIdx.current) {
      lyricIdx.current = 0;
    } else {
      lyricRef.current[lyricIdx.current].style =
        "color: #00a0cb; font-weight: 800;";

      if(lyricIdx.current != 0) {
        lyricRef.current[lyricIdx.current - 1].style =
        "color: #000000; font-weight: 800;";
      }
    }

    lyricIdx.current++;
  }, sec);

  return (
    <>
      <ViewLyricWrapper>
        {splitLyric &&
          splitLyric.map((v, i) => (
            <Sentence ref={(el) => (lyricRef.current[i] = el)}>{v}</Sentence>
          ))}
      </ViewLyricWrapper>
    </>
  );
}

export default ViewLyric;
