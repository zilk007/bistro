class AddUserIdToCheesetowns < ActiveRecord::Migration
  def change
    add_column :cheesetowns, :user_id, :integer
  end
end
