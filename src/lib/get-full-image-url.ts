export type TDomain = string;
export type TPath = string;

export type TFullImageUrl = `${TDomain}/${TPath}`;

export const getFullImageUrl = (path: TPath): TFullImageUrl => {
  return `${process.env.CLOUDFRONT_URL}/${path}`;
};
