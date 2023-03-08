#require 'net/http'
#require 'json'

#uri = URI('https://api.sportsdata.io/v3/nfl/scores/json/Players?key=f96ee404946b4896b5691149c6e8e1bc')
#response = Net::HTTP.get(uri)
#players = JSON.parse(response)

#players.each do |player|
 # new_player = Player.new(
  #  name: player['Name'],
   # position: player['Position'],
    #nflteam: player['Team'],
    #player_api_key: player['PlayerID']
  #)
  #new_player.save
#end



# Create an array of skilled positions
SKILLED_POSITIONS = %w[QB RB WR TE]

# Create an array of NFL teams
NFL_TEAMS = %w[ARI ATL BAL BUF CAR CHI CIN CLE DAL DEN DET GB HOU IND JAX KC LAC LAR LV MIA MIN NE NO NYG NYJ PHI PIT SEA SF TB TEN WAS]

# Define a method to generate a random string of letters
def random_string(length)
  chars = ('a'..'z').to_a
  Array.new(length) { chars.sample }.join
end

# Create 100 players at skilled positions
100.times do
  name = Faker::Name.name
  nflteam = NFL_TEAMS.sample
  position = SKILLED_POSITIONS.sample
  player_api_key = random_string(16)
  Player.create(name: name, nflteam: nflteam, position: position, player_api_key: player_api_key)
end

10.times do 
  name = Faker::Name.name
  Team.create(name: name, user_id: User.first.id)
end

Team.all.each do |team|
  15.times do
    player = Player.all.sample
    PlayerTeam.create(team_id: team.id, player_id: player.id)
  end
end