# frozen_string_literal: true

class CreateCheckedOutBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :checked_out_books, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :book, null: false, foreign_key: true, type: :uuid
      t.datetime :created_at, null: false
    end
    add_index :checked_out_books, %i[user_id book_id], unique: true
  end
end
