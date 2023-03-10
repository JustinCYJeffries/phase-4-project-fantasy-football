# Fantasy Football Team Builder
The Fantasy Football Team Builder allows users to set their own individual logins and then Create their own Fantasy Football teams. Once their team is created they can then add players by selecting the add player button. The player list is searchable and filterable by position. Once a player is found they can be added to the team by selecting the add to team button. Users can then manage their team by labeling a player as a starter or removing them from the team. Also available is the create player form, which allows users to create their own custom player which will then appear on the player list.

## Installation
Once this repo is cloned and the appropriate dependencies installed you can then seed the database. In order for the front end to work properly, your backend server must be run on port: 3000. You can run the server by using the rails s command in your terminal in the directory where this project was cloned. In order to run the front end you can use this command in a separate terminal:
```bash
$ npm start --prefix client
```

## Usage
There are two seeded logins created when the database is seeded:
user1 password:password
user2 password:password
Once the User is logged in they will then be able to manipulate the screen and create edit and delete teams as well as add, remove, create, and note as starters for players.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Acknowledgements
This app utilizes the faker ruby gem in order to create dummy data.
https://github.com/faker-ruby/faker

This app uses information gathered from SportsDataio.
https://sportsdata.io/
