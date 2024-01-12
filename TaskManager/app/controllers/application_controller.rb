class ApplicationController < ActionController::API
    before_action :authorized

    # this will build the token

    def encode_token(payload)
        secret_key = Rails.application.credentials.secret_key_base
        JWT.encode(payload, secret_key) 
    end

    def decoded_token
        secret_key = Rails.application.credentials.secret_key_base
        header = request.headers['Authorization']
        if header
            token = header.split(" ")[1] # splits the string and takes only the actual authorization header
            begin
                JWT.decode(token, secret_key)
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def current_user 
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end

    def authorized
        unless !!current_user
            render json: { message: 'Please log in' }, status: :unauthorized
        end
    end
end
