/* Card images, face framing, and hover preview (@peach/card-art).
 * The Application and React pages reference the same source, shipped with peach-app.js.
 * The representative-works table, hover configuration, and document listeners are singletons app-wide. */
export { faceFrame, faceZoom, hasFaceBox, FACE_CEILING, FACE_TARGET, MIN_FACE_PX } from './face-frame';
export type { FaceBox, FrameSize } from './face-frame';
export { advanceImageFallback, imageFallbackAttrs, parseFallbacks, wireImageFallbacks } from './image-fallback';
export { faceSourceScale, nativeImageFit } from './native-image';
export { rememberRepresentatives, representativeOf } from './representatives';
export type { RepresentativeRow } from './representatives';
export {
  avatarInner, cardArtwork, cardIdentity, coverImage, coverUrl, detailPosterUrl, entityAvatar, entityFaceImg,
  faceBoxAttrs, faceOrigin, facePos, frameArtwork, javArtwork, logoUrl, mixFace, mixLabel, performerLabel,
  queueAvatarHtml, queueThumbHtml, remoteCoverUrl, withVersion,
} from './markup';
export type { Artwork, ArtworkKind, CoverItem, FaceFocus, FaceRef, IdentityItem } from './markup';
export {
  avatarFrame, coverAnchor, coverFace, coverRatio, fitNativeImage, frameCachedImages, installCardArt,
  posterPanel, refitNativeImages, relayoutCovers, settleImage, upgradeCover, watchPendingImages,
} from './framing';
export { COVER_STATE_TITLE, coverFetchingHtml, coverStateAction, coverStateHtml } from './cover-state';
export type { CoverState, CoverStateItem } from './cover-state';
export { configureHoverPreview, releaseHover, releaseHoverPreviews, setHoverState, wireHover } from './hover';
export type { HoverItem, HoverPreviewConfig } from './hover';
