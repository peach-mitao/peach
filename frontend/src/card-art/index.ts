/* 卡片图片、人脸取景与悬停预览（`@peach/card-art`）。
 *
 * 壳（`web/app.js`）从 `peach-ui.js` 取，React 岛按 `@peach/card-art` 写，React 包构建时把它
 * 改写成 `/dist/peach-ui.js`：代表作表、悬停配置和挂在 document 上的那组监听都只有一份。
 * 壳退场那天，这个目录整体并进 React 包。 */
export { faceFrame, faceZoom, hasFaceBox, FACE_CEILING, FACE_TARGET, MIN_FACE_PX } from './face-frame';
export type { FaceBox, FrameSize } from './face-frame';
export { advanceImageFallback, imageFallbackAttrs, parseFallbacks, wireImageFallbacks } from './image-fallback';
export { faceSourceScale, nativeImageFit } from './native-image';
export { rememberRepresentatives, representativeOf } from './representatives';
export type { RepresentativeRow } from './representatives';
export {
  avatarInner, cardArtwork, cardIdentity, coverImage, coverUrl, detailPosterUrl, entityAvatar, entityFaceImg,
  faceBoxAttrs, faceOrigin, facePos, javArtwork, logoUrl, mixFace, mixLabel, performerLabel, queueAvatarHtml,
  queueThumbHtml, withVersion,
} from './markup';
export type { Artwork, ArtworkKind, CoverItem, FaceFocus, FaceRef, IdentityItem } from './markup';
export {
  avatarFrame, coverAnchor, coverBackdrop, coverFace, coverRatio, fitNativeImage, frameCachedImages, installCardArt,
  posterPanel, refitNativeImages, relayoutCovers, settleImage, upgradeCover, watchPendingImages,
} from './framing';
export { configureHoverPreview, releaseHover, releaseHoverPreviews, setHoverState, wireHover } from './hover';
export type { HoverItem, HoverPreviewConfig } from './hover';
