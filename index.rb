# movie trailers
# index.rb

require 'rubygems'
require 'sinatra'
require 'erb'

get '/' do
  erb :index
end