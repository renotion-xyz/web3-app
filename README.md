# Renotion web-app

The web-app handles interactions with the [Renotion Smart Contract](https://github.com/renotion-xyz/contracts).

Main features:
- Register an association between publicly shared Notion Page and a domain
- View all registrations
- View registration settings

After a page is registered it then is being served (wrapped) by [Cloudflare Worker](https://github.com/renotion-xyz/cf-worker).

It also uses [Renotion API](https://github.com/renotion-xyz/backend) to get Cloudflare + Blockchain info about page statuses.

## Deployment

The app is being deployed to [fly.io](https://fly.io).

Main deployment: [https://renotion.xyz/](https://renotion.xyz/).

### Disclaimer
I am not a react pro, so please have mercy.

I'll be happy to have your suggestion via issues 😅.