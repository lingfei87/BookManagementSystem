class SignInController <  Devise::SessionsController
  def create
    ApiKey.create(user_id: current_user.id, role: current_user.role) unless current_user.nil?
    super
  end

  def destroy
    ApiKey.delete_all(user_id: current_user.id)
    super
  end

end
