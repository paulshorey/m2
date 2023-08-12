import { css } from '@emotion/react';
const styles = {
  videoCenterRef: css`
    display: block;
    position: absolute;
    top: 40%;
    left: 0;
    width: 0;
    height: 20%;
    opacity: 0;
  `,
  wrapper: ({
    heightWidthRatio,
    heightWidthRatioMobile,
    heightWidthRatioTablet,
    width,
    widthPhoneMax,
    widthTabletMax,
    overlayPercentage,
  }) => css`
    position: relative;
    display: inline-block;
    text-align: center;
    box-sizing: content-box;
    max-width: 100%;
    overflow: hidden;
    width: ${width ? width + 'px' : undefined};

    ${overlayPercentage >= 0 &&
    overlayPercentage <= 1 &&
    `
    &::after {
      content: '';
      background: rgba(0, 0, 0, ${overlayPercentage});
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    `}

    &::before {
      /* show transparent of correct aspect ratio while waiting for image to load (prevent CLS) */
      content: '';
      display: block;
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: ${heightWidthRatio * 100 + '%'};
      ${!!widthTabletMax &&
      !!heightWidthRatioTablet &&
      `
        @media (max-width:${widthTabletMax}px) {
          padding-bottom: ${heightWidthRatioTablet * 100 + '%'};
        }
      `}
      ${!!widthPhoneMax &&
      !!heightWidthRatioMobile &&
      `
        @media (max-width:${widthPhoneMax}px) {
          padding-bottom: ${heightWidthRatioMobile * 100 + '%'};
        }
      `}
    }

    picture {
      position: absolute;
      z-index: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      max-width: 100vw;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
      &.tinyPreview {
        img {
          width: 110%;
          max-width: 110%;
        }
      }
    }

    video {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
};
export default styles;
