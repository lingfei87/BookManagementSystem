Rails.application.routes.draw do
  devise_for :books
  namespace :api , defaults: {format: :json} do
    namespace :v1 do
      resources :users, :only => [:index, :show, :create, :update, :destroy]
      resources :books, :only => [:index, :show, :create, :update, :destroy]
    end
  end
end
