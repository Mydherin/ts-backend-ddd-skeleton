# TODO

- Improve file aggrupation (add new folder, move files and refractor)
- Deny user created if exists
- Looking for a better patter to close all sockets (mongo, http, etc..) where the responsability belongs to the app.close rather than on tests. Also, search about environment pattern and think if it is a proper way to handle that activity. Close all open connections, it should be agnostic to any technologies