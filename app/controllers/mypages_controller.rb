# frozen_string_literal: true

class MypagesController < BaseController
  def show
    @books = current_user.books.on_loan.page(params[:page]).per(15)
  end
end
