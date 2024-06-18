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

describe file('/home/lenny/.oh-my-zsh/custom/themes/powerlevel10k') do
  it { should be_directory }
end

describe file('/home/lenny/.zshrc') do
  its('content') { should include 'powerlevel10k' }
  its('content') { should include '.p10k.zsh' }
  its('content') { should include 'p10k-instant-prompt' }
end

