class Player < ApplicationRecord
  has_many :player_teams
  has_many :teams, through: :player_teams 
  validates :position, presence: true
  validates :nflteam, presence: true
  validates :name, presence: true
end
