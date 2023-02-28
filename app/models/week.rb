class PlayerWeek < ApplicationRecord
    belongs_to :player
    belongs_to :week
  end