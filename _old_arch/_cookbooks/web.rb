bash "install-requirements" do
	cwd "#{node[:base_folder]}/webapp"
	code <<-EOH
		pip install -r requirements.txt
	EOH
	user "root"
	action :run
end
