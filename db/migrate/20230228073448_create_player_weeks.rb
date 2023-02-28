class CreatePlayerWeeks < ActiveRecord::Migration[6.1]
  def change
    create_table :player_weeks do |t|
      t.integer :receiving_yards
      t.integer :receiving_td
      t.integer :receptions
      t.integer :rushing_yards
      t.integer :rushing_td
      t.integer :passing_yards
      t.integer :passing_td
      t.integer :passing_interceptions
      t.integer :two_pt_conversion
      
      
      
      t.belongs_to :player, null: false, foreign_key: true
      t.belongs_to :week, null: false, foreign_key: true

      t.timestamps
    end
  end
end
