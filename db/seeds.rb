# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(email:'longadmin@gmail.com', name:'long admin', password:'longadmin', role:'admin')
ApiKey.create(user_id:'1', role:'admin')
User.create(email:'longoperator@gmail.com', name:'long operator', password:'longoperator', role:'operator')
ApiKey.create(user_id:'2', role:'operator')
User.create(email:'longoperator1@gmail.com', name:'long operator 1', password:'longoperator1', role:'operator')

Book.create(title:'First Book title ', description:'First Book Description', user_id:'1')
Book.create(title:'Second Book title ', description:'First Book Description', user_id:'2')
Book.create(title:'Third Book title ', description:'First Book Description', user_id:'2')