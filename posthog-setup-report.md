<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into The Band Honey website. Here's a summary of what was set up:

**Initialization**: PostHog is initialized via `instrumentation-client.ts` using the Next.js 15.3+ pattern, with a reverse proxy configured in `next.config.ts` to route analytics traffic through `/ingest/*` for improved reliability. Exception tracking is enabled automatically.

**Client-side tracking**: Events are captured from interactive client components across the site — hero CTAs, social links, show ticket links, merch item clicks, contact form, and the demos login flow.

**Server-side tracking**: Two API routes (`/api/contact` and `/api/demos-auth`) emit server-side events using `posthog-node` via a shared `lib/posthog-server.ts` client. The contact form additionally calls `posthog.identify()` with the user's email and name on successful submission.

**New files created**:
- `instrumentation-client.ts` — client-side PostHog initialization
- `lib/posthog-server.ts` — server-side PostHog client factory
- `app/shows/ShowRow.tsx` — client component with ticket click tracking
- `app/merch/MerchItem.tsx` — client component with merch click tracking

## Events

| Event | Description | File |
|---|---|---|
| `contact_form_submitted` | User submitted the contact form successfully | `app/contact/page.tsx` |
| `contact_form_error` | Contact form submission failed with a server error | `app/contact/page.tsx` |
| `ticket_link_clicked` | User clicked a ticket purchase link for a show | `app/shows/ShowRow.tsx`, `components/home/UpcomingShows.tsx` |
| `merch_item_clicked` | User clicked on a merch item to view or purchase it on Square | `app/merch/MerchItem.tsx` |
| `demos_login_attempted` | User attempted to log in to the private demos section | `app/demos/login/page.tsx` |
| `demos_login_failed` | User entered an incorrect password for the demos section | `app/demos/login/page.tsx` |
| `social_link_clicked` | User clicked a social media link from the hero section | `components/home/Hero.tsx` |
| `hero_book_clicked` | User clicked the Book button on the hero section | `components/home/Hero.tsx` |
| `hero_shows_clicked` | User clicked the Shows button on the hero section | `components/home/Hero.tsx` |
| `all_shows_link_clicked` | User clicked 'All Shows' link from the homepage upcoming shows section | `components/home/UpcomingShows.tsx` |
| `all_music_link_clicked` | User clicked 'All Music' link from the homepage new releases section | `components/home/NewReleases.tsx` |
| `contact_email_sent` | Server successfully sent a contact form email via nodemailer | `app/api/contact/route.ts` |
| `demos_auth_success` | Server authenticated a user to access the private demos section | `app/api/demos-auth/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1565364)
- [Contact Form Submissions](/insights/0fap3KTT) — submissions vs. errors over time
- [Ticket Link Clicks](/insights/e7LGWqON) — ticket purchase interest over time
- [Social Media Engagement by Platform](/insights/vCeUQ65S) — clicks by platform (Instagram, TikTok, Spotify, YouTube, Apple Music)
- [Merch Item Clicks](/insights/z1WbRgn4) — merch purchase intent over time
- [Shows Interest to Ticket Purchase Funnel](/insights/oPYI18MF) — conversion from hero Shows button to ticket click

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
