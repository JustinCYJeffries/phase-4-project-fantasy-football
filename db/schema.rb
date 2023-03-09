# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_03_09_114218) do

  create_table "player_teams", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "team_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id", "team_id"], name: "index_player_teams_on_player_id_and_team_id", unique: true
    t.index ["player_id"], name: "index_player_teams_on_player_id"
    t.index ["team_id"], name: "index_player_teams_on_team_id"
  end

  create_table "player_weeks", force: :cascade do |t|
    t.integer "receiving_yards"
    t.integer "receiving_td"
    t.integer "receptions"
    t.integer "rushing_yards"
    t.integer "rushing_td"
    t.integer "passing_yards"
    t.integer "passing_td"
    t.integer "passing_interceptions"
    t.integer "two_pt_conversion"
    t.integer "player_id", null: false
    t.integer "week_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_player_weeks_on_player_id"
    t.index ["week_id"], name: "index_player_weeks_on_week_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.string "nflteam"
    t.string "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "player_api_key"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_teams_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "weeks", force: :cascade do |t|
    t.integer "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "player_teams", "players"
  add_foreign_key "player_teams", "teams"
  add_foreign_key "player_weeks", "players"
  add_foreign_key "player_weeks", "weeks"
  add_foreign_key "teams", "users"
end
