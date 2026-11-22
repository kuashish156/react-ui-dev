export type CollectionType =
  | "INSTRUCTOR_COLLECTION"
  | "CONTRIBUTED_COLLECTION"
  | "ASSIGNMENT_COLLECTION"
  | "PEER_REVIEW_COLLECTION";

export type GalleryFocus = "ALL" | "AUDIO" | "VIDEO" | "IMAGE";
export type GalleryView = "GRID" | "LIST";
export type CaptionPosition = "Bottom" | "Top";

export interface MediaCollectionRequest {
  collectionName: string;
  description: string;
  displayDescription: boolean;
  collectionType: CollectionType;
  tags: string;
  maxSizePerItem: number;
  maxItemsPerGallery: number;
  maxGalleriesPerUser: number;
  thumbnailsPerPage: number;
  thumbnailsPerRow: number;
  displayFullCaption: boolean;
  captionPosition: CaptionPosition;
  galleryFocus: GalleryFocus;
  galleryView: GalleryView;
  gridColumns: number;
  gridRows: number;
  enforceGalleryDefaults: boolean;
  visibleToInstructorsOnly: boolean;
  visibleToInstructorsAfter: number;
  readOnlyFrom: string | null;
  readOnlyTo: string | null;
  allowComments: boolean;
  allowLikes: boolean;
  isGraded: boolean;
}
