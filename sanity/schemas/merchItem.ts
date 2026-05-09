import { defineField, defineType } from 'sanity'

export const merchItem = defineType({
  name: 'merchItem',
  title: 'Merch Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'squareUrl',
      title: 'Square Product URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle off to hide sold-out items',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
      media: 'image',
      available: 'isAvailable',
    },
    prepare({ title, media, available }) {
      return {
        title,
        subtitle: available ? 'Available' : 'Sold Out',
        media,
      }
    },
  },
})
