class AddMonthToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :month, :string
  end
end
