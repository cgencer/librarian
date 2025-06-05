# # encoding: utf-8

# Inspec test for recipe kontextwork-base::default

# The Inspec reference, with examples and extensive documentation, can be
# found at https://docs.chef.io/inspec_reference.html
describe package('zsh') do
  it { should be_installed }
end

# lenny
describe user('lenny') do
  it { should exist }
  its('shell') { should eq '/bin/zsh' }
end

describe file('/home/lenny/.oh-my-zsh') do
  it { should be_directory }
end

describe file('/home/lenny/.zshrc') do
  it { should be_file }
end

describe file('/home/lenny/.zshrc') do
  its('content') { should include 'plugins=()' }
end

# mary
describe user('mary') do
  it { should exist }
  its('shell') { should eq '/bin/zsh' }
end

describe file('/home/mary/.oh-my-zsh') do
  it { should be_directory }
end

describe file('/home/mary/.zshrc') do
  it { should be_file }
end

describe file('/home/mary/.zshrc') do
  its('content') { should include 'plugins=(rvm ruby)' }
end

# test if the foo alias exist for mary, thus our zshrc.chef.local file has been loaded
describe command('sudo -i -u mary -- zsh -i -c foo') do
  its('exit_status') { should eq 0 }
end

# test if the foo alias exist for mary, thus our zshrc.chef.local file has been loaded
describe command('sudo -i -u mary -- zsh -i -c bar_user') do
  its('exit_status') { should eq 0 }
end

describe command('sudo -i -u mary -- zsh -i -c not_hear') do
  its('exit_status') { should eq 127 }
end


