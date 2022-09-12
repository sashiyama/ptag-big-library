# frozen_string_literal: true

class HomeController < ApplicationController
  def show
    form = BookSearchForm.new(Book, params[:keyword])
    @books = form.result.order(:title).page(params[:page]).per(51)
  end
end
