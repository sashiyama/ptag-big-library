# frozen_string_literal: true

class BookAvailableNotificationRequest < ApplicationRecord
  belongs_to :user
  belongs_to :book
end
