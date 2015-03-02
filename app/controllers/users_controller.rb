class UsersController < ApplicationController

  def index
    @user = User.all
    end 


  def create
    @user = User.new(params[:user])

    if params[:user][:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end
    end
  end



  