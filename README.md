# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version 
    ruby 2.3.3p222

* Configuration
    Ruby mind setting run with rbenv 2.3.3
    
* Database creation
    Install & Run postgresql:  brew install postgresql
 
* Database initialization
    Install DB: rake db:create and rake db:migrate
    Create the init data with sedd : rake db:seek
  
* Deployment instructions
    Ruby mind setting run with rbenv 2.3.3
    Install & Run postgresql:  brew install postgresql
    Install gem : install bundle
    Install DB: rake db:create and rake db:migrate
    Create the init data with sedd : rake db:seek
    
* Description System 
   There are two role: admin (ad) and operator (oper) 
   Note: CurOper => Current Operator => you user who own the book or account User themself
   API about show, creat, update, destroy for each model User and Book
   
   $ rate routes 

     Ad      =>        GET    /api/v1/users(.:format)     api/v1/users#index {:format=>:json}

Oper vs Ad   =>        POST   /api/v1/users(.:format)     api/v1/users#create {:format=>:json}

     Ad              GET    /api/v1/users/:id(.:format) api/v1/users#show {:format=>:json}

CurOper vs Ad    =>    PATCH  /api/v1/users/:id(.:format) api/v1/users#update {:format=>:json}

CurOper vs Ad    =>    PUT    /api/v1/users/:id(.:format) api/v1/users#update {:format=>:json}

CurOper vs Ad    =>    DELETE /api/v1/users/:id(.:format) api/v1/users#destroy {:format=>:json}

Oper vs Ad       =>    GET    /api/v1/books(.:format)     api/v1/books#index {:format=>:json}

Oper vs Ad       =>    POST   /api/v1/books(.:format)     api/v1/books#create {:format=>:json}

Oper vs Ad        =>   GET    /api/v1/books/:id(.:format) api/v1/books#show {:format=>:json}

CurOper vs Ad     =>   PATCH  /api/v1/books/:id(.:format) api/v1/books#update {:format=>:json}

CurOper vs Ad     =>   PUT    /api/v1/books/:id(.:format) api/v1/books#update {:format=>:json}

CurOper vs Ad      =>  DELETE /api/v1/books/:id(.:format) api/v1/books#destroy {:format=>:json}
    
<<<<<<< HEAD
HTTP REQUEST for any API Must Include Token in header of the request

Head
Authentication Token Token="Token_Here"
=======
  HTTP REQUEST for any API Must Include Token in header of the request
  
Head

Authentication Token Token="Token_Here"

>>>>>>> 839a349e76c38a47e300160b112eed88277e7be4
See token: rails console and ApiKey.all 

    
  
