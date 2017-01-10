class ApiKey < ActiveRecord::Base
  before_create :generate_access_token
  belongs_to :user

  private
  def generate_access_token
    begin
      self.access_token = SecureRandom.hex
    end while self.class.exists? (assess_token = self.access_token)
  end
end
