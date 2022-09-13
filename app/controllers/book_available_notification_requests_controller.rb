# frozen_string_literal: true

class BookAvailableNotificationRequestsController < BaseController
  def create
    book = Book.find(params[:book_id])
    request = BookAvailableNotificationRequest.new(user: current_user, book: book)

    if request.save
      render json: { redirect_to: mypage_path, id: request.id }, status: :created
    else
      render json: { errors: request.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    request = current_user.book_available_notification_requests.find(params[:id])

    if request.destroy
      render json: { redirect_to: mypage_path }, status: :ok
    else
      render json: { errors: request.errors.full_messages }, status: :bad_request
    end
  end
end
