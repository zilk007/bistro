  class CustomersController < ApplicationController

      def index
        @customer = Customer.all
      end


      def show
        @customer = Customer.find(params[:id])
      end

      def new

        @customer = Customer.new

      end

      def create
       @customer = current_user.customers.new(customer_params)
       if @customer.save
       redirect_to usernew_path,  notice: 'customer '+@customer.email+' added'
       else
       redirect_to usernew_path, notice: 'Please check email'
      end

     end

   end


   private


   def customer_params
    params.require(:customer).permit(:email,:first_name,:last_name,:month)
  end 


