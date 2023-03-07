class AddPlayerApiKeyToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :player_api_key, :string
  end
end
