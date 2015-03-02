class CreateUsersAdmins < ActiveRecord::Migration
  def change
    create_table :users_admins do |t|
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
