# frozen_string_literal: true

class CheckedOutBooksController < BaseController
  def create
    form = BorrowBookForm.new(current_user, params[:book_id])
    form.borrow!
    render json: { redirect_to: mypage_path }, status: :created
  rescue BorrowBookForm::LendingLimitError
    render json: { errors: ['The book is on loan'] }, status: :bad_request
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :bad_request
  end
end
