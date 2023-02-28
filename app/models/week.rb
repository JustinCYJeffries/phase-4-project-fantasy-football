class Week < ApplicationRecord
    has_many :player_weeks
    has_many :players, through: :player_weeks
  end