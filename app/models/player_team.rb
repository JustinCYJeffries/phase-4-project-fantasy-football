class PlayerTeam < ApplicationRecord
    belongs_to :player
    belongs_to :team
    validates :player_id, presence: true
    validates :team_id, presence: true
  end