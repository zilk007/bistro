class RemoveEmailAndFirstNameAndLastNameFromNewsletters < ActiveRecord::Migration
  def change
    remove_column :newsletters, :email, :string
    remove_column :newsletters, :first_name, :string
    remove_column :newsletters, :last_name, :string
  end
end
