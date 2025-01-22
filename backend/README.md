## SETUP BACKEND
- After cloning main repo, go to backend `cd backend`
- Install dependencies `npm install`
- Make sure postgres is installed and running `sudo systemctl status postgresql.service`
- Create a new user named `wisflux` with password `wisflux` and give it superuser privileges `sudo -u postgres createuser wisflux -s`
- Create a database `createdb database_development`
- run `npm run dev` to start the development/local server

