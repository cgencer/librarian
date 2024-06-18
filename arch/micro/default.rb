postgresql_client_install 'My Postgresql Client install' do
  version '10.0'
end

postgresql_server_install 'Postgresql Server' do
  version '10'
  setup_repo false
  initdb_locale 'en_US.utf8'
  password 'your_secret_password_should_not_be_here'
end

postgresql_user 'some_user' do
  password 'your_other_secret_password_should_not_be_here'
end

postgresql_database 'mr_softie' do
  connection(
    :host      => '127.0.0.1',
    :port      => 5432,
    :username  => 'postgres',
    :password  => node['postgresql']['password']['postgres']
  )
  action :create
end

postgresql_database 'some_database' do
  locale 'en_US.utf8'
  template 'template0'
  owner 'some_user'
end
