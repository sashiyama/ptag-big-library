# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OverdueNotifier do
  describe '.notify' do
    context 'when there is NOT a overdue book' do
      before do
        create(:checked_out_book)
      end

      specify do
        expect { OverdueNotifier.notify }.not_to change { ActionMailer::Base.deliveries.count }
      end
    end

    context 'when there is a overdue book' do
      before do
        create(:checked_out_book, created_at: 1.week.ago)
      end

      specify do
        expect { OverdueNotifier.notify }.to change { ActionMailer::Base.deliveries.count }.by(1)
      end
    end
  end
end
