# frozen_string_literal: true

class CreateReturnedBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :returned_books, id: :uuid do |t|
      t.references :checked_out_book, null: false, foreign_key: true, index: { unique: true }, type: :uuid
      t.datetime :created_at, null: false
    end
  end
end
