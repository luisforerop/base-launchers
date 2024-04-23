export const TABLES = {
  SOCIAL_MEDIA: 'social_media',
  USERS: 'users',
}

export const QUERIES = {
  USERS: `*, ${TABLES.SOCIAL_MEDIA}(*)`,
}
