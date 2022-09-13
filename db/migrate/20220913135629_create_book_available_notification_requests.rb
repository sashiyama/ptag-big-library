# frozen_string_literal: true

class CreateBookAvailableNotificationRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :book_available_notification_requests, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :book, null: false, foreign_key: true, type: :uuid
      t.datetime :created_at, null: false
    end
  end
end
