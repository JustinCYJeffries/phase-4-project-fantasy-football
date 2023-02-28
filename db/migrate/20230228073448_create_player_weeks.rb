class CreatePlayerWeeks < ActiveRecord::Migration[6.1]
  def change
    create_table :player_weeks do |t|
      t.integer :yards
      t.integer :touchdowns
      t.integer :interceptions
      t.belongs_to :player, null: false, foreign_key: true
      t.belongs_to :week, null: false, foreign_key: true

      t.timestamps
    end
  end
end
