export type pictureSizeProps = (
  | { height: number; heightWidthRatio: number; width?: undefined }
  | { height?: undefined; heightWidthRatio: number; width: number }
  | { height: number; heightWidthRatio?: undefined; width: number }
) & {
  heightDesktop?: number;
  heightMobile?: number;
  heightTablet?: number;
  heightWidthRatioDesktop?: number;
  heightWidthRatioMobile?: number;
  heightWidthRatioTablet?: number;
  widthDesktop?: number;
  widthMobile?: number;
  widthTablet?: number;
}

/**
 * Input arguments (usually ok to just forward React component props)
 */
export type input = pictureSizeProps & {
  crop?: boolean;
  src: string;
  srcDesktop?: string;
  srcMobile?: string;
  srcTablet?: string; 
};

/**
 * Calculates/Interpolates values from input props. 
 * Naming convention is different to remember that this is generated props.
 */
export type output = {
  ext: string;
  ext_desktop: string;
  ext_mobile: string;
  ext_tablet: string;
  height: number;
  height_desktop: number;
  height_mobile: number;
  height_tablet: number;
  height_width_ratio: number;
  height_width_ratio_desktop: number;
  height_width_ratio_mobile: number;
  height_width_ratio_tablet: number;
  src: string;
  src_desktop: string;
  src_mobile: string;
  src_preview: string;
  src_preview_desktop: string;
  src_preview_mobile: string;
  src_preview_tablet: string;
  src_tablet: string;
  src_webp: string;
  src_webp_desktop: string;
  src_webp_mobile: string;
  src_webp_tablet: string;
  type: string;
  type_desktop: string;
  type_mobile: string;
  type_tablet: string;
  width_desktop: number;
  width_mobile: number;
  width_tablet: number;
  width: number;
};