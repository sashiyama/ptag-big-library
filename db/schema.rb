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

ActiveRecord::Schema[7.0].define(version: 2022_09_12_211935) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.string "author"
    t.string "genre", null: false
    t.string "subgenre", null: false
    t.integer "pages", null: false
    t.string "publisher"
    t.integer "copies", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author"], name: "index_books_on_author"
    t.index ["genre"], name: "index_books_on_genre"
    t.index ["subgenre"], name: "index_books_on_subgenre"
    t.index ["title"], name: "index_books_on_title"
  end

  create_table "checked_out_books", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "book_id", null: false
    t.datetime "created_at", null: false
    t.index ["book_id"], name: "index_checked_out_books_on_book_id"
    t.index ["user_id"], name: "index_checked_out_books_on_user_id"
  end

  create_table "librarians", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_librarians_on_email", unique: true
  end

  create_table "returned_books", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "checked_out_book_id", null: false
    t.datetime "created_at", null: false
    t.index ["checked_out_book_id"], name: "index_returned_books_on_checked_out_book_id", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "checked_out_books", "books"
  add_foreign_key "checked_out_books", "users"
  add_foreign_key "returned_books", "checked_out_books"
end
