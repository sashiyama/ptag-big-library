# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReturnBookForm do
  describe '#return!' do
    let(:checked_out_book) { create(:checked_out_book) }
    let(:form) { described_class.new(checked_out_book.user, checked_out_book.book_id) }

    specify do
      expect(checked_out_book.book.num_of_books_on_loan).to eq 1

      form.return!

      expect(checked_out_book.book.num_of_books_on_loan).to eq 0
    end
  end
end
