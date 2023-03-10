require 'net/http'
require 'json'

uri = URI('https://api.sportsdata.io/v3/nfl/scores/json/Players?key=f96ee404946b4896b5691149c6e8e1bc')
response = Net::HTTP.get(uri)
players = JSON.parse(response)
# Create an array of skilled positions
positions = ['QB', 'RB', 'WR', 'TE']

players.each do |player|
    if positions.include?(player['Position'])
    new_player = Player.new(
    name: player['Name'],
    position: player['Position'],
    nflteam: player['Team'],
    player_api_key: player['PlayerID']
    )
    new_player.save
    end
    end





# Create an array of NFL teams
NFL_TEAMS = %w[ARI ATL BAL BUF CAR CHI CIN CLE DAL DEN DET GB HOU IND JAX KC LAC LAR LV MIA MIN NE NO NYG NYJ PHI PIT SEA SF TB TEN WAS]

# Define a method to generate a random string of letters
#def random_string(length)
 # chars = ('a'..'z').to_a
  #Array.new(length) { chars.sample }.join
#end

# Create 100 players at skilled positions
#100.times do
 # name = Faker::Name.name
  #nflteam = NFL_TEAMS.sample
  #position = SKILLED_POSITIONS.sample
  #player_api_key = random_string(16)
  #Player.create(name: name, nflteam: nflteam, position: position, player_api_key: player_api_key)
#end



# Create users
User.create(username: 'user1', password: 'password')
User.create(username: 'user2', password: 'password')

# Create teams for each user
user1 = User.find_by(username: 'user1')
user2 = User.find_by(username: 'user2')

10.times do
  Team.create(name: Faker::FunnyName.name, user_id: user1.id)
  Team.create(name: Faker::FunnyName.name, user_id: user2.id)
end

# Create players and assign them to teams
#Team.all.each do |team|
 # 15.times do
  #  player = Player.create(name: Faker::Sports::Football.player, nflteam: NFL_TEAMS.sample, position: SKILLED_POSITIONS.sample)
   # player_team = PlayerTeam.create(player_id: player.id, team_id: team.id)
  #end
#end
