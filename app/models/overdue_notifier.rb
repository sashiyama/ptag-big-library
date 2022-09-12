# frozen_string_literal: true

class OverdueNotifier
  class << self
    def notify
      User.where.associated(:checked_out_books).distinct.find_each do |user|
        next unless user.checked_out_books.overdue.exists?

        UserMailer.overdue(user).deliver_now
      end
    end
  end
end
