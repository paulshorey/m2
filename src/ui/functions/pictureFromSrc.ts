import { input, output } from './pictureFromSrc.d';

export const subtractPictureProps = function (
  props: input
): Record<string, any> {
  // @ts-ignore // tsFixMe
  const {
    crop,
    height,
    width,
    heightDesktop,
    heightMobile,
    heightTablet,
    heightWidthRatio,
    heightWidthRatioDesktop,
    heightWidthRatioMobile,
    heightWidthRatioTablet,
    src,
    srcDesktop,
    srcMobile,
    srcTablet,
    widthDesktop,
    widthMobile,
    widthTablet,
    ...rest
  } = props;
  return rest;
};
/**
 * Generate <picture> tag attributes from src string
 *
 * Required: props.src and props.heightWidthRatio
 * Default: 600px width, width*heightWidthRatio height
 * Desktop/Tablet/Mobile variants of each props/width/height are optional - will override the default value.
 *
 * So, you can start with a default image/size. Then, add a variant for desktop/tablet/mobile, or adjust the size.
 *
 * You can do "mobile-first" responsive design by specifying mobile values for props.src and props.heightWidthRatio,
 * then add desktop and tablet variants if needed.
 *
 * @returns {object} - Optimized src for desktop/tablet/mobile, width, height, heightWidthRatio, type, ext, etc.
 */
export default function (props: input): output {
  const { crop, height, width } = props;
  let {
    heightDesktop,
    heightMobile,
    heightTablet,
    heightWidthRatio,
    heightWidthRatioDesktop,
    heightWidthRatioMobile,
    heightWidthRatioTablet,
    src,
    srcDesktop,
    srcMobile,
    srcTablet,
    widthDesktop,
    widthMobile,
    widthTablet,
  } = props;
  /*
   * Src
   */
  if (!src) {
    throw new Error('props.src is required');
  }
  srcDesktop = srcDesktop || src;
  srcTablet = srcTablet || src;
  srcMobile = srcMobile || src;
  /*
   * Ratio
   */
  if (!heightWidthRatio) {
    heightWidthRatio = height && width ? height / width : 1;
  }
  heightWidthRatioDesktop =
    heightWidthRatioDesktop ||
    heightWidthRatio ||
    (heightDesktop && widthDesktop
      ? heightDesktop / widthDesktop
      : heightWidthRatio);
  heightWidthRatioTablet =
    heightWidthRatioTablet ||
    heightWidthRatio ||
    (heightTablet && widthTablet
      ? heightTablet / widthTablet
      : heightWidthRatio);
  heightWidthRatioMobile =
    heightWidthRatioMobile ||
    heightWidthRatio ||
    (heightMobile && widthMobile
      ? heightMobile / widthMobile
      : heightWidthRatio);

  /*
   * Interpolate Height/Width
   * Need 2 out of 3 props: width/height/heightWidthRatio
   */
  let transformDesktop = '';
  if (widthDesktop && heightDesktop) {
    transformDesktop = 'w_h_';
  } else if (!widthDesktop && !heightDesktop) {
    if (width) {
      transformDesktop = 'w_';
      widthDesktop = width;
      heightDesktop = Math.round(widthDesktop * heightWidthRatioDesktop);
    } else if (height) {
      transformDesktop = 'h_';
      heightDesktop = height;
      widthDesktop = Math.round(heightDesktop / heightWidthRatioDesktop);
    }
  } else if (!heightDesktop && widthDesktop) {
    transformDesktop = 'w_';
    heightDesktop = Math.round(widthDesktop * heightWidthRatioDesktop);
  } else if (heightDesktop) {
    transformDesktop = 'h_';
    widthDesktop = Math.round(heightDesktop / heightWidthRatioDesktop);
  }
  let transformTablet = '';
  if (widthTablet && heightTablet) {
    transformTablet = 'w_h_';
  } else if (!widthTablet && !heightTablet) {
    if (width) {
      transformTablet = 'w_';
      widthTablet = width;
      heightTablet = Math.round(widthTablet * heightWidthRatioTablet);
    } else if (height) {
      transformTablet = 'h_';
      heightTablet = height;
      widthTablet = Math.round(heightTablet / heightWidthRatioTablet);
    }
  } else if (!heightTablet && widthTablet) {
    transformTablet = 'w_';
    heightTablet = Math.round(widthTablet * heightWidthRatioTablet);
  } else if (heightTablet) {
    transformTablet = 'h_';
    widthTablet = Math.round(heightTablet / heightWidthRatioTablet);
  }
  let transformMobile = '';
  if (widthMobile && heightMobile) {
    transformMobile = 'w_h_';
  } else if (!widthMobile && !heightMobile) {
    if (width) {
      transformMobile = 'w_';
      widthMobile = Math.min(width, 400);
      heightMobile = Math.round(widthMobile * heightWidthRatioMobile);
    } else if (height) {
      transformMobile = 'h_';
      heightMobile = Math.min(height, 500);
      widthMobile = Math.round(heightMobile / heightWidthRatioMobile);
    }
  } else if (!heightMobile && widthMobile) {
    transformMobile = 'w_';
    heightMobile = Math.round(widthMobile * heightWidthRatioMobile);
  } else if (heightMobile) {
    transformMobile = 'h_';
    widthMobile = Math.round(heightMobile / heightWidthRatioMobile);
  }

  // DEBUG sizes (try replacing "Desktop" with "Mobile" or "Tablet")
  // if (srcDesktop.includes('generation-desktop')) {
  //   console.log({
  //     height: [height, heightDesktop],
  //     heightStr: [height, heightDesktop].toString(),
  //     width: [width, widthDesktop],
  //     widthStr: [width, widthDesktop].toString(),
  //     srcDesktop,
  //   });
  // }
  /*
   * OUTPUT all variants, sizes, and formats, to be used later in <picture> tag.
   * Multiply all heights/widths by 2x or 3x pixel density, to account for retina displays.
   */
  const output: output = {
    ext: '',
    ext_desktop: '',
    ext_mobile: '',
    ext_tablet: '',
    height: height || 0,
    height_desktop: heightDesktop || 0,
    height_mobile: heightMobile || 0,
    height_tablet: heightTablet || 0,
    height_width_ratio: heightWidthRatio,
    height_width_ratio_desktop: heightWidthRatioDesktop,
    height_width_ratio_mobile: heightWidthRatioMobile,
    height_width_ratio_tablet: heightWidthRatioTablet,
    src,
    src_desktop: srcDesktop || '',
    src_mobile: srcMobile || '',
    src_preview: '',
    src_preview_desktop: '',
    src_preview_mobile: '',
    src_preview_tablet: '',
    src_tablet: srcTablet || '',
    src_webp: '',
    src_webp_desktop: '',
    src_webp_mobile: '',
    src_webp_tablet: '',
    type: '',
    type_desktop: '',
    type_mobile: '',
    type_tablet: '',
    width: width || 0,
    width_desktop: widthDesktop || 0,
    width_mobile: widthMobile || 0,
    width_tablet: widthTablet || 0,
  };
  /*
   * CLOUDINARY url image transformation
   */
  // c_mode
  const c_mode = crop ? 'c_fill,g_auto' : 'c_pad';
  // options
  const optimizeSrc =
    src.includes('cloudinary.com') &&
    !src.match(/[,/]+w_[\d]+/) &&
    !src.match(/[,/]+h_[\d]+/);
  const optimizeSrcMobile =
    srcMobile.includes('cloudinary.com') &&
    !srcMobile.match(/[,/]+w_[\d]+/) &&
    !srcMobile.match(/[,/]+h_[\d]+/);
  const optimizeSrcTablet =
    srcTablet.includes('cloudinary.com') &&
    !srcTablet.match(/[,/]+w_[\d]+/) &&
    !srcTablet.match(/[,/]+h_[\d]+/);
  const optimizeSrcDesktop =
    srcDesktop.includes('cloudinary.com') &&
    !srcDesktop.match(/[,/]+w_[\d]+/) &&
    !srcDesktop.match(/[,/]+h_[\d]+/);

  //
  // Full size original
  //
  if (optimizeSrc) {
    src = src.replace(/\.svg$/, '.png');
    src = src.replace('http://', 'https://');
    src = src.replace(/v[0-9]{9,}/, '');
  }
  const srcClean = src.replace(/\/[a-z]_[^/]+/, '') || src;
  const srcReplace = src.includes('/image/upload/')
    ? 'image/upload/'
    : '/images/';
  const srcRe = new RegExp(`${srcReplace}`);
  // Webp
  const { ext = 'png', rext, type = 'image/png' }: meta = srcMeta(srcClean);
  output.ext = ext;
  output.type = type;
  if (rext) {
    output.src_webp_mobile = srcClean.replace(rext, '.webp');
  }
  // Preview
  // The tiny blurry image that may load initially while waiting for full size image to download
  const widthPreview = 19;
  const heightPreview = Math.round(19 * heightWidthRatio);
  output.src_preview = srcClean.replace(
    srcRe,
    `${srcReplace}w_${widthPreview},h_${heightPreview},${c_mode}/`
  );

  //
  // Mobile
  //
  let srcCleanMobile = srcMobile;
  // Resized
  if (optimizeSrcMobile) {
    srcMobile = srcMobile.replace(/\.svg$/, '.png');
    srcMobile = srcMobile.replace('http://', 'https://');
    srcMobile = srcMobile.replace(/v[0-9]{9,}/, '');
    srcCleanMobile = srcMobile.replace(/\/[a-z]_[^/]+/, '') || srcMobile;
    const srcReplaceMobile = srcMobile.includes('/image/upload/')
      ? 'image/upload/'
      : '/images/';
    const srcReMobile = new RegExp(`${srcReplaceMobile}`);
    if (widthMobile && heightMobile) {
      // Jpeg
      if (crop || transformMobile === 'w_h_') {
        // W & H
        output.src_mobile = srcCleanMobile.replace(
          srcReMobile,
          `${srcReplaceMobile}w_${Math.floor(widthMobile * 3)},h_${Math.floor(
            heightMobile * 3
          )},${c_mode}/`
        );
        // output.src_preview_mobile = srcCleanMobile.replace(
        //   srcReMobile,
        //   `${srcReplaceMobile}w_${widthPreview},h_${heightPreview},${c_mode}/`
        // );
      } else if (transformMobile === 'w_') {
        // W
        output.src_mobile = srcCleanMobile.replace(
          srcReMobile,
          `${srcReplaceMobile}w_${Math.floor(widthMobile * 3)}/`
        );
        // output.src_preview_mobile = srcCleanMobile.replace(
        //   srcReMobile,
        //   `${srcReplaceMobile}w_${widthPreview}/`
        // );
      } else if (transformMobile === 'h_') {
        // H
        output.src_mobile = srcCleanMobile.replace(
          srcReMobile,
          `${srcReplaceMobile}h_${Math.floor(heightMobile * 3)}/`
        );
        output.src_preview_mobile = srcCleanMobile.replace(
          srcReMobile,
          `${srcReplaceMobile}h_${heightPreview}/`
        );
      }
    }
  }
  // Always
  if (srcMobile) {
    // output.src_mobile = srcMobile;
    // Webp
    const { ext, rext, type }: meta = srcMeta(srcCleanMobile);
    if (rext) {
      output.ext_mobile = ext;
      output.type_mobile = type;
      output.src_webp_mobile = output.src_mobile.replace(rext, '.webp');
    }
  }

  //
  // Tablet
  //
  const srcCleanTablet = srcTablet;
  // Resized
  if (optimizeSrcTablet) {
    srcTablet = srcTablet.replace(/\.svg$/, '.png');
    srcTablet = srcTablet.replace('http://', 'https://');
    srcTablet = srcTablet.replace(/v[0-9]{9,}/, '');
    const srcCleanTablet = srcTablet.replace(/\/[a-z]_[^/]+/, '') || srcTablet;
    const srcReplaceTablet = srcTablet.includes('/image/upload/')
      ? 'image/upload/'
      : '/images/';
    const srcReTablet = new RegExp(`${srcReplaceTablet}`);
    if (widthTablet && heightTablet) {
      // Jpeg
      if (crop || transformTablet === 'w_h_') {
        // W & H
        output.src_tablet = srcCleanTablet.replace(
          srcReTablet,
          `${srcReplaceTablet}w_${Math.floor(widthTablet * 2)},h_${Math.floor(
            heightTablet * 2
          )},${c_mode}/`
        );
        output.src_preview_tablet = srcCleanTablet.replace(
          srcReTablet,
          `${srcReplaceTablet}w_${widthPreview},h_${heightPreview},${c_mode}/`
        );
      } else if (transformTablet === 'w_') {
        // W
        output.src_tablet = srcCleanTablet.replace(
          srcReTablet,
          `${srcReplaceTablet}w_${Math.floor(widthTablet * 2)}/`
        );
        output.src_preview_tablet = srcCleanTablet.replace(
          srcReTablet,
          `${srcReplaceTablet}w_${widthPreview}/`
        );
      } else if (transformTablet === 'h_') {
        // H
        output.src_tablet = srcCleanTablet.replace(
          srcReTablet,
          `${srcReplaceTablet}h_${Math.floor(heightTablet * 2)}/`
        );
        output.src_preview_tablet = srcCleanTablet.replace(
          srcReTablet,
          `${srcReplaceTablet}h_${heightPreview}/`
        );
      }
    }
  }
  // Always
  if (srcTablet) {
    // output.src_tablet = srcTablet;
    // Webp
    const { ext, rext, type }: meta = srcMeta(srcCleanTablet);
    if (rext) {
      output.ext_tablet = ext;
      output.type_tablet = type;
      output.src_webp_tablet = output.src_tablet.replace(rext, '.webp');
    }
  }

  //
  // Desktop
  //
  const srcCleanDesktop = srcDesktop;
  // Resized
  if (optimizeSrcDesktop) {
    srcDesktop = srcDesktop.replace(/\.svg$/, '.png');
    srcDesktop = srcDesktop.replace('http://', 'https://');
    srcDesktop = srcDesktop.replace(/v[0-9]{9,}/, '');
    const srcCleanDesktop =
      srcDesktop.replace(/\/[a-z]_[^/]+/, '') || srcDesktop;
    const srcReplaceDesktop = srcDesktop.includes('/image/upload/')
      ? 'image/upload/'
      : '/images/';
    const srcReDesktop = new RegExp(`${srcReplaceDesktop}`);
    if (widthDesktop && heightDesktop) {
      // Jpeg
      if (crop || transformDesktop === 'w_h_') {
        // W & H
        output.src_desktop = srcCleanDesktop.replace(
          srcReDesktop,
          `${srcReplaceDesktop}w_${Math.floor(widthDesktop * 2)},h_${Math.floor(
            heightDesktop * 2
          )},${c_mode}/`
        );
        output.src_preview_desktop = srcCleanDesktop.replace(
          srcReDesktop,
          `${srcReplaceDesktop}w_${widthPreview},h_${heightPreview},${c_mode}/`
        );
      } else if (transformDesktop === 'w_') {
        // W
        output.src_desktop = srcCleanDesktop.replace(
          srcReDesktop,
          `${srcReplaceDesktop}w_${Math.floor(widthDesktop * 2)}/`
        );
        output.src_preview_desktop = srcCleanDesktop.replace(
          srcReDesktop,
          `${srcReplaceDesktop}w_${widthPreview}/`
        );
      } else if (transformDesktop === 'h_') {
        // H
        output.src_desktop = srcCleanDesktop.replace(
          srcReDesktop,
          `${srcReplaceDesktop}h_${Math.floor(heightDesktop * 2)}/`
        );
        output.src_preview_desktop = srcCleanDesktop.replace(
          srcReDesktop,
          `${srcReplaceDesktop}h_${heightPreview}/`
        );
      }
    }
  }
  // Always
  if (srcDesktop) {
    // output.src_desktop = srcDesktop;
    // Webp
    const { ext, rext, type }: meta = srcMeta(srcCleanDesktop);
    if (rext) {
      output.ext_desktop = ext;
      output.type_desktop = type;
      output.src_webp_desktop = output.src_desktop.replace(rext, '.webp');
    }
  }
  return output;
}

type meta = {
  ext: string;
  rext: RegExp;
  type: string;
};

const srcMeta = (src: string): meta => {
  const meta = {} as meta;
  if (src.includes('.jpeg')) {
    meta.ext = '.jpeg';
    meta.type = 'image/jpeg';
  } else if (src.includes('.jpg')) {
    meta.ext = '.jpg';
    meta.type = 'image/jpeg';
  } else if (src.includes('.png')) {
    meta.ext = '.png';
    meta.type = 'image/png';
  } else if (src.includes('.gif')) {
    meta.ext = '.gif';
    meta.type = 'image/gif';
  } else if (src.includes('.webp')) {
    meta.ext = '.webp';
    meta.type = 'image/webp';
  } else if (src.includes('.tiff')) {
    meta.ext = '.tiff';
    meta.type = 'image/tiff';
  } else if (src.includes('.ico')) {
    meta.ext = '.ico';
    meta.type = 'image/ico';
  } else if (src.includes('.svg')) {
    meta.ext = '.svg';
    meta.type = 'image/svg';
  }
  if (meta.ext) {
    meta.rext = new RegExp(meta.ext, 'i'); // must be case-insensitive search!
  }
  return meta;
};
