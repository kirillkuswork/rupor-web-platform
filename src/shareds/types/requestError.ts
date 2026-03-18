export type TErrorCodes =
 'data.invalid'
 | 'query.invalid'
 | 'header.invalid'
 | 'token.invalid'
 | 'token.not_allowed_type'
 | 'token.has_blocked'
 | 'token.expired'
 | 'token.unvalidated'
 | 'token.blocked'
 | 'token.missed_or_malformed'
 | 'auth.unauthorized'
 | 'channels.title-exists'
 | 'video.not_found'
 | 'video.deleted'
 | 'video.id_invalid'
 | 'error.playlist_deleted'
 | 'playlists.deleted'
 | 'channels.deleted'
 | 'channel.not_found'
 | 'video.not_published';

export interface IRequestErrors {
  message: string;
  errors: {
    code: TErrorCodes;
    message: string;
  }[]
}
