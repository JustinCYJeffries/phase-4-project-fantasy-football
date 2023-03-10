class RemovePlayerWeeks < ActiveRecord::Migration[6.1]
  def change
    drop_table :player_weeks
  end
end
