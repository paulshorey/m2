/* eslint-disable @typescript-eslint/no-unused-vars */
import Box, { BoxProps } from '@mui/material/Box';
import { SerializedStyles } from '@emotion/react';
import React, { FC, useEffect, useRef, useState } from 'react';
// @ts-ignore
import { getQueryParam } from 'src/functions/url';
import pictureFromSrc from '@techytools/uui/functions/pictureFromSrc';
import { pictureSizeProps } from '@techytools/uui/functions/pictureFromSrc.d';

// @ts-ignore
import styles from './styles';

type Modify<T, R> = Omit<T, keyof R> & R;
type Props = pictureSizeProps & {
  className?: string;
  crop?: boolean;
  css?: SerializedStyles;
  forceVideoPlay?: boolean;
  image: string;
  imageMobile?: string;
  imageProps?: Record<string, any>;
  imageTablet?: string;
  notLazy?: boolean;
  overlayPercentage?: number;
  style?: React.CSSProperties;
  video?: string;
  videoControls?: {
    pause?: () => void;
    play?: () => void;
    rewind?: () => void;
  };
  videoDelay?: number;
  videoMobile?: string;
  videoProps?: any;
  videoTablet?: string;
  widthPhoneMax?: number;
  widthTabletMax?: number;
};

/**
 * Renders a div with a background image and video. Video is optional, but image is required.
 */
const Multimedia: FC<Modify<BoxProps, Props>> = ({
  className,
  forceVideoPlay = false,

  crop = true,
  image,
  imageMobile,

  imageProps = {},
  imageTablet,
  notLazy,
  overlayPercentage = 0.4,
  video,

  videoControls = {},
  videoDelay = 0,
  videoMobile,
  videoProps = {},
  videoTablet,

  widthPhoneMax = 767,
  widthTabletMax = 1024,

  ...props
}) => {
  /*
   * Do not render video if ?qaStatic queryString flag is set
   */
  const [qaStatic, set_qaStatic] = useState(false);
  useEffect(() => {
    if (videoRef.current) {
      // @ts-ignore
      videoRef.current.pause();
    }
    const qaStatic = getQueryParam('qaStatic');
    if (qaStatic && qaStatic !== null) {
      set_qaStatic(true);
    }
  }, []);

  /*
   * IMAGE DATA:
   */
  const picture = pictureFromSrc({
    ...props,
    crop,
    src: image,
    srcMobile: imageMobile,
    srcTablet: imageTablet,
  });
  // console.log('picture', picture);

  /*
   * VIDEO DATA:
   */
  const videoRef = useRef(null); // watch entire video element when it comes into view
  const videoCenterRef = useRef(null); // watch only center of video element when it comes into view
  const [videoPlaying, set_videoPlaying] = useState(false);
  const [videoSrc, set_videoSrc] = useState(video);
  const [isIntersectingCenter, set_isIntersectingCenter] = useState(false); // controls PAUSE/PLAY
  const [isIntersectingWhole, set_isIntersectingWhole] = useState(false); // controls RESTARTING video from the beginning
  const [wasIntersecting, set_wasIntersecting] = useState(false); // whether show the <video src="???"> at all

  useEffect(() => {
    if (video) {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }
      // observe Center
      const observerCenter = new IntersectionObserver(([entry]) => {
        if (!entry) {
          return;
        }
        if (!!entry.isIntersecting && !wasIntersecting) {
          set_wasIntersecting(true);
        }
        set_isIntersectingCenter(entry.isIntersecting);
      });
      if (videoCenterRef && videoCenterRef.current) {
        observerCenter.observe(videoCenterRef.current);
      }
      // observe Whole
      const observerWhole = new IntersectionObserver(([entry]) => {
        if (!entry) {
          return;
        }
        set_isIntersectingWhole(entry.isIntersecting);
      });
      if (videoRef && videoRef.current) {
        observerWhole.observe(videoRef.current);
      }
    }
  }, [video]);

  // observe Center
  useEffect(() => {
    if (video) {
      // PLAY when middle of video is visible in viewport
      if (!!isIntersectingCenter && !videoPlaying && videoControls?.play) {
        setTimeout(videoControls.play, videoDelay);
      }
      // PAUSE when hidden from view
      if (!isIntersectingCenter && videoPlaying && videoControls?.pause) {
        videoControls.pause();
      }
    }
  }, [isIntersectingCenter]);

  // observe Whole
  useEffect(() => {
    // REWIND TO BEGINNING when entire video is visible again
    if (!!isIntersectingWhole && !videoPlaying && videoControls?.rewind) {
      videoControls.rewind();
    }
  }, [isIntersectingWhole]);

  // USE MOBILE video src on mobile devices
  const eventListenerFunction = () => {
    if (video) {
      const newWidth = window?.document?.documentElement?.clientWidth;
      if (videoMobile && newWidth && newWidth <= widthPhoneMax) {
        set_videoSrc(videoMobile);
      } else if (videoTablet && newWidth && newWidth <= widthTabletMax) {
        set_videoSrc(videoTablet);
      } else {
        set_videoSrc(video);
      }
    }
  };
  useEffect(() => {
    // Force video to play (in case FullpageJS script breaks it)
    if (forceVideoPlay) {
      // @ts-ignore
      if (videoRef?.current?.start) {
        try {
          // @ts-ignore
          videoRef?.current?.start();
          // @ts-ignore
          setTimeout(videoRef?.current?.start, 300);
          // @ts-ignore
          setTimeout(videoRef?.current?.start, 600);
        } catch (e) {}
      }
    }

    // Reset on resize
    if (video && videoMobile) {
      eventListenerFunction();
      window?.addEventListener('resize', eventListenerFunction);
      return () => {
        window?.removeEventListener('resize', eventListenerFunction);
      };
    }
    return;
  }, []);

  /*
   * VIDEO CONTROLS
   * Usable by parent element (just pass an empty object, see props)
   */
  videoControls.pause = () => {
    set_videoPlaying(false);
    if (videoRef?.current) {
      // @ts-ignore
      videoRef.current.pause();
    }
  };
  videoControls.play = () => {
    set_videoPlaying(true);
    if (videoRef.current) {
      // @ts-ignore
      videoRef.current.play();
    }
  };
  videoControls.rewind = () => {
    if (videoRef.current) {
      // @ts-ignore
      videoRef.current.currentTime = 0;
    }
  };
  /*
   * RENDER:
   */
  if (!picture) {
    return null;
  }
  // Pass all props, but remove non-standard DOM attributes
  const {
    height,
    heightMobile,
    heightTablet,
    heightDesktop,
    heightWidthRatio,
    heightWidthRatioMobile,
    heightWidthRatioTablet,
    heightWidthRatioDesktop,
    width,
    ...styleProps
  } = props as any; // tsFixMe exclude heightWidthRatio*
  return (
    <Box
      className={'Multimedia' + (className ? ' ' + className : '')}
      css={styles.wrapper({
        heightWidthRatio: picture.height_width_ratio,
        heightWidthRatioMobile: picture.height_width_ratio_mobile,
        heightWidthRatioTablet: picture.height_width_ratio_tablet,
        overlayPercentage,
        width: props.width,
        widthPhoneMax,
        widthTabletMax,
      })}
      {...styleProps}
    >
      {/* show this is the blurry tiny image - while waiting for the full size image to load */}
      {!!picture.src_preview && (
        <picture className="tinyPreview">
          {!!picture.src_preview && (
            <source
              media={`(min-width:${widthTabletMax + 1}px)`}
              srcSet={picture.src_preview}
            />
          )}
          {!!picture.src_preview_tablet && (
            <source
              media={`(min-width:${widthPhoneMax + 1}px)`}
              srcSet={picture.src_preview_tablet}
            />
          )}
          <img
            src={
              picture.src_preview_mobile ||
              picture.src_preview_tablet ||
              picture.src_preview
            }
            width={19}
            {...imageProps}
          />
        </picture>
      )}
      {/* show full size image - while waiting for the video to load */}
      <picture>
        {/* desktop */}
        {!!picture.src_webp_desktop && picture.type !== 'image/svg' && (
          <source
            media={`(min-width:${widthTabletMax + 1}px)`}
            srcSet={picture.src_webp_desktop}
            type="image/webp"
          />
        )}
        {!!picture.src_desktop && (
          <source
            media={`(min-width:${widthTabletMax + 1}px)`}
            srcSet={picture.src_desktop}
          />
        )}
        {/* tablet */}
        {!!picture.src_webp_tablet && picture.type !== 'image/svg' && (
          <source
            media={`(min-width:${widthPhoneMax + 1}px)`}
            srcSet={picture.src_webp_tablet}
            type="image/webp"
          />
        )}
        {!!picture.src_tablet && (
          <source
            media={`(min-width:${widthPhoneMax + 1}px)`}
            srcSet={picture.src_tablet}
          />
        )}
        {/* mobile */}
        {!!picture.src_webp_mobile && picture.type_mobile !== 'image/svg' && (
          <source srcSet={picture.src_webp_mobile} type="image/webp" />
        )}
        <img
          loading={!notLazy ? 'lazy' : undefined}
          src={picture.src_mobile || picture.src_tablet || picture.src}
          width={widthPhoneMax || widthTabletMax || props.width}
          {...imageProps}
        />
      </picture>
      {/* video element observer (is intersecting?) */}
      {!!videoSrc && <div css={styles.videoCenterRef} ref={videoCenterRef} />}
      {/* show the video - after images have loaded */}
      {!qaStatic && !!videoSrc && (
        <video
          autoPlay={false}
          loop={true}
          muted={true}
          playsInline={true}
          preload="auto"
          ref={videoRef}
          src={videoSrc}
          {...videoProps}
        />
      )}
    </Box>
  );
};

export default Multimedia;
