export type ErrorCode400 = (
  | 'data.invalid'
  | 'query.invalid'
  | 'header.invalid'
  | 'video.id_invalid'
);

export type ErrorCode401 = (
  | 'token.invalid'
  | 'token.has_blocked'
  | 'token.expired'
  | 'token.unvalidated'
  | 'token.blocked'
  | 'token.missed_or_malformed'
  | 'auth.unauthorized'
);

export type ErrorCode500 = 'error.playlist_deleted' | 'error.channel_deleted';

export type ErrorCode404 = (
  | 'channels.title-exists'
  | 'video.deleted'
  | 'video.not_found'
  | 'playlists.deleted'
  | 'channels.deleted'
  | 'video.not_published'
  | 'channel.not_found'
);

export type ErrorCode403 = 'token.not_allowed_type';

export const httpErrors:
Record<string, ErrorCode400 | ErrorCode401 | ErrorCode500 | ErrorCode404 | ErrorCode403> = {
  dataInvalid: 'data.invalid',
  queryInvalid: 'query.invalid',
  headerInvalid: 'header.invalid',
  tokenInvalid: 'token.invalid',
  tokenNotAllowedType: 'token.not_allowed_type',
  tokenHasBlocked: 'token.has_blocked',
  tokenExpired: 'token.expired',
  tokenUnvalidated: 'token.unvalidated',
  tokenBlocked: 'token.blocked',
  tokenMissedOrMalformed: 'token.missed_or_malformed',
  authUnauthorized: 'auth.unauthorized',
  channelAlreadyExists: 'channels.title-exists',
  videosNotFound: 'video.not_found',
  videosDeleted: 'video.deleted',
  videosIdInvalid: 'video.id_invalid',
  errorPlaylistDeleted: 'error.playlist_deleted',
  playlistsDeleted: 'playlists.deleted',
  errorChannelDeleted: 'channels.deleted',
  errorChannelNotFound: 'channel.not_found',
  videosNotPublished: 'video.not_published',
};

export type HttpError = {
  code: ErrorCode400 | ErrorCode401 | ErrorCode500;
  message: string;
};
