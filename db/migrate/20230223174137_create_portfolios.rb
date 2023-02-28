class CreatePortfolios < ActiveRecord::Migration[7.0]
  def change
    create_table :portfolios do |t|
      t.integer :quantity
      t.references :investor
      
      t.timestamps
    end
  end
end
