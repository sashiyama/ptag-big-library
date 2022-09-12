# frozen_string_literal: true

class MypagesController < BaseController
  def show
    form = BookSearchForm.new(current_user.books.on_loan, params[:keyword])
    @books = form.result.page(params[:page]).per(15)
  end
end
