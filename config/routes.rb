Rails.application.routes.draw do
  root 'home#index'

  get 'register' => 'login#register'
  post 'register'=> 'login#register'

  get 'logout' => 'login#logout'
  get 'login' => 'login#index'
  post 'login' => 'login#login'
  resources :login
  resources :dashboard
  resources :sign_in
  devise_for :users, :controllers => {:sessions => "sign_in"}
  devise_for :books
  resources :home
  resources :users
  resources :books

  namespace :api , defaults: {format: :json} do
    namespace :v1 do
      resources :users, :only => [:index, :show, :create, :update, :destroy]
      resources :books, :only => [:index, :show, :create, :update, :destroy]
    end
  end
end
