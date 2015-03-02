class CreateNewsletters < ActiveRecord::Migration
  def change
    create_table :newsletters do |t|
      t.string :name
      t.string :email
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
