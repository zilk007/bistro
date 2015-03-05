class NewslettersController < ApplicationController

	before_action :authenticate_user!
  before_action :set_newsletter, only: [:show, :edit, :update, :destroy, :change]


	respond_to :html
  
def index

    @emails_set = current_user.newsletters.where(user_id: current_user.id)
    respond_with(@newsletters)

	end

	def show
    redirect_to booking_path, success: @newsletter.code
		#respond_with(@newsletter)
	end


	def new
	   @newsletter = Newsletter.new
     respond_with(@newsletter)
		
	end

		def edit
	end


	def create
		 @newsletter = current_user.newsletters.new(newsletter_params)
		 @newsletter.save
     redirect_to newsletters_path

     #redirect_to newsletters_path, success: @newsletter.name
	end

def update
    @newsletter.update(newsletter_params)
    redirect_to newsletters_path
  end

  def destroy
    @newsletter.destroy
    respond_with(@newsletter)
  end

  def change
    @newsletter.update_attributes(state: params[:state])
    respond_to do |format|
      format.html {redirect_to newsletters_path, notice: "Email Update"}
    end

end

  private
    def set_newsletter
      @newsletter = Newsletter.find(params[:id])
    end


        def newsletter_params
       	params.require(:newsletter).permit(:code, :template)
end 


end
