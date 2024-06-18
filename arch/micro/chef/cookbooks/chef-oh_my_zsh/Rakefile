require 'emeril/rake'
require 'foodcritic'

FoodCritic::Rake::LintTask.new do |t|
  # http://acrmp.github.io/foodcritic/#FC023
  t.options = { :fail_tags => ['any'], :tags => ['~FC023'] }
end

task :default => :foodcritic
