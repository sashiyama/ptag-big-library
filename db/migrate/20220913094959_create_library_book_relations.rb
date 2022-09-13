# frozen_string_literal: true

class CreateLibraryBookRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :library_book_relations, id: :uuid do |t|
      t.references :library, null: false, foreign_key: true, type: :uuid
      t.references :book, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
    add_index  :library_book_relations, %i[library_id book_id], unique: true
  end
end
