import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'bandName',
      title: 'Band Name',
      type: 'string',
      initialValue: 'The Band Honey',
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Where contact form submissions are sent',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
      ],
    }),
    defineField({
      name: 'demosPassword',
      title: 'Demos Page Password',
      type: 'string',
      description: 'Share this with labels, managers, and press contacts to grant access to the demos page',
      validation: (rule) => rule.required().min(6),
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      placeholder: '© 2025 The Band Honey. All rights reserved.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
