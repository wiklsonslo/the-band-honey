import { defineField, defineType } from 'sanity'

export const track = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'release',
      title: 'Release',
      type: 'reference',
      to: [{ type: 'release' }],
    }),
    defineField({
      name: 'spotifyEmbedUrl',
      title: 'Spotify Embed URL',
      type: 'url',
      description: 'e.g. https://open.spotify.com/embed/track/TRACK_ID',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      release: 'release.title',
    },
    prepare({ title, release }) {
      return { title, subtitle: release ?? 'No release' }
    },
  },
})
