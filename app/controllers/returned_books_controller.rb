# frozen_string_literal: true

class ReturnedBooksController < BaseController
  def create
    form = ReturnBookForm.new(current_user, params[:book_id])
    form.return!
    render json: { redirect_to: request.referrer }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :bad_request
  end
end
