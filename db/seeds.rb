require 'net/http'
require 'json'

uri = URI('https://api.sportsdata.io/v3/nfl/scores/json/Players?key=f96ee404946b4896b5691149c6e8e1bc')
response = Net::HTTP.get(uri)
players = JSON.parse(response)

players.each do |player|
  new_player = Player.new(
    name: player['Name'],
    position: player['Position'],
    nflteam: player['Team'],
    player_api_key: player['PlayerID']
  )
  new_player.save
end

