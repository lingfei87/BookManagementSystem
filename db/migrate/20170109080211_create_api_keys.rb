class CreateApiKeys < ActiveRecord::Migration[5.0]
  def change
    create_table :api_keys do |t|
      t.string :access_token
      t.string :role
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
