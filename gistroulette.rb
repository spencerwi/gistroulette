require 'net/http'
require 'json'
require 'yaml'
require 'rubygems'
require 'sinatra'
require 'sinatra/json'

set :config, YAML.load(File.read("config.yml"))

def get_random_gist(username, password)
    gist_id = Random.rand(99999)
    uri = URI.parse("https://api.github.com/gists/#{gist_id}")
    Net::HTTP.start(uri.host, uri.port, :use_ssl => true, :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|
        request = Net::HTTP::Get.new uri.request_uri
        request.basic_auth username, password

        response = http.request request
        if response.code == '404' then
            get_random_gist username, password
        else
            body = response.read_body
            puts body
            JSON.parse(body)
        end
    end
end

get '/' do
    File.read "index.html"
end 

get '/data/getRandomGist' do
    gist = get_random_gist(settings.config['username'], settings.config['password'])
    user = if gist['user'] == nil then 'anonymous' else gist['user']['login'] end
    response = {"embedFetchURL" => "https://gist.github.com/#{user}/#{gist['id']}.js"}
    json response
end
