/*
 * Similar to NextJS's Image component, but using Cloudinary instead of Vercel for resizing.
 */
import Box, {  BoxProps }  from '@mui/material/Box';
import pictureFromSrc, {
  subtractPictureProps,
} from '@techytools/uui/functions/pictureFromSrc';
import type { input as pictureFromSrcProps } from '@techytools/uui/functions/pictureFromSrc.d';

const styleWH = (pictureProps: any) => ({
  height: pictureProps.height ? '100%' : 'auto',
  width: pictureProps.width ? '100%' : 'auto',
});

// type Modify<T, R> = Omit<T, keyof R> & R;
export type Props = pictureFromSrcProps & {
  alt?: string;
  breakpointDesktopMinWidth?: number;
  breakpointTabletMinWidth?: number;
  className?: string;
  notLazy?: boolean;
  preview?: boolean;
  sx?: BoxProps['sx'];
};
/**
 * REQUIRES EXACTLY 2 OUT OF 3: height, width, heightWidthRatio
 * ```
 * <Picture
 *    src="some/default/image.jpg"
 *    heightWidthRatio={2/3}
 *    width={300}
 * />
 * ```
 * OPTIONAL: heightMobile, heightTablet, widthMobile, widthTablet, heightWidthRatioMobile, heightWidthRatioTablet
 *
 * Read about required height/width/heightWidthRatio props in src/helpers/pictureFromSrc.d.ts
 * To use this component, you must pass exactly 2 out of 3 of height/width/heightWidthRatio.
 * This accepts all Box props, except props.height and props.width must use numbers. FYI they
 * do accept a media query array or object of breakpoints, as long as values are all number!
 */
const Picture = ({
  alt,
  breakpointDesktopMinWidth = 1025,
  breakpointTabletMinWidth = 501,
  className = '',
  notLazy,
  preview,
  sx,
  ...pictureProps
}: Props) => {
  // required props of this component == required props of pictureFromSrc
  const picture = pictureFromSrc(pictureProps);
  if (!picture) {
    return null;
  }

  return (
    <Box
      className={className}
      sx={{
        label: 'PictureV2',
        mx: 'auto',
        position: 'relative',
        ...sx,
      }}
    >
      {!!preview && (
        <Box 
          component="picture"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            ...styleWH(pictureProps),
          }}
        >
          {/* desktop */}
          {!!(picture.src_preview_desktop && breakpointDesktopMinWidth) && (
            <source
              media={`(min-width:${breakpointDesktopMinWidth}px)`}
              srcSet={picture.src_preview_desktop}
            />
          )}
          {/* tablet */}
          {!!(picture.src_preview_tablet && breakpointTabletMinWidth) && (
            <source
              media={`(min-width:${breakpointTabletMinWidth}px)`}
              srcSet={picture.src_preview_tablet}
            />
          )}
          {/* mobile is default */}
          <Box
            alt={alt}
            component="img"
            src={picture.src_preview_mobile || picture.src_preview}
            sx={{ ...styleWH(pictureProps) }}
          />
        </Box>
      )}
      <Box
        component="picture"
        sx={{
          ...styleWH(pictureProps),
        }}
      >
        {/* desktop */}
        {!!(picture.src_desktop && breakpointDesktopMinWidth) && (
          <source
            media={`(min-width:${breakpointDesktopMinWidth}px)`}
            srcSet={picture.src_desktop}
          />
        )}
        {!!(
          picture.src_webp &&
          breakpointDesktopMinWidth &&
          picture.type !== 'image/svg'
        ) && (
          <source
            media={`(min-width:${breakpointDesktopMinWidth}px)`}
            srcSet={picture.src_webp}
            type="image/webp"
          />
        )}
        {/* tablet */}
        {!!(picture.src_tablet && breakpointTabletMinWidth) && (
          <source
            media={`(min-width:${breakpointTabletMinWidth}px)`}
            srcSet={picture.src_tablet}
          />
        )}
        {!!(
          picture.src_webp_tablet &&
          breakpointTabletMinWidth &&
          picture.type !== 'image/svg'
        ) && (
          <source
            media={`(min-width:${breakpointTabletMinWidth}px)`}
            srcSet={picture.src_webp_tablet}
            type="image/webp"
          />
        )}
        {/* mobile is default */}
        {!!(picture.src_webp_mobile && picture.type !== 'image/svg') && (
          <source srcSet={picture.src_webp_mobile} type="image/webp" />
        )}
        <Box
          alt={alt}
          component="img"
          loading={!notLazy ? 'lazy' : undefined}
          src={picture.src_mobile}
          sx={{ ...styleWH(pictureProps) }}
        />
      </Box>
    </Box>
  );
};

export default Picture;
