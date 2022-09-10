# frozen_string_literal: true

class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books, id: :uuid do |t|
      t.string :title, null: false
      t.string :author
      t.string :genre, null: false
      t.string :subgenre, null: false
      t.integer :pages, null: false
      t.string :publisher
      t.integer :copies, null: false

      t.timestamps
    end
  end
end
