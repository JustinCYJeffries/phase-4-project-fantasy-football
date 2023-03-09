class AddUniqueIndexToPlayerTeam < ActiveRecord::Migration[6.1]
  def change
    add_index :player_teams, [:player_id, :team_id], unique: true
  end
end
