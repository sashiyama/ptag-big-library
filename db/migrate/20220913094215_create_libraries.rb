# frozen_string_literal: true

class CreateLibraries < ActiveRecord::Migration[7.0]
  def change
    create_table :libraries,id: :uuid do |t|
      t.string :branch_name, null: false, index: true
      t.string :address, null: false
      t.string :phone_number, null: false

      t.timestamps
    end
  end
end
