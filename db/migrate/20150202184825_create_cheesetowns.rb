class CreateCheesetowns < ActiveRecord::Migration
  def change
    create_table :cheesetowns do |t|
      t.string :name
      t.string :email
      t.string :first_name
      t.string :last_name

      t.timestamps
      t.timestamps
    end
  end
end
