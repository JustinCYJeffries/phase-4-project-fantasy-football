class AddStarterToPlayerTeams < ActiveRecord::Migration[6.1]
  def change
    add_column :player_teams, :starter, :boolean
  end
end
