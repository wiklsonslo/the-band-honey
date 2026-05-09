import { defineField, defineType } from 'sanity'

export const show = defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  fields: [
    defineField({
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket Link',
      type: 'url',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date (Upcoming First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'venue',
      subtitle: 'date',
      city: 'city',
    },
    prepare({ title, subtitle, city }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : 'No date'
      return { title: `${title} — ${city}`, subtitle: date }
    },
  },
})
