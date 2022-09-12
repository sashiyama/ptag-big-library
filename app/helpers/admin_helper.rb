# frozen_string_literal: true

module AdminHelper
  def current_librarian
    Librarian.find_by(id: session[:librarian_id])
  end
end
