import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const singletons = ['siteSettings', 'aboutPage']

export default defineConfig({
  name: 'the-band-honey',
  title: 'The Band Honey',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('About Page')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.divider(),
            S.documentTypeListItem('show').title('Shows'),
            S.documentTypeListItem('release').title('Releases'),
            S.documentTypeListItem('track').title('Tracks'),
            S.documentTypeListItem('demo').title('Demos'),
            S.divider(),
            S.documentTypeListItem('member').title('Band Members'),
            S.documentTypeListItem('merchItem').title('Merch'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletons.includes(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
